import axios from 'axios'

import * as actionTypes from './actionTypes';
import {incrementRunningPartDuration} from "./live";
import {updateObject} from "../../shared/utility";
import * as actions from "./index";

export const showStart = () => {
    return {
        type: actionTypes.SHOW_START
    }
};

export const showSuccess = () => {
    return {
        type: actionTypes.SHOW_SUCCESS
    }
};
// TODO Remove
export const elementSaveSucces = (elementName, data, elementId) => {
    return {
        type: actionTypes.SHOW_SAVE_SUCCESS,
        elementName: elementName,
        elementId,
        data: data,

    }
};

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

export const setCurrentShowState = (showId) => {
    return {
        type: actionTypes.SHOW_SET_CURRENT,
        showId: showId
    }
};

// export const fetchShowDataSuccess = (shows, blocks, parts, scenes) => {
//     return {
//         type: actionTypes.SHOW_FETCH_ALL_DATA_SUCCESS,
//         shows: shows,
//         blocks: blocks,
//         parts: parts,
//         scenes: scenes,
//     }
// };

export const fetchShowDataSuccess = (element, data) => {
    if (!data) data ={};
    console.log(element);
    console.log(data);
    return {
        type: actionTypes.SHOW_FETCH_DATA_SUCCESS,
        element: element,
        data: data
    }
};
/**
 *
 * @param elementType: when omited it clears all
 * @returns {{type: *, elementType: *}}
 */
export const clearData = (elementType) => {
    return {
        type: actionTypes.SHOW_CLEAR_DATA,
        elementType: elementType
    }
};

// Asynchronous actionCreators

export const setCurrentShow = (firebase, showId) => {
    return (dispatch, getState) => {
        firebase.currentShow().set(showId)
            .then(() => {
                //dispatch(actions.fetch(showId))
                // remove old listeners
              firebase.onRemoveElementListeners(getState().show.currentShow);
                // remove previous show data
              dispatch(clearData());
              // set showId to currentShow store state
              dispatch(setCurrentShowState(showId));
              // set new listeners
                dispatch(setElementListeners(firebase))
            })
    }
};

export const setCurrentShowListener = (firebase) => {

};
/**
 * we must toggle a top level node of show store, in order to update the mapped props
 * @param element
 * @param data
 * @returns {Function}
 */
export const changedShowData = (element, data) => {
    return dispatch => {
     dispatch(showStart());
        dispatch(fetchShowDataSuccess(element, data));
    dispatch(showSuccess());
    }
};

export const setElementListeners = (firebase) => {
    return dispatch => {
        firebase.currentShow().once('value')
            .then ((snapshot) => {
                const showId = snapshot.val();
                dispatch(setCurrentShowState(showId));
                firebase.blocksOfShow(showId).on('value',
                (snapshot) =>
                    dispatch(changedShowData('blocks', snapshot.val()))
                );
                firebase.partsOfShow(showId).on('value',
                    (snapshot) =>
                        dispatch(changedShowData('parts', snapshot.val()))
                );
                firebase.scenesOfShow(showId).on('value',
                    (snapshot) =>
                        dispatch(changedShowData('scenes', snapshot.val()))
                );
                firebase.shows().on('value',
                    (snapshot) =>
                        dispatch(changedShowData('shows', snapshot.val()))
                );
            })
    }
};

export const save = (elementName, data) => {
    return dispatch => {
        dispatch(showStart());
        axios.post(`${elementName}.json`, data)
            .then((response => {
                console.log(response);
               dispatch(showSuccess())
                // dispatch(elementSaveSucces(elementName, data, response.data.name));
                if (elementName === 'shows') {
                    dispatch(clearData());
                    dispatch(setCurrentShow(response.data.name))
                }
               // dispatch(fetch())
            })).catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const deleteElement = (id, elementType) => {
    return (dispatch, getState) => {
        dispatch(showStart());
        let parts = [];
        // check if this element has children and add to  multiple request Array
        if (elementType === 'blocks') {
            parts = getState().show.parts.filter(aPart => aPart.blockId === id)
        } else if (elementType === 'parts') {
            parts = (getState().show.parts.filter(aPart => aPart.id === id))
        }
        if (parts.length > 0) {
            parts.map((part) => {
                const scenes = getState().show.scenes.filter(aScene => aScene.partId === part.id);
                if (scenes.length > 0) {
                    scenes.map((scene) => {
                        return axios.delete(`scenes/${scene.id}.json`) // delete its scenes
                    });
                }
                return axios.delete(`parts/${part.id}.json`); // delete part
            })
        }
        axios.delete(`${elementType}/${id}.json`).// delete element
        then((response => {
            console.log('delete succesfull')
            dispatch(showSuccess())
            //setTimeout(() => dispatch(fetch()), 1000) // set a 1 sec timeout to let the deletions finish before refresh
        }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const copyPartAndScenes = (partData, partId) => {
    return (dispatch, getState) => {
        axios.post(`parts.json`, partData)
            .then((response => {
                const scenes = getState().show.scenes.filter(aScene => aScene.partId === partId);
                const newSceneRequests = [];
                if (scenes.length > 0) {
                    scenes.map((scene) => {
                        const newScene = updateObject(scene, {partId: response.data.name, id: null, showId: partData.showId});
                        return newSceneRequests.push(axios.post(`scenes.json`, newScene))
                    });
                    axios.all(newSceneRequests)
                        .catch(error => {
                            dispatch(showFail(error));
                        });
                }
            }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const copyBlockPartsAndScenes = (blockData, blockId) => {
    return (dispatch, getState) => {
       // dispatch(showStart());
        console.log('blockID: ' + blockId);
        axios.post(`blocks.json`, blockData)
            .then((response => {
                const parts = getState().show.parts.filter(aPart => aPart.blockId === blockId);
                console.log(parts);
                if (parts.length > 0) {
                    parts.map((part) => {
                        const newPart = updateObject(part, {blockId: response.data.name, id: null, showId: blockData.showId});
                        return dispatch(copyPartAndScenes(newPart, part.id))
                    })
                } //else dispatch(fetch())
            }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const update = (id, data, elementName) => {
    return dispatch => {
        dispatch(showStart());
        axios.put(`${elementName}/${id}.json`, data)
            .then((response => {
                console.log(response);
              dispatch(showSuccess())
                //  dispatch(fetch())
            }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const fetch = (showId) => {
    return (dispatch, getState) => {
        dispatch(showStart());
        if (!showId) {
            const showId = getState().live.currentShow;
        }
        axios.all([getAllShows(), getAllBlocks(showId), getAllParts(showId), getAllScenes(showId)]).then(
            axios.spread((shows, blocks, parts, scenes) => {
                dispatch(fetchShowDataSuccess(shows.data, blocks.data, parts.data, scenes.data));
            })).catch(error => {
            dispatch(showFail(error));
        })
    };
};

export const updateOrder = (showId, data, elementName) => {
    return dispatch => {
        axios.all(UpdateOrderFromElements(showId, data, elementName)).then(
            axios.spread((response) => {
              console.log(response);
                // dispatch(updateElement);
                //
                // // NOTE: Fetching is done here (duplicate code) to prevent page from 'reloading'.
                // axios.all([getAllShows(), getAllBlocks(showId), getAllParts(showId), getAllScenes(showId)]).then(
                //     axios.spread((shows, blocks, parts, scenes) => {
                //         dispatch(fetchShowDataSuccess(shows.data, blocks.data, parts.data, scenes.data));
                //     })).catch(error => {
                //     dispatch(showFail(error));
                // })
            }))
            .catch(error => {
                dispatch(showFail(error));
            })
    };
};

// Axios helper functions
const getAllShows = () => {
    return axios.get('shows/.json');
};
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
        requestsArray.push(request)
    }
    console.log(requestsArray);
    return requestsArray
};