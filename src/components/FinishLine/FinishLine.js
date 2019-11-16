import React, {useEffect} from 'react';

import classes from './FinishLine.module.css'
import {msToTime} from "../../shared/utility";

/**
 * Created by Doa on 16-11-2019.
 */


const FinishLine = ({time, scheduledEndTime, isLive, updatescheduledEndTime}) => {

    useEffect(() => {
        console.log('mounted or updated')
        if (!isLive && time !== scheduledEndTime) {
            updatescheduledEndTime(time);
        }
    }, [time]);


    let extraTime = null;

    if (time > scheduledEndTime) {
        extraTime = (
            <div className={classes.Extratime}>overtime:
        <span className={classes.Overtime}>{'+'+ msToTime(time - scheduledEndTime)}</span>
            </div>)
    } else if (time < scheduledEndTime) {
        extraTime = <span className={classes.Undertime}>{'Undertime: - ' + msToTime(scheduledEndTime - time)}</span>;
    }

    return (
        <>
            <div className={classes.FinishLine}>
                Finish: {msToTime(time)}
                {extraTime}
            </div>
        </>);
};

export default FinishLine;