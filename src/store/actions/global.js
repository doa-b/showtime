import * as actionTypes from './actionTypes';
import {incrementRunningPartDuration} from "./live";

export const initiateClock = () => {
    return {
        type: actionTypes.INITIATE_CLOCK
    };
};

export const addSecondToClock = () => {
    return {
        type: actionTypes.INCREMENT_CLOCK
    }
};

export const toggleShowSeconds = () => {
    return {
        type: actionTypes.SHOW_SECONDS
    }
};

export const toggleDisplayRealTime = () => {
    return {
        type: actionTypes.TOGGLE_DISPLAY_REALTIME
    }
};

export const toggleIsEditable = () => {
    return {
        type: actionTypes.TOGGLE_IS_EDITABLE
    }
};
export const setDisplayUser = (user) => {
    return {
        type: actionTypes.DISPLAY_USER,
        user: user
    }
};

export const setPageTitle = (title) => {
    return {
        type: actionTypes.SET_PAGE_TITLE,
        pageTitle: title
    }
};

export const clearData = () => {
    return {
        type: actionTypes.SHOW_CLEAR_DATA
    }
};

export const setShowAllScenes = (value) => {
    return {
        type: actionTypes.SET_SHOW_ALL_SCENES,
        value: value
    }
};

// Asynchronous actionCreators

export const startClock = () => {
    return (dispatch, getState) => {
        dispatch(initiateClock());
        setInterval(() => {
            const isPlaying = !getState().live.isPaused;
            dispatch(addSecondToClock());
            if (isPlaying) {
                dispatch(incrementRunningPartDuration());
            }
        }, 1000)
    }
};