import React from 'react';
import {connect} from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "../../store/actions";
import {msToTime} from "../../shared/utility";
import Tooltip from "@material-ui/core/Tooltip";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import * as PropTypes from "prop-types";

const styles = () => ({
    time: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    startTime: {
        padding: '0px 5px 0px 5px',
        margin: '0px 5px 0px 5px',
        //border: 1px solid #ccc;
        cursor: 'pointer'
    },
    duration: {
        padding: '0px 5px 0px 5px',
        margin: '0px 5px 0px 0px',
        border: '1px solid #ccc'
    }
});

/**
 * React functional component that displays the startTime and Duration of show Element
 * <br />Created by Doa on 24-10-2019.
 */
const startTime = withStyles(styles)(({classes, startTime, displaySeconds, duration, isLive, onClick}) => {

    let startTimeDisplay = msToTime(startTime, displaySeconds);
    if (isLive) startTimeDisplay = <PlayArrowIcon fontSize='small'/>;
    let durationDisplay = msToTime(duration, displaySeconds);
    if (duration <= 0) {
        startTimeDisplay = <span style={{color: "red"}}>Time is up!</span>;
        durationDisplay = null;
    }
    return (
        <div className={classes.time}>
            <Tooltip title='Toggle realtime'>
                <div className={classes.startTime} onClick={onClick}>
                    {startTimeDisplay}
                </div>
            </Tooltip>
            <Tooltip title='Duration'>
                <div className={classes.duration}>
                    {durationDisplay}
                </div>
            </Tooltip>
        </div>
    );
});

const {func, bool, number} = PropTypes;

startTime.propTypes = {
    /** calculated startTime of this showElement in ms */
    startTime: number,
    /** duration of this showElement in ms */
    duration: number,
    /** true when show is running */
    isLive: bool,
    /** true if this component needs to display seconds in time*/
    displaySeconds: bool,
    /** function tho handle click on startTimeDisplay element. Toggles between realtime and showtime */
    onClick: func,
};

const mapStateToProps = (state) => {
    return {
        displaySeconds: state.global.displaySeconds
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(actions.toggleDisplayRealTime()),
    }
};

/* @component */
export default connect(mapStateToProps, mapDispatchToProps)(startTime);