import React from 'react';

import classes from './Backdrop.module.css'


/**
 * Created by Doa on 25-7-2019.
 */
const Backdrop = (props) => (
    props.show ? <div
        className={classes.Backdrop}
        onClick={props.clicked}>
    </div> : null
);

export default Backdrop;