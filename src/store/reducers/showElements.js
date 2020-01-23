import * as actionTypes from '../actions/actionTypes'
import {updateObject, convertObjectsAndSortByKey, getCurrentUTCinMs} from '../../shared/utility';

import {elementType} from "prop-types";

const initialState = {
    shows: [],
    blocks: [],
    parts: [],
    scenes: [],
    error: null,
    loading: false,
    currentShow: '-Lrst6TmmyYrkouGmiac',
    //currentShow: '-Lrx3-oBw6jhk6A601Yo'
    showStartDateTime: getCurrentUTCinMs() + 30000, // TODO temporary
};

const fetchedData = (state, action) => {
    const newState = {
        [action.element]: convertObjectsAndSortByKey(action.data, 'order')
    };
    return updateObject(state, newState)
};

const dataCleared = (state, action) => {
    let newState = {
        shows: [],
        blocks: [],
        parts: [],
        scenes: [],
        showStartDateTime: getCurrentUTCinMs() + 30000
    };
        if (action.elementType) {
            newState = {[elementType]: []}
    }
    return updateObject(state, newState)
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_START:
            return updateObject(state, {error: null, loading: true});

        case actionTypes.SHOW_FAIL:
            return updateObject(state, {error: action.error, loading: false});

        case actionTypes.SHOW_SET_CURRENT:
            return updateObject(state, {currentShow: action.showId});

        case actionTypes.SHOW_CLEAR_DATA:
            return dataCleared(state, action);

        case actionTypes.SHOW_FETCH_DATA_SUCCESS:
            return fetchedData(state, action);

        case actionTypes.SHOW_SUCCESS:
            return updateObject( state, {error: null, loading: false});
        default:
            return state
    }
};

export default reducer;