import React from 'react';
import {withAuthorization, AuthUserContext} from '../../hoc/Session'

import {PasswordForgetForm} from "../PasswordForget";
import PasswordChangeForm from '../PasswordChange';
import UserInfo from "../../forms/UserInfo";
import TestPage from '../../components/TestPage/TestPage'

// TODO use expansion Panels for these 2 forms
const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <>
                <h1>Account: {authUser.email}</h1>
                <UserInfo
                    handleSubmit={(values) => {
                        console.log(values)
                    }}
                    userData={{
                        firstName: "Doa",
                        lastName: "Bonifacio",
                        email: "djdoa@hotmail.com",
                        password: "12345"
                    }}
                />
                <PasswordForgetForm/>
                <PasswordChangeForm/>
            </>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
