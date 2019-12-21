import app from "firebase/app";
import {firebaseConfig} from '../kluisje';
import "firebase/auth";
import "firebase/database";

/**
 * Interface for firebase
 */
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref(`users`);
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