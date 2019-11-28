import axios from 'axios'
import * as actionTypes from './actionTypes';


export const setIsLiveAndPlay = () => {
    return {
        type: actionTypes.LIVE_SET_IS_LIVE
    }
};

export const togglePaused = () => {
    return {
        type: actionTypes.LIVE_TOGGLE_IS_PAUSED
    }
};

export const changeCurrentPartNumber = (nextPart, nextBlock) => {
    return {
        type: actionTypes.LIVE_CHANGE_CURRENT_PART_NUMBER,
        nextPart: nextPart,
        nextBlock: nextBlock
    }
};

export const resetRunningPartDuration = (value = 0) => {
    return {
        type: actionTypes.LIVE_RESET_RUNNING_PART_DURATION,
        value: value
    }
};

export const incrementRunningPartDuration = () => {
    return {
        type: actionTypes.LIVE_INCREMENT_RUNNING_PART_DURATION
    }
};

export const partEnd = () => {
    return {
        type: actionTypes.LIVE_END_PART
    }
};

export const showEnd = () => {
    return {
        type: actionTypes.LIVE_END_OF_SHOW
    }
};

export const updateScheduledEndTime = (time) => {
    return {
        type: actionTypes.LIVE_UPDATE_SCHEDULED_END_TIME,
        time: time
    }
};

export const savePreviousState = (previousState) => {
    return {
        type: actionTypes.LIVE_SAVE_PREVIOUS_STATE,
        previousState: previousState
    }
};

// Asynchronous ActionCreators

export const startTheShow = () => {
    console.log('starting The show');
    return dispatch => {
        dispatch (setIsLiveAndPlay());
    };
};

export const setNextPart = (nextPart, nextBlock) => {
    return dispatch => {
        dispatch(changeCurrentPartNumber(nextPart, nextBlock));
    }
};

export const toggleIsPaused = () => {
    console.log('toggling pause');
    return dispatch => {
        dispatch (togglePaused());
    }
};

export const partHasEnded = () => {
    console.log('Part has ended');
    return dispatch => {
        dispatch (partEnd());
    }
};

export const showHasEnded = () => {
    return dispatch => {
        dispatch (showEnd());
    }
};