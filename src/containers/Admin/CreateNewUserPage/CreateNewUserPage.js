import React from 'react';

import { withFirebase } from "../../../firebase";

import * as ROUTES from '../../../shared/routes'

import UserInfo from "../../../forms/UserInfo";
import { createSuperSecurePassword } from '../../../kluisje'
import {updateObject} from "../../../shared/utility";

/**
 * Created by Doa on 3-1-2020.
 */
const createNewUserPage = (props) => {

    const onSubmit = (userData) => {
        userData = updateObject(userData, {
            password: createSuperSecurePassword(userData)
        });
        console.log(userData);
        props.firebase
            .doCreateUserWithEmailAndPassword(userData.email, userData.password)
            .then(authUser => {
                // remove password
                delete userData.password;
                // Create a user in firebase realtime database
                return props.firebase
                    .user(authUser.user.uid)
                    .set(userData);
            })
            .then(authUser => {
                if (props.history) {
                    props.history.push(ROUTES.ADMIN)
                }
            })
            .catch(error => {
               // setError(error)
            });
        };

    return (
        <UserInfo
            handleSubmit={(userData) => onSubmit(userData)}
            buttonLabel='Create user and email invitation'
            isAdmin
        />
    );
};

export default withFirebase(createNewUserPage);
