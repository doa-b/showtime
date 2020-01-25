import * as actionTypes from '../actions/actionTypes'
import {getCurrentUTCinMs, updateObject} from "../../shared/utility";

export const initialState = {
    isLive: false,
    isPaused: true,
    runningPartNumber: 0,
    runningBlockNumber: 0,
    runningPartDuration: 0,
    showHasFinished: false,
    scheduledEndTime: 0,
    previousShowState: null,
    pause: 0,
    serverOffset: null,
    monitorMessage: null,
    nextPartId: '',
    nextPartTitle: '',
    nextPartCue: '',
    followingPartId: '',
    followingPartTitle: '',
    followingPartCue: '',
};

const incrementDuration = (state, action) => {
    const newState = (action.isPaused) ? {pause: state.pause + 1000} :
        {runningPartDuration: state.runningPartDuration + 1000};
    return updateObject(state, newState);
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LIVE_SET_STATE:
            return updateObject(state, action.data);
        case actionTypes.LIVE_INCREMENT_RUNNING_PART_DURATION:
            return incrementDuration(state, action);
        case actionTypes.LIVE_UPDATE_SCHEDULED_END_TIME:
            return updateObject(state, {scheduledEndTime: action.time});
        case actionTypes.RESET_THE_SHOW:
            return updateObject(state, initialState);
        default:
            return state
    }
};

export default reducer;