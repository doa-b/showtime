import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import {Formik, Form} from "formik";
import * as yup from "yup";

import {ROLES} from "../shared/roles";
import {MenuItem} from "@material-ui/core";
import * as ACCESSLEVEL from '../shared/accessLevel'
import {updateObject} from "../shared/utility";

const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

let SignupSchema = yup.object().shape({
    firstName: yup.string().required("Please enter your firstname."),
    lastName: yup.string().required("Please enter your lastname."),
    role: yup.string().required('Please select your role'),
    country: yup.string().required('Please select a country'),
    email: yup.string()
        .email()
        .required("Email is required."),
    password: yup
        .string()
        .min(6, "Password is too short.")
        .max(20, "Password is too long.")
        .required("This field is required."),
    passwordConfirmation: yup.string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Password does not match"),
    accessLevel: yup.string().required('Please set an access Level'),
});

// TODO Check how to validate confirm password: https://github.com/manee92/React_Demo/blob/master/form-demo/src/containers/Form.js

const UserInfo = withStyles(styles)(({classes, handleSubmit, userData}) => {
    // Note when you do not set a initial value, yup will not validate it
    let initialValues = {
        firstName: "",
        lastName: "",
        country: "",
        email: "",
        password: "",
        passwordConfirmation: '',
        accessLevel: '',
        role: '',
    };
    if (userData) {
        initialValues = updateObject(initialValues, userData);
        console.log(initialValues);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({errors, handleChange, touched, values}) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={values.firstName}
                                        error={errors.firstName && touched.firstName}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        helperText={
                                            errors.firstName && touched.firstName
                                                ? errors.firstName
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={values.lastName}
                                        error={errors.lastName && touched.lastName}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        helperText={
                                            errors.lastName && touched.lastName
                                                ? errors.lastName
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={values.country}
                                        error={errors.country && touched.country}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        name="country"
                                        label="Country"
                                        id="country"
                                        helperText={
                                            errors.country && touched.country
                                                ? errors.country
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        value={values.role}
                                        error={errors.role && touched.role}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        name="role"
                                        label="Your Role"
                                        id="role"
                                        helperText={
                                            errors.role && touched.role
                                                ? errors.role
                                                : null
                                        }
                                    >
                                        {ROLES.map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={values.email}
                                        error={errors.email && touched.email}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        helperText={
                                            errors.email && touched.email ? errors.email : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={errors.password && touched.password}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        helperText={
                                            errors.password && touched.password
                                                ? errors.password
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={errors.passwordConfirmation && touched.passwordConfirmation}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        name="passwordConfirmation"
                                        label="Confirm Password"
                                        type="password"
                                        id="passwordConfirmation"
                                        helperText={
                                            errors.passwordConfirmation && touched.passwordConfirmation
                                                ? errors.passwordConfirmation
                                                : null
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        value={values.accessLevel}
                                        error={errors.accessLevel && touched.accessLevel}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                        name="accessLevel"
                                        label="Granted Access Level"
                                        id="accessLevel"
                                        helperText={
                                            errors.accessLevel && touched.accessLevel
                                                ? errors.accessLevel
                                                : null
                                        }
                                    >
                                        {ACCESSLEVEL.ALL.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.title}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
});

export default UserInfo;