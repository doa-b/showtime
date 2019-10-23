import axios from 'axios'
import * as keys from '../../kluisje'

import * as actionTypes from './actionTypes';

export const showStart = () => {
    return {
        type: actionTypes.SHOW_START
    }
};

export const elementSaveSucces = (elementName, data, elementId) => {
    return {
        type: actionTypes.SHOW_SAVE_SUCCESS,
        elementName: elementName,
        elementId,
        data: data,

    }
};

export const showFail = (error) => {
    return {
        type: actionTypes.SHOW_FAIL,
        error: error
    }
};

export const setCurrentShow = (showId) => {
    return {
        type: actionTypes.SHOW_SET_CURRENT,
        showId: showId
    }
};

export const fetchShowDataSuccess = (blocks, parts, scenes) => {
    return {
        type: actionTypes.SHOW_FETCH_ALL_DATA_SUCCESS,
        blocks: blocks,
        parts: parts,
        scenes: scenes,
    }
};

// Asynchronous actionCreators

export const save = (elementName, data) => {
    return dispatch => {
        dispatch(showStart());
        axios.post(`${elementName}.json`, data)
            .then((response => {
                console.log(response);
                dispatch(elementSaveSucces(elementName, data, response.data.name));
                if (elementName === 'shows') {
                    dispatch(setCurrentShow(response.data.name))
                }
            }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const fetch = (showId) => {
    return dispatch => {
        dispatch(showStart());
        console.log(showId);
        axios.all([getAllBlocks(showId), getAllParts(showId), getAllScenes(showId)])
            .then(axios.spread((blocks, parts, scenes) => {
                console.log(blocks);
                console.log(parts);
                console.log(scenes);
                dispatch(fetchShowDataSuccess(blocks.data, parts.data, scenes.data));
            }))
            .catch(error => {
                dispatch(showFail(error));
            })
    };
};

// todo make update (element) with axios.put

// Axios helper functions

const getAllBlocks = (showId) => {
    return axios.get('blocks/.json', {
        params: {
            orderBy: '"showId"',
            equalTo: `"${showId}"`,
        }
    });
};

const getAllParts = (showId) => {
    return axios.get('parts/.json', {
        params: {
            orderBy: '"showId"',
            equalTo: `"${showId}"`,
        }
    });
};

const getAllScenes = (showId) => {
    return axios.get('scenes/.json', {
        params: {
            orderBy: '"showId"',
            equalTo: `"${showId}"`,
        }
    });
};


const getAllShows = (showId) => {
    return axios.get('shows/.json')
};


// Zoek later uit

// axios.all([getAllBlocks(showId), getAllShows])
//     .then(axios.spread((blocks, parts) => {
//         console.log(blocks);
//         dispatch(fetchShowDataSuccess(blocks.data));
//     }))
//     .catch(error => {
//         dispatch(showFail(error));
//     })
// };
// };
//
// // todo make update (element) with axios.put
//
