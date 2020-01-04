import React, {useState} from 'react';
import {compose} from "redux";
import axios from 'axios'
import {withFirebase} from "../../../firebase";
import {withAuthorization} from '../../../hoc/Session'
import * as ACCESSLEVEL from '../../../shared/accessLevel'

import * as ROUTES from '../../../shared/routes'
import {VUUR} from '../../../kluisje'

import UserInfo from "../../../forms/UserInfo";
import {createSuperSecurePassword} from '../../../kluisje'


/**
 * Created by Doa on 3-1-2020.
 */
const CreateNewUserPage = (props) => {
    const[error, setError]=useState(null);
    const onSubmit = (userData) => {
        // userData = updateObject(userData, {
        //     password: createSuperSecurePassword(userData)
        // });
        console.log(userData);
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + VUUR;
        const authData = {
            email: userData.email,
            password: createSuperSecurePassword(userData)
        };
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                return props.firebase
                    .user(response.data.localId)
                    .set(userData);
            })
            .then(authUser => {
                // TODO sent invitation email with credentials
                props.history.push(ROUTES.ADMIN)
            })
            .catch(error => {
                setError(error);
            });
    };

    return (
        <>
            <UserInfo
                handleSubmit={(userData) => onSubmit(userData)}
                buttonLabel='Create user and email invitation'
                isAdmin
            />
            {error && <p>{error.messageMessage}</p>}
        </>
    );
};

const condition = authUser =>
    authUser && authUser.accessLevel >= ACCESSLEVEL.EXECUTIVE;

export default compose(
    withAuthorization(condition),
    withFirebase
)(CreateNewUserPage);
