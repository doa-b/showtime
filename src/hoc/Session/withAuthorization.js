import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from "redux";
import AuthUserContext from "./context";
import {withFirebase} from "../../firebase";
import * as ROUTES from '../../shared/routes';

// takes a component as input and return it as output. Also recieves a condition function passes as parameter.
// This can be a broad or fine-grained (role-based or permission-based) authorization rule.
// It decides based on the condition whetther it should redirect to a public route when user is not allowed to view current
// protected page
const withAuthorization = (condition) => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        //render method displays the passed component (e.g. home page, account page)
        // that should be protected by this higher-order component
        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return compose(
        withRouter,
        withFirebase
    )(WithAuthorization)
};

export default withAuthorization;