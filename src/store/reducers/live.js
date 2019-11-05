import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";


const initialState = {
    isLive: false,
    isPaused: true,
    currentPartNumber: 0,
    currentBlockNumber: 0,
    runningPartDuration: 0
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LIVE_SET_IS_LIVE:
            return updateObject(state, {isLive: true, isPaused: false});
        case actionTypes.LIVE_CHANGE_CURRENT_PART_NUMBER:
            return updateObject(state, {currentPartNumber: state.currentPartNumber + 1});
        case actionTypes.LIVE_TOGGLE_IS_PAUSED:
            return updateObject(state, {isPaused: !state.isPaused});
        default:
            return state
    }
};

export default reducer;