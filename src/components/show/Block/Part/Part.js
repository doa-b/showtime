import React from 'react';

import classes from './Part.module.css'
import StartTime from "../../../StartTime/StartTime";
import Duration from "../../../Duration/Duration";
import ScenesList from "../../../../containers/Scenes/ScenesList";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

/**
 * Created by Doa on 23-10-2019.
 */
const part = (props) => {
    let startTime = props.startTime - props.partData.duration;
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Part}>
                {props.children}
                <StartTime startTime={startTime}/>
                <Duration duration={props.partData.duration}/>
                <div>{props.partData.title}</div>
                <KeyboardArrowDownIcon className={classes.Arrow}
                onClick={props.clicked}/>
            </div>
            <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <ScenesList
                    parentId={props.partData.id}
                    startTime={startTime}/>
            </div>
        </div>
    )
};

export default part;