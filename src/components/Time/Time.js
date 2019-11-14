import React from 'react';
import {connect} from 'react-redux'

import classes from './Time.module.css'
import * as actions from "../../store/actions";
import {msToTime} from "../../shared/utility";

/**
 * Created by Doa on 24-10-2019.
 */
// TODO replace startTime Display with Play Icon when this item is playing
const startTime = (props) => {
    let startTime = msToTime(props.startTime, props.displaySeconds);
    if (props.live) startTime = 'LIVE';
    let duration = msToTime(props.duration, props.displaySeconds);
    if (props.duration <= 0) {
        startTime = <span style={{color: "red"}}>Time is up!</span>;
        duration = null;
    }
    return (
        <div className={classes.Time}>
            <div className={classes.StartTime} onClick={props.onClick}>
                {startTime}
            </div>
            <div className={classes.Duration}>
                {duration}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        displaySeconds: state.show.displaySeconds
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(actions.toggleShowSeconds()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(startTime);