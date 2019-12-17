import Firebase from "firebase/app";
import firebaseConfig from "../config/config";
import "firebase/auth";
import "firebase/database";

export const firebase = Firebase.initializeApp(firebaseConfig);

export const firebaseDb = firebase.database();

firebase.database().ref('/.info/serverTimeOffset')
    .once('value')
    .then(function stv(data) {
        console.log('the current ServerDateTime is: ')
        console.log(data.val() + Date.now());
    }, function (err) {
        return err;
    });