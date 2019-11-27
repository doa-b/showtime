import axios from 'axios'

import * as actionTypes from './actionTypes';
import {incrementRunningPartDuration} from "./live";
import {updateObject} from "../../shared/utility";

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

export const fetchShowDataSuccess = (shows, blocks, parts, scenes) => {
    return {
        type: actionTypes.SHOW_FETCH_ALL_DATA_SUCCESS,
        shows: shows,
        blocks: blocks,
        parts: parts,
        scenes: scenes,
    }
};

export const initiateClock = () => {
    return {
        type: actionTypes.SHOW_INITIATE_CLOCK
    };
};

export const addSecondToClock = () => {
    return {
        type: actionTypes.SHOW_INCREMENT_CLOCK
    }
};

export const toggleShowSeconds = () => {
    return {
        type: actionTypes.SHOW_TOGGLE_SHOW_SECONDS
    }
};

export const toggleDisplayRealTime = () => {
    return {
        type: actionTypes.SHOW_TOGGLE_DISPLAY_REALTIME
    }
};

export const toggleIsEditable = () => {
    return {
        type: actionTypes.SHOW_TOGGLE_IS_EDITABLE
    }
};
export const setDisplayUser = (user) => {
    return {
        type: actionTypes.SHOW_SET_DISPLAY_USER,
        user: user
    }
};

export const setPageTitle = (title) => {
    return {
        type: actionTypes.SHOW_SET_PAGE_TITLE,
        pageTitle: title
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
                } else {
                    dispatch(fetch())
                }
            }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const deleteElement = (id, elementType) => {
    return (dispatch, getState) => {
        let parts = [];
        // check if this element has children and add to  multiple request Array
        if (elementType === 'blocks') {
            parts = getState().show.parts.filter(aPart => aPart.blockId === id)
        } else if (elementType === 'parts') {
            parts = (getState().show.parts.filter(aPart => aPart.id === id))
        }
        console.log('delete parts')
        console.log(parts)
        if (parts.length > 0) {
            parts.map((part) => {
                const scenes = getState().show.scenes.filter(aScene => aScene.partId === part.id);
                console.log('delete scenes')
                console.log(scenes)
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
            setTimeout(() => dispatch(fetch()), 1000) // set a 1 sec timeout to let the deletions finish before refresh
        }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const copyPartAndScenes = (partData, partId) => {
    return (dispatch, getState) => {
        dispatch(showStart());
        axios.post(`parts.json`, partData)
            .then((response => {
                const scenes = getState().show.scenes.filter(aScene => aScene.partId === partId);
                const newSceneRequests = [];
                if (scenes.length > 0) {
                    scenes.map((scene) => {
                        const newScene = updateObject(scene, {partId: response.data.name, id: null});
                        return newSceneRequests.push(axios.post(`scenes.json`, newScene))
                    });
                    axios.all(newSceneRequests)
                        .then((response => {
                            console.log(response);
                            dispatch(fetch())
                        }))
                        .catch(error => {
                            dispatch(showFail(error));
                        });
                } else dispatch(fetch())
            }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const copyBlockPartsAndScenes = (blockData, blockId) => {
    return (dispatch, getState) => {
        dispatch(showStart());
        console.log('blockID: ' + blockId);
        axios.post(`blocks.json`, blockData)
            .then((response => {
                const parts = getState().show.parts.filter(aPart => aPart.blockId === blockId);
                console.log(parts);
                if (parts.length > 0) {
                    parts.map((part) => {
                        const newPart = updateObject(part, {blockId: response.data.name, id: null});
                        return dispatch(copyPartAndScenes(newPart, part.id))
                    })
                } else dispatch(fetch())
            }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const update = (id, data, elementName) => {
    return dispatch => {
        axios.put(`${elementName}/${id}.json`, data)
            .then((response => {
                console.log(response);
                dispatch(fetch())
            }))
            .catch(error => {
                dispatch(showFail(error));
            });
    }
};

export const fetch = () => {
    return (dispatch, getState) => {
        dispatch(showStart());
        const showId = getState().show.currentShow;
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
                dispatch(updateElement);

                // NOTE: Fetching is done here (duplicate code) to prevent page from 'reloading'.
                axios.all([getAllShows(), getAllBlocks(showId), getAllParts(showId), getAllScenes(showId)]).then(
                    axios.spread((shows, blocks, parts, scenes) => {
                        dispatch(fetchShowDataSuccess(shows.data, blocks.data, parts.data, scenes.data));
                    })).catch(error => {
                    dispatch(showFail(error));
                })
            }))
            .catch(error => {
                dispatch(showFail(error));
            })
    };
};

export const startClock = () => {
    return (dispatch, getState) => {
        dispatch(initiateClock());
        setInterval(() => {
            const isPlaying = !getState().live.isPaused;
            dispatch(addSecondToClock());
            if (isPlaying) {
                dispatch(incrementRunningPartDuration());
            }
        }, 1000)
    }
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

const SaveorUpdateTeam = (showId, data, elementName, elementId) => {

}