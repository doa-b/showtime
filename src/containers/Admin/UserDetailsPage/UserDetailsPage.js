import React from 'react';

import {withFirebase} from "../../../firebase";

import * as ROUTES from '../../../shared/routes';

import { createLog } from "../../../shared/log";

import UserInfo from "../../../forms/UserInfo";

/**
 * Created by Doa on 3-1-2020.
 */
const userDetailsPage = (props) => {

    const onSubmit = (userData) => {
        delete userData.uid;
        props.firebase
            .user(props.location.state.user.uid)
            .update(userData)
            .then(() => {
                props.firebase.createLog('Doa', '24', 'Trinity Fall','changed UserData',
                    userData, userData.uid, userData.firstName + ' ' + userData.lastName );
                if (props.history) {
                    props.history.push(ROUTES.ADMIN)
                }
            })
            .catch(error => {
            console.log(error);
        })
    };
    return (
        <UserInfo
            handleSubmit={(userData) => onSubmit(userData)}
            userData={props.location.state.user}
            isAdmin
        />
    );
};

export default withFirebase(userDetailsPage);