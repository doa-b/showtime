import React from 'react';

import classes from './Scene.module.css'
import StartTime from "../StartTime/StartTime";
import Duration from "../Duration/Duration";
import Time from "../Time/Time";

/**
 * Created by Doa on 23-10-2019.
 */
const scene = (props) => {
    return (
        <div className={classes.Scene}>
            {props.children}
            <Time startTime={props.startTime + props.sceneData.starttime}
                  duration={props.sceneData.duration}/>
            <div onClick={() => props.detailClicked(props.sceneData.id)}>{props.sceneData.title}</div>

        </div>
    )
};

export default scene;