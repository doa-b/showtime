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

// todo See how burgerbuilder does that with change ingredient in reducer!!!
// todo https://codeburst.io/javascript-array-distinct-5edc93501dc4
//todo https://stackoverflow.com/questions/50898249/determine-whether-to-push-or-update-object-in-array-based-on-unique-id
export const updateElement = () => {
    return {
        type: actionTypes.SHOW_UPDATE_ELEMENT
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
        axios.all([getAllBlocks(showId), getAllParts(showId), getAllScenes(showId)]).then
        (axios.spread((blocks, parts, scenes) => {
            console.log(blocks);
            console.log(parts);
            console.log(scenes);
            dispatch(fetchShowDataSuccess(blocks.data, parts.data, scenes.data));
        })).catch(error => {
            dispatch(showFail(error));
        })
    };
};

export const updateOrder = (showId, data, elementName) => {
    return dispatch => {
        dispatch(showStart());
        console.log(showId);
        axios.all(UpdateOrderFromElements(showId, data, elementName)).then
        (axios.spread((response) => {
            console.log(response);
            dispatch(updateElement);
            dispatch(fetch(showId))
        }))
            .catch(error => {
                dispatch(showFail(error));
            })
    };
};
// todo make updateOrder (element) with axios.put

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

const UpdateOrderFromElements = (showId, data, elementName) => {
    const requestsArray = [];
    let request = null;
    for (let i = 0; i < data.length; i++) {
        request = axios.put(`${elementName}/${data[i].id}/order.json`, i);
        // todo replace scenes with variable url
        requestsArray.push(request)
    }
    console.log(requestsArray);
    return requestsArray
};


const getAllShows = (showId) => {
    return axios.get('shows/.json')
};

