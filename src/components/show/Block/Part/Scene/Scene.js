import React from 'react';

import classes from './Scene.module.css'
import StartTime from "../../../../StartTime/StartTime";
import Duration from "../../../../Duration/Duration";

/**
 * Created by Doa on 23-10-2019.
 */
const part = (props) => {
    return (
        <div className={classes.Scene}>
            <StartTime startTime={props.startTime - props.sceneData.duration}/>
            <Duration duration={props.sceneData.duration}/>
            {props.sceneData.title}

        </div>

    )
};

export default part;