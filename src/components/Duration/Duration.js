import React from 'react';

import classes from './Duration.module.css'

/**
 * Created by Doa on 24-10-2019.
 */
const duration = (props) => {
    return (
        <div className={classes.Duration}>
            {props.duration}
        </div>
    );
};

export default duration;