import * as actionTypes from '../actions/actionTypes'
import {updateObject, convertObjectsAndSortByKey, getCurrentUTCinMs, convertObjectstoArray} from '../../shared/utility';
import {update} from "../actions";
import {elementType} from "prop-types";

const initialState = {
    shows: [],
    blocks: [],
    parts: [],
    scenes: [],
    error: null,
    loading: false,
    currentShow: '-Lrst6TmmyYrkouGmiac',
    //currentShow: '-Lrx3-oBw6jhk6A601Yo',
    showName: 'Fall Trend Show', // TODO can be removed
    showStartDateTime: getCurrentUTCinMs() + 30000, // TODO temporary
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
        scenes: convertObjectsAndSortByKey(action.scenes, 'order'),
        error: null,
        loading: false
    };
    return updateObject(state, newState );
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