import * as actionTypes from '../actions/actionTypes'
import {updateObject, convertObjectsAndSortByKey, getCurrentUTCinMs, convertObjectstoArray} from '../../shared/utility';

const initialState = {
    currentTime: 0,
    displaySeconds: true,
    displayRealTime: true,
    displayUser: null,
    isEditable: true,
    optionsMenu: null,
    optionsMenuAnchor: null,
    showAllScenes: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT_CLOCK:
            return updateObject(state, {currentTime: state.currentTime + 1000});

        case actionTypes.INITIATE_CLOCK:
            return updateObject(state, {currentTime: getCurrentUTCinMs()});

        case actionTypes.SHOW_SECONDS:
            return updateObject(state, {displaySeconds: !state.displaySeconds});

            case actionTypes.TOGGLE_DISPLAY_REALTIME:
            return updateObject(state, {displayRealTime: !state.displayRealTime});

        case actionTypes.DISPLAY_USER:
            return updateObject(state, {displayUser: action.user});

        case actionTypes.TOGGLE_IS_EDITABLE:
            return updateObject(state, {isEditable: !state.isEditable});

            case actionTypes.SET_OPTIONS_MENU_AND_ANCHOR:
            return updateObject(state, {optionsMenu: action.elementType, optionsMenuAnchor: action.anchor });

        case actionTypes.SET_SHOW_ALL_SCENES:
            return updateObject(state, {showAllScenes: action.value});
        default:
            return state
    }
};

export default reducer;