import app from "firebase/app";
import {firebaseConfig} from '../kluisje';
import "firebase/auth";
import "firebase/database";
import 'firebase/storage';
import {createUUID} from "../shared/utility";
import {extension} from 'mime-types'


/**
 * Interface for firebase
 */
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
    }

    /**
     * create a new log record in firebase database
     * @param userName
     * @param showId
     * @param showTitle
     * @param action
     * @param data
     * @param targetId
     * @param targetTitle
     */
    createLog = (
        userName = '',
        showId = '',
        showTitle = '',
        action = '',
        data = {},
        targetId = '',
        targetTitle = ''
    ) => {
        const uid = createUUID();
        const userId = this.auth.currentUser.uid;
        //console.log(this.db.ServerValue.TIMESTAMP);

        this.db.ref(`logs/${uid}`).set(
            {uid, userId, userName, showId, showTitle, action, targetId, targetTitle});
        // setServertime!!!!
        this.db.ref(`logs/${uid}/date`).set(app.database.ServerValue.TIMESTAMP)
    };

    getServerTimeMs = () => {
        this.db.ref('/.info/serverTimeOffset')
            .once('value')
            .then(function stv(data) {
                console.log('the current ServerDateTime is: ')
                console.log(data.val() + Date.now());
                return data.val() + Date.now();
            }, function (err) {
                return err;
            });
    };

    setLiveData = (data) => {
        if (data.runningPartStartTime === -1) {
            delete data.runningPartStartTime;
            this.resetRunningPartDuration()
        }
        this.live().update(data);

    };

    resetRunningPartDuration = () => {
        this.db.ref(`live/runningPartStartTime`).set(app.database.ServerValue.TIMESTAMP)
    };
// can be removed
    addToRunningPartStartTime = () => {
        this.db.ref(`live/runningPartStartTime`).set(app.database.ServerValue.TIMESTAMP)
    };


    /**
     * Creates a new user in FireBase Authentication
     * @param email: of new user. Must be unique
     * @param password: of new user
     * @returns {Promise<firebase.auth.UserCredential>}
     */
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    /**
     * Signs an existing user into this App and Firebase
     * @param email
     * @param password
     * @returns {Promise<firebase.auth.UserCredential>}
     */
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    /**
     * Signs current user out
     * @returns {Promise<void>}
     */
    doSignOut = () => this.auth.signOut();

    /**
     * Sends a password reset email to provided email. Firebase handles the next steps
     * @param email
     * @returns {Promise<void>}
     */
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    /**
     * User can update his own password
     * @param password
     * @returns {Promise<void>}
     */
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** Set Listeners *** //

    /**
     * Merge Auth and DB User Data
     * @param next: callback function that needs to be executed when check is passed: user is authenticated
     * and returns a merged (realtime db & internal auth) user
     * @param fallback: callback function that needs to be executed when check has failed. Returns null
     * @returns {firebase.Unsubscribe}
     */
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .on('value', snapshot => {
                        const dbUser = snapshot.val();

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** Realtime Database API ***

    /**
     * get a reference to a user by identifier
     * @param uid
     * @returns {firebase.database.Reference}
     */
    user = uid => this.db.ref(`users/${uid}`);

    /**
     * get a reference to all users
     * @returns {firebase.database.Reference}
     */
    users = () => this.db.ref(`users`);

    live = () => this.db.ref(`live`);

    log = uid => this.db.ref(`logs/${uid}`);

    logs = () => this.db.ref(`logs`);



    // *** Storage API ***

    image = image => this.storage.ref(`images/${image.name}`);

    images = () => this.storage.ref(`images`);

    part = partId => this.storage.ref (`test/${partId}`);

    file = (fileName) => {
        return this.storage.ref(`files/${fileName}`)
    };

    addFileDataToElement = (data, elementType, elementId) => {
        this.db.ref(`${elementType}/${elementId}`)
            .child('files')
            .update(data)
    };

    files = () => this.storage.ref('files');

    // addFileRefToElement = (file) => {
    //     const uploadTask = file(file).put(file);
    //     uploadTask.on(
    //         "state_changed",
    //         snapshot => {
    //             // progress function ...
    //             return Math.round(
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             );
    //         },
    //         error => {
    //             // Error function ...
    //             console.log(error);
    //         },
    //         () => {
    //             // complete function ...
    //             uploadTask.snapshot.ref.getDownloadURL()
    //                 .then(url => {
    //                     this.setState({url});
    //                 });
    //         }
    //     );
    // };



    // *** Uppload uploader *** //

    firebaseUploader = (file, updateProgress, fileName, saveUrl) =>
        new Promise((resolve, reject) => {
            console.log(file);

            if (!fileName) {
                // Generate a file name based on current date and random number
                fileName = `${
                    Math.random().toString().replace("0.", "").substr(0, 7)
                }-${new Date().getTime()}`
            }

            // get the file extension from the file Type
            const fileExtension = extension(file.type);

            // append file extension to the fileName
            fileName = fileName.concat('.', fileExtension);


            // Upload the file to the storage reference. Automatically overwrites if file already exists
            const uploadTask = this.images().child(fileName).put(file);

            // Report upload progress
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (updateProgress) updateProgress(progress);
                },
                error => {
                    console.log("Got error", error);
                    return reject(new Error("unable_to_upload"));
                },
                () => {
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(url => {
                            // when you use update(value) value MUST be an object
                            this.db.ref(saveUrl).set(url);
                            //  this.db.ref(`users/3igMGPcFl1X7h5WbFgAYRxXGjJ63/imageUrl`).set(url);
                            resolve(url)
                        }) // Return uploaded file's URL

                        .catch(() => reject(new Error("unable_to_upload")));
                }
            );
        });
}


export default Firebase;

// export const firebaseDb = firebase.database();
//
//