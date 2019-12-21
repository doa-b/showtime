import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as ROUTES from '../../shared/routes';
import {withFirebase} from '../../firebase';
import {compose} from "redux";

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        {/*you can inject the firebase context in the signupForm using a render prop component*/}
        {/*<FirebaseContext.Consumer>*/}
        {/*{firebase => <SignUpForm firebase={firebase} />}*/}
        {/*</FirebaseContext.Consumer>*/}
        {/* OR you can create a HOC for firebase and wrap your signup form with it */}
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

/**
 * creates a user in Firebase's internal authentication database
 * If succesfull, creates a user in Firebase's realtime database
 */
export class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE}
    }

    onSubmit = event => {
        event.preventDefault();
        const {username, email, passwordOne} = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({error});
            });

    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);
// wrap our signup form with Firebase HOC
export const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);

export default SignUpPage;

