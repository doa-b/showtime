import React from 'react';

import classes from './StartTime.module.css'

/**
 * Created by Doa on 24-10-2019.
 */
const startTime = (props) => {
    return (
        <div className={classes.StartTime}>
            {props.startTime}
        </div>
    );
};

export default startTime;