import React from 'react';
import StartTime from '../../StartTime/StartTime'
import Duration from '../../Duration/Duration'
import PartsList from "../../../containers/Parts/PartsList";

import classes from './Block.module.css'
import {Title} from "@material-ui/icons";

/**
 * Created by Doa on 23-10-2019.
 */
const block = (props) => {
    let startTime = props.startTime - props.duration;

    return (
        <div className={classes.Wrapper}>
            <div className={classes.Block}>
                {props.children}
                <StartTime startTime={startTime}/>
                <Duration duration={props.duration}/>
                <div className={classes.Title}>{props.blockData.title}</div>
            </div>
            <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <PartsList startTime={startTime}
                           parentId={props.blockData.id}/>
            </div>
        </div>
    );
};

export default block;