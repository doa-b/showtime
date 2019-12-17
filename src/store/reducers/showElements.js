import * as actionTypes from '../actions/actionTypes'
import {updateObject, convertObjectsAndSortByKey, getCurrentUTCinMs, convertObjectstoArray} from '../../shared/utility';

const initialState = {
    shows: [],
    blocks: [],
    parts: [],
    scenes: [],
    error: null,
    loading: false,
    // currentShow: '-Lrst6TmmyYrkouGmiac',
    currentShow: '-Lrx3-oBw6jhk6A601Yo',
    showName: 'Fall Trend Show', // TODO can be removed
    showStartDateTime: getCurrentUTCinMs() + 30000, // TODO temporary
    currentTime: 0,
    displaySeconds: true,
    displayRealTime: true,
    pageTitle: 'Schedule',
    displayUser: null,
    isEditable: true,
    optionsMenu: null,
    optionsMenuAnchor: null,
    showAllScenes: false
};

const savedShowElement = (state, action) => {
    const newElement = updateObject(action.data, {elementId: action.elementId});
    return updateObject(state, {
        [action.elementName]: state[action.elementName].concat(newElement),
        error: null,
        loading: false
    });
};

const fetchedAllShowData = (state, action) => {
    const newState = {
        shows: convertObjectsAndSortByKey(action.shows, 'order'),
        blocks: convertObjectsAndSortByKey(action.blocks, 'order'),
        parts: convertObjectsAndSortByKey(action.parts, 'order'),
        // TODO was there a reason NOT to sort scenes?
        scenes: convertObjectsAndSortByKey(action.scenes, 'order'),
        error: null,
        loading: false
    };
    return updateObject(state, newState );
};

const dataCleared = (state) => {
    const newState = {
        shows: [],
        blocks: [],
        parts: [],
        scenes: [],
        showStartDateTime: getCurrentUTCinMs() + 30000
    };
    return updateObject(state, newState)
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_START:
            return updateObject(state, {error: null, loading: true});

        case actionTypes.SHOW_FAIL:
            return updateObject(state, {error: action.error, loading: false});

        case actionTypes.SHOW_SAVE_SUCCESS:
            return savedShowElement(state, action);

        case actionTypes.SHOW_SET_CURRENT:
            return updateObject(state, {currentShow: action.showId});

        case actionTypes.SHOW_FETCH_ALL_DATA_SUCCESS:
            return fetchedAllShowData(state, action);

        case actionTypes.SHOW_INCREMENT_CLOCK:
            return updateObject(state, {currentTime: state.currentTime + 1000});

        case actionTypes.SHOW_INITIATE_CLOCK:
            return updateObject(state, {currentTime: getCurrentUTCinMs()});

        case actionTypes.SHOW_TOGGLE_SHOW_SECONDS:
            return updateObject(state, {displaySeconds: !state.displaySeconds});

        case actionTypes.SHOW_SET_PAGE_TITLE:
            return updateObject(state, {pageTitle: action.pageTitle});

            case actionTypes.SHOW_TOGGLE_DISPLAY_REALTIME:
            return updateObject(state, {displayRealTime: !state.displayRealTime});
        case actionTypes.SHOW_SET_DISPLAY_USER:
            return updateObject(state, {displayUser: action.user});
        case actionTypes.SHOW_TOGGLE_IS_EDITABLE:
            return updateObject(state, {isEditable: !state.isEditable});
        case actionTypes.SHOW_SET_OPTIONS_MENU_AND_ANCHOR:
            return updateObject(state, {optionsMenu: action.elementType, optionsMenuAnchor: action.anchor });
        case actionTypes.SHOW_CLEAR_DATA:
            return dataCleared(state);
        case actionTypes.SHOW_SET_SHOW_ALL_SCENES:
            return updateObject(state, {showAllScenes: action.value});
        default:
            return state
    }
};

export default reducer;