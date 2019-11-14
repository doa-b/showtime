import React from 'react';
import {connect} from 'react-redux'

import classes from './StartTime.module.css'
import * as actions from "../../store/actions";
import {msToTime} from "../../shared/utility";

/**
 * Created by Doa on 24-10-2019.
 */
const startTime = (props) => {
    let time = msToTime(props.startTime, props.displaySeconds);
    return (
        <div className={classes.StartTime} onClick={props.onClick}>
            {time}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        displaySeconds: state.show.displaySeconds,
        showRealTime: state.show.showRealTime
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(actions.toggleShowSeconds())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(startTime);