import React from 'react';

import classes from './Part.module.css'
import StartTime from "../../../StartTime/StartTime";
import Duration from "../../../Duration/Duration";

/**
 * Created by Doa on 23-10-2019.
 */
const part = (props) => {
    return (
        <div className={classes.Part}>
            <StartTime startTime={props.startTime - props.partData.duration}/>
            <Duration duration={props.partData.duration}/>
            {props.partData.title}
        </div>
    )
};

export default part;