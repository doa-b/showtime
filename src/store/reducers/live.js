import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";


const initialState = {
    isLive: false,
    isPaused: true,
    runningPartNumber: 1,
    runningBlockNumber: 0,
    runningPartDuration: 0
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

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LIVE_SET_IS_LIVE:
            return updateObject(state, {isLive: true, isPaused: false});
        case actionTypes.LIVE_CHANGE_CURRENT_PART_NUMBER:
            return skipToNextPart(state, action);
        case actionTypes.LIVE_TOGGLE_IS_PAUSED:
            return updateObject(state, {isPaused: !state.isPaused});
        case actionTypes.LIVE_RESET_RUNNING_PART_DURATION:
            return updateObject(state, {runningPartDuration: 0});
        case actionTypes.LIVE_INCREMENT_RUNNING_PART_DURATION:
            return updateObject(state, {runningPartDuration: state.runningPartDuration + 1000});
        case actionTypes.LIVE_END_PART:
            return updateObject(state, {isPaused: true});
        default:
            return state
    }
};

export default reducer;