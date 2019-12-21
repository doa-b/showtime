import React from 'react';
import { withAuthorization, AuthUserContext } from '../../hoc/Session'

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from '../PasswordChange';

// TODO use expansion Panels for these 2 forms
const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <>
                <h1>Account: {authUser.email}</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
