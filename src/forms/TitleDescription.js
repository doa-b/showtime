import React, {Component} from 'react';
import {withFormik, Formik, FormikProps, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'


import {TextField, Button} from "@material-ui/core";

/**
 * Created by Doa on 30-10-2019.
 */

const handleSubmit = (values, { props, setSubmitting}) => {
    console.log('submitted');
    console.log(values);
    setSubmitting(false);
    return;
};

const formSchema = Yup.object().shape({
    title: Yup.string()
        .required('Please enter a title')
        .min(1)
        .max(100),
    description: Yup.string()
        .required('Please enter a password')
});

const formikEnhancer = withFormik(

    {
        mapPropsToValues: props => (
            {
                title: '',
                description: ''
            }),
        validationSchema: formSchema,
        handleSubmit: handleSubmit,
        displayName: 'BlockDetails'
    }
);

const titleDescription = (props) => {

    return (
        <Form>
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
                type = 'submit'
            >
                Submit
            </Button>
        </Form>)
};

export default formikEnhancer(titleDescription);