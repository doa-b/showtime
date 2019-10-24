import * as actionTypes from '../actions/actionTypes'
import { updateObject, convertObjectsAndSortByKey } from '../../shared/utility';


const initialState = {
    shows: [],
    blocks: [],
    parts: [],
    scenes: [],
    error: null,
    loading: false,
    currentShow: '-Lrst6TmmyYrkouGmiac'
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
        blocks: convertObjectsAndSortByKey(action.blocks, 'order'),
        parts: convertObjectsAndSortByKey(action.parts, 'order'),
        scenes: convertObjectsAndSortByKey(action.scenes, 'order'),
        error: null,
        loading: null
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

        default:
            return state
    }
};

export default reducer;