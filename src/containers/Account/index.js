import React from 'react';

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from '../PasswordChange';

// TODO use expansion Panels for these 2 forms
const AccountPage = () => (
    <>
        <h1>Account Page</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </>
);

export default AccountPage;
