import app from "firebase/app";
import {firebaseConfig} from '../kluisje';
import "firebase/auth";
import "firebase/database";

//TODO ACCESS RULES Terugzetten
/**
 * Interface for firebase
 */
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

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
                    .once('value')
                    .then(snapshot => {
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
}


export default Firebase;

// export const firebaseDb = firebase.database();
//
// firebase.database().ref('/.info/serverTimeOffset')
//     .once('value')
//     .then(function stv(data) {
//         console.log('the current ServerDateTime is: ')
//         console.log(data.val() + Date.now());
//     }, function (err) {
//         return err;
//     });