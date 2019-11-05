import React from 'react';
import {connect} from 'react-redux'

import classes from './Time.module.css'
import * as actions from "../../store/actions";
import {msToTime} from "../../shared/utility";

/**
 * Created by Doa on 24-10-2019.
 */
const startTime = (props) => {
    let startTime = msToTime(props.startTime, props.showSeconds);
    let duration = msToTime(props.duration, props.showSeconds)
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
        showSeconds: state.show.showSeconds
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(actions.toggleShowSeconds())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(startTime);