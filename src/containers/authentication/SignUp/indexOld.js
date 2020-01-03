import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import * as ROUTES from '../../../shared/routes';
import * as ROLES from '../../../shared/accessLevel';
import {withFirebase} from '../../../firebase';
import {compose} from "redux";
import {GUEST} from "../../../shared/accessLevel";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


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
    firstName: '',
    lastName: '',
    country: '',
    role: '',
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    accessLevel: ROLES.GUEST,
    error: null,
    termsAgreement: false
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

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value === this.state.passwordOne) {
                return true;
            }
            return false;
        });
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }


    onSubmit = event => {
        event.preventDefault();
        const {username, email, passwordOne, isAdmin, accessLevel} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        accessLevel
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
            firstName,
            lastName,
            country,
            role,
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            termsAgreement,
        } = this.state;

        const {classes} = this.props;

        const nameCheck = /^[a-z]([-\']?[a-z]+)*( [a-z]([-\']?[a-z]+)*)+$/;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            nameCheck.test(username);

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <ValidatorForm
                        ref='form'
                        className={classes.form}
                        onSubmit={this.onSubmit}
                        onError={errors => console.log(errors)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    value={firstName}
                                    validators={['required']}
                                    errorMessages={['please enter your first name']}
                                    onChange={this.onChange}
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    value={lastName}
                                    validators={['required']}
                                    errorMessages={['please enter your last name']}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'please enter valid email address']}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={country}
                                    validators={['required']}
                                    errorMessages={['please enter your country']}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    name="country"
                                    autoComplete="country"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={passwordOne}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="passwordOne"
                                    label="Password"
                                    type="password"
                                    id="passwordOne"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={passwordTwo}
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['password mismatch', 'this field is required']}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="passwordTwo"
                                    label="Confirm password"
                                    type="password"
                                    id="passwordTwo"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="termsAgreement" color="primary"/>}
                                    label="I agree to the terms & conditions."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        {/*TODO Conditional of send invite button for admins*/}
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                            {error && <p>{error.message}</p>}
                        </Grid>
                    </ValidatorForm>
                </div>
            </Container>
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
    withStyles(styles),
    withRouter,
    withFirebase
)(SignUpFormBase);

export default SignUpPage;

