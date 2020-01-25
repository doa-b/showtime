import * as actionTypes from './actionTypes';
import {incrementRunningPartDuration} from "./live";
import {sendMessage} from '../../shared/messages/sendMessage'
import {msToTime} from "../../shared/utility";

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

export const setQueuedMessage =(message) => {
    return {
        type: actionTypes.SET_QUEUED_MESSAGE,
        message: message
    }
};

// Asynchronous actionCreators

export const startClock = () => {
    return (dispatch, getState) => {
        dispatch(initiateClock());
        setInterval(() => {
            const isPaused = getState().live.isPaused;
            const isLive = getState().live.isLive;

            dispatch(addSecondToClock());
            if (isLive) {
                if (!isPaused) {
                    const cueuedMessage = getState().global.queuedMessage;
                    const currentTime = msToTime(getState().global.currentTime, true);
                    if (msToTime(cueuedMessage.timeMs, true) === currentTime) {
                        sendMessage(cueuedMessage)
                    }
                }
                dispatch(incrementRunningPartDuration(isPaused));

            }
        }, 1000)
    }
};