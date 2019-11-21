import * as actionTypes from '../actions/actionTypes'
import {updateObject, convertObjectsAndSortByKey, getCurrentUTCinMs, convertObjectstoArray} from '../../shared/utility';

const initialState = {
    shows: [],
    blocks: [],
    parts: [],
    scenes: [],
    error: null,
    loading: false,
    currentShow: '-Lrst6TmmyYrkouGmiac',
    showName: 'Fall Trend Show',
    showStartDateTime: getCurrentUTCinMs() + 30000,
    currentTime: 0,
    displaySeconds: true,
    displayRealTime: true,
    pageTitle: 'Schedule',
    displayUser: null,
    isEditable: true
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
        scenes: convertObjectstoArray(action.scenes),
        error: null,
        loading: false
    };

    return updateObject(state, newState );
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
        default:
            return state
    }
};

export default reducer;