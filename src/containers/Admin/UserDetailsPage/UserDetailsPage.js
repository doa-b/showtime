import React from 'react';

import { withFirebase } from "../../../firebase";

import * as ROUTES from '../../../shared/routes'

import UserInfo from "../../../forms/UserInfo";

/**
 * Created by Doa on 3-1-2020.
 */
const userDetailsPage = (props) => {

    const onSubmit = (userData) => {
        delete userData.uid;
        props.firebase
            .user(props.location.state.user.uid)
            .update(userData);
        if (props.history) {
            props.history.push(ROUTES.ADMIN)
        }
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