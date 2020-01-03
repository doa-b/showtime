import React, {Component, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import * as ROUTES from '../../../shared/routes';

import UserInfo from "../../../forms/UserInfo";
import {withFirebase} from '../../../firebase';

import {compose} from "redux";


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

/**
 * creates a user in Firebase's internal authentication database
 * If succesfull, creates a user in Firebase's realtime database
 */
const SignUpPage = (props) => {
    const [error, setError] = useState(null);
    const onSubmit = (userData) => {
        props.firebase
            .doCreateUserWithEmailAndPassword(userData.email, userData.password)
            .then(authUser => {
                // remove password
                delete userData.password;
                delete userData.passwordConfirmation;
                // Create a user in firebase realtime database
                return props.firebase
                    .user(authUser.user.uid)
                    .set(userData);
            })
            .then(authUser => {
                props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                setError(error)
            });

    };
    return (
        <div>
            <UserInfo
                handleSubmit={(values) => {onSubmit(values)}}
                buttonLabel='Sign Up'/>
            {/*you can inject the firebase context in the signupForm using a render prop component*/}
            {/*<FirebaseContext.Consumer>*/}
            {/*{firebase => <SignUpForm firebase={firebase} />}*/}
            {/*</FirebaseContext.Consumer>*/}
            {/* OR you can create a HOC for firebase and wrap your signup form with it */}
            {error && <p>{error.message}</p>}
        </div>
    );
};

export const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

// wrap our signup form with Firebase HOC
export default compose(
    withStyles(styles),
    withRouter,
    withFirebase,
)(SignUpPage);



