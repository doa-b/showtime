import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {msToTime} from "../../shared/utility";

const styles = () => ({
    finishLine: {
        display: 'flex',
        flexDirection: 'row',
        aligItemstems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
        background: 'blue',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        color: 'white',
        padding: '5px',
    },
    overTime: {
        color: 'red',
        fontWeight: 'bolder',
        marginLeft: 10
    },
    underTime: {
            color: 'greenyellow',
            fontWeight: 'bolder',
            marginLeft: 10
        },
    extraTime: {
        marginLeft: 10
    }
});

/**
 * React functional component that displays the endtime of the show and over/undertime based on scheduledEndTime prop
 * <br />Created by Doa on 16-11-2019.
 */
const FinishLine = withStyles(styles)(({classes, time, scheduledEndTime, isLive, updatescheduledEndTime}) => {

    useEffect(() => {
        if (!isLive && time !== scheduledEndTime) {
            updatescheduledEndTime(time);
        }
    }, [time]);


    let extraTime = null;

    if (time > scheduledEndTime) {
        extraTime = (
            <div className={classes.extraTime}>overtime:
                <span className={classes.overTime}>{'+' + msToTime(time - scheduledEndTime, true)}</span>
            </div>)
    } else if (time < scheduledEndTime) {
        extraTime =
            <span className={classes.underTime}>{'Undertime: - ' + msToTime(scheduledEndTime - time, true)}</span>;
    }

    return (
        <>
            <div className={classes.finishLine}>
                Finish: {msToTime(time, false)}
                {extraTime}
            </div>
        </>);
});

FinishLine.propTypes={
    /** current Time in milliseconds */
    time: PropTypes.number,
    /** scheduled EndTime in milliseconds */
    scheduledEndTime: PropTypes.number,
    /** True if show is live */
    isLive: PropTypes.bool,
    /** Function to updatescheduledEndTime when show starts late */
    updatescheduledEndTime: PropTypes.func
};

/* @component */
export default FinishLine;