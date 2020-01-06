import axios from 'axios'
// import {firebaseDb, firebase} from '../../firebase/firebase'
import {WithFirebase} from "../../firebase";
import * as actionTypes from './actionTypes';
import {updateObject} from "../../shared/utility";

export const setIsLiveAndPlay = () => {
    return {
        type: actionTypes.LIVE_SET_IS_LIVE
    }
};

export const togglePaused = () => {
    return {
        type: actionTypes.LIVE_TOGGLE_IS_PAUSED
    }
};

export const changeCurrentPartNumber = (nextPart, nextBlock) => {
    return {
        type: actionTypes.LIVE_CHANGE_CURRENT_PART_NUMBER,
        nextPart: nextPart,
        nextBlock: nextBlock
    }
};


export const incrementRunningPartDuration = (isPaused) => {
    return {
        type: actionTypes.LIVE_INCREMENT_RUNNING_PART_DURATION,
        isPaused: isPaused
    }
};

export const partEnd = () => {
    return {
        type: actionTypes.LIVE_END_PART
    }
};

export const showEnd = () => {
    return {
        type: actionTypes.LIVE_END_OF_SHOW
    }
};

export const updateScheduledEndTime = (time) => {
    return {
        type: actionTypes.LIVE_UPDATE_SCHEDULED_END_TIME,
        time: time
    }
};

export const savePreviousState = (previousState) => {
    return {
        type: actionTypes.LIVE_SAVE_PREVIOUS_STATE,
        previousState: previousState
    }
};

export const setLiveState = (data) => {
    return {
        type: actionTypes.LIVE_SET_STATE,
        data: data
    }
};

// export const setLiveState = (data) => {
//     const runningPartDuration = 0;
//
//     return {
//         type: actionTypes.LIVE_SET_STATE,
//         data: {
//             isLive: false,
//             isPaused: true,
//             runningPartNumber: 0,
//             runningBlockNumber: 0,
//         }
//     }
// };

// Asynchronous ActionCreators

//setLiveDataListener
export const setLiveDataListener = (firebase) => {
    console.log('listener is dispatched');
    return dispatch => {
        firebase.live().on('value', (snapshot) => {
            console.log('setLiveDataListener is called');
            console.log(snapshot.val());

            dispatch(calculateLiveState(firebase, snapshot.val()))
        })
    };
};

/**
 * Gets the server time to calculate how long current part is running
 * @param firebase
 * @param show
 * @returns {Function}
 */
export const calculateLiveState = (firebase, show) => {
    return dispatch => {
        let runningPartDuration = 0;
        // when show is paused, set currentpartDuration as provided from db
        if (show.isPaused) {
            dispatch(setLiveState(show))
        } else {
            if (show.isLive) {
                firebase.db.ref('/.info/serverTimeOffset')
                    .once('value')
                    .then(function stv(data) {
                        console.log('the current ServerDateTime is: ');
                        console.log(data.val() + Date.now());
                        //                      current serverTime
                        runningPartDuration = (data.val() + Date.now() - show.runningPartStartTime - show.pause);
                        console.log(runningPartDuration);
                        const newLiveState = updateObject(show,
                            {runningPartDuration: runningPartDuration});
                        console.log('nowdispatchingLiveState')
                        console.log(newLiveState)
                        dispatch(setLiveState(newLiveState))
                    }, function (err) {
                        return err;
                    });
            } else dispatch(setLiveState(updateObject(show,
                {runningPartDuration: runningPartDuration})))
        }
    }
};

export const startTheShow = (firebase) => {
    console.log('starting The show');
    console.log(firebase.db);

    // firebase.setLiveData(newData);
    return dispatch => {
        const newData = {isLive: true, isPaused: false};
        firebase.live().update(newData)
        //     //dispatch(setIsLiveAndPlay());
    };
};

export const saveLiveData = (firebase, data) => {
    return dispatch => {
        firebase.setLiveData(data)
    }
};

export const resetRunningPartDuration = (firebase) => {
    return dispatch => {
        firebase.resetRunningPartDuration()
        // type: actionTypes.LIVE_RESET_RUNNING_PART_DURATION,
        // value: value
    }
};

export const increaseRunningPartStartTime = (firebase) => {
    return dispatch => {
        firebase.addToRunningPartStartTime()
    };

    };


// export const saveLiveData = () => {
//     const ref = firebaseDb.ref('/live/');
//     const newData = {
//         isLive: false,
//         isPaused: true,
//         runningPartNumber: 0,
//         runningBlockNumber: 0,
//         showHasFinished: false,
//         scheduledEndTime: 0,
//         previousState: null
//     };
//     return dispatch => {
//         const liveData = '';
//         ref.update(newData);
//     }
// };
//
// // setListener on LiveData
// export const setLiveDataListener = () => {
//     const ref = firebaseDb.ref('live/');
//     return dispatch => {
//         const liveData = '';
//         ref.on('value', (snapshot) => {
//             console.log(snapshot.val());
//         })
//     }
// };
//
// export const setLiveData = (data) => {
//     const ref = ('/.info/serverTimeOffset');
//     return dispatch => {
//         ref.once('value')
//             .then(function stv(data) {
//                 console.log('the current ServerDateTime is: ')
//                 console.log(data.val() + Date.now());
//             }, function (err) {
//                 return err;
//             });
//     }
// };


export const setNextPart = (nextPart, nextBlock) => {
    return dispatch => {
        dispatch(changeCurrentPartNumber(nextPart, nextBlock));
    }
};

export const toggleIsPaused = () => {
    console.log('toggling pause');
    return dispatch => {
        dispatch(togglePaused());
    }
};

export const partHasEnded = () => {
    console.log('Part has ended');
    return dispatch => {
        dispatch(partEnd());
    }
};

export const showHasEnded = () => {
    return dispatch => {
        dispatch(showEnd());
    }
};