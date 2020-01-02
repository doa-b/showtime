import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withFormik, Formik, FormikProps, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import {TextField, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import {TextValidator} from "react-material-ui-form-validator";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

/**
 * Created by Doa on 30-10-2019.
 */
// todo https://webomnizz.com/working-with-react-formik-and-yup/
// todo   https://medium.com/@kmerandi25/react-form-validation-with-formik-material-ui-and-yup-1cd92eac887
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

const handleSubmit = (values, {props, setSubmitting}) => {
    console.log('submitted');
    console.log(values);
    setSubmitting(false);
    return;
};

const formSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Please enter a email address'),
    name: Yup.string()
        .required('Please enter your full name'),
    firstName: Yup.string()
        .required('Please enter your first name'),
    lastName: Yup.string()
        .required('Please enter your last name'),
    password: Yup.string()
        .required('Please enter a password')
        .min(6)
        // .matches(/.*[a-z]/, 'password must contain a lowercase character')
        .matches(/.*[0-9]/, 'password must contain a number'),
    passwordConfirmation: Yup.string()
        .required('Please confirm your password by retyping it')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const formikEnhancer = withFormik(
    {
        mapPropsToValues: props => (
            {
                name: '',
                firstName: '',
                lastName: '',

                email: '',
                gender: '',
                password: '',
                passwordConfirmation: ''
            }),
        validationSchema: formSchema,
        handleSubmit: handleSubmit,
        displayName: 'Update Data'
    }
);

const userInfo = withStyles(styles)((classes, errors, touched, handleChange, handleSubmit) => {

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <p>{errors.firstName}</p>
                <Form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChange}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName ? errors.firstName: null}
                            />
                            <ErrorMessage name="firstName"
                                          render={msg => <span className={classes.errorMessage}>{msg}</span>}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChange}
                                error={errors.lastName && touched.lastName}
                                helperText={errors.lastName && touched.lastName ? errors.lastName: null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                error={errors.email && touched.email}
                                helperText={errors.email && touched.email ? errors.email: null}
                            />
                            <ErrorMessage name="email"
                                          render={msg => <span className={classes.errorMessage}>{msg}</span>}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                    <TextField
                        required
                        id='title'
                        label='title'
                        name='title'
                        margin='normal'
                        variant='outlined'/>
                    <TextField
                        id='description'
                        label='description'
                        name={'description'}
                        multiline
                        rows={3}
                        margin='normal'
                        variant='outlined'/>
                    <Button
                        type='submit'
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>)
});

export default formikEnhancer(userInfo);