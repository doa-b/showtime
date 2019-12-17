import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";

// save isLive, isPaused, runningPartNumber, runningBlockNumber, showId
// runningPartStartTime, showHasFinished and scheduledEndTime when show goes live.
// And update when controls are clicked
const initialState = {
    isLive: false,
    isPaused: true,
    runningPartNumber: 0,
    runningBlockNumber: 0,
    runningPartDuration: 0,
    showHasFinished: false,
    scheduledEndTime: 0,
    previousState: null,
};

const skipToNextPart = (state, action) => {
    return updateObject(state,
        {
            runningPartNumber: action.nextPart,
            runningBlockNumber: action.nextBlock,
            isPaused: false,
            runningPartDuration: 0
        });
};

const endOfShow = (state) => {
    return updateObject(state, {
            isLive: false,
            isPaused: true,
            runningPartNumber: 0,
            runningBlockNumber: 0,
            runningPartDuration: 0,
            showHasFinished: true
        }
        )
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LIVE_SET_IS_LIVE:
            return updateObject(state, {isLive: true, isPaused: false});
        case actionTypes.LIVE_CHANGE_CURRENT_PART_NUMBER:
            return skipToNextPart(state, action);
        case actionTypes.LIVE_TOGGLE_IS_PAUSED:
            return updateObject(state, {isPaused: !state.isPaused});
        case actionTypes.LIVE_RESET_RUNNING_PART_DURATION:
            return updateObject(state, {runningPartDuration: action.value});
        case actionTypes.LIVE_INCREMENT_RUNNING_PART_DURATION:
            return updateObject(state, {runningPartDuration: state.runningPartDuration + 1000});
        case actionTypes.LIVE_END_PART:
            return updateObject(state, {isPaused: true});
        case actionTypes.LIVE_END_OF_SHOW:
            return endOfShow(state);
        case actionTypes.LIVE_UPDATE_SCHEDULED_END_TIME:
            return updateObject(state, {scheduledEndTime: action.time});
        case actionTypes.LIVE_SAVE_PREVIOUS_STATE:
            return updateObject(state, {previousState: action.previousState});
        default:
            return state
    }
};

export default reducer;