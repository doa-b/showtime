import axios from 'axios'
import * as actionTypes from './actionTypes';
import {addSecondToClock, initiateClock} from "./showElements";

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

export const setCurrentPartNumber = () => {
    return {
        type: actionTypes.LIVE_CHANGE_CURRENT_PART_NUMBER
    }
};

// Asynchronous ActionCreators

export const startTheShow = () => {
    return dispatch => {
        dispatch (setIsLiveAndPlay());
    }
};

export const setNextPart = () => {
    return dispatch => {
        dispatch (setCurrentPartNumber());
    }
};

export const toggleIsPaused = () => {
    return dispatch => {
        dispatch (togglePaused());
    }
};

export const startClock = () => {
    return (dispatch, getState) => {
        dispatch(initiateClock());
        setInterval(() => {
            const isPaused = getState().live.isPaused;

            dispatch(addSecondToClock());
        }, 1000)
    }
};