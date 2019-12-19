import axios from 'axios'
// import {firebaseDb, firebase} from '../../firebase/firebase'
import * as actionTypes from './actionTypes';

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

export const resetRunningPartDuration = (value = 0) => {
    return {
        type: actionTypes.LIVE_RESET_RUNNING_PART_DURATION,
        value: value
    }
};

export const incrementRunningPartDuration = () => {
    return {
        type: actionTypes.LIVE_INCREMENT_RUNNING_PART_DURATION
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
    const runningPartDuration = 0;

    return {
        type: actionTypes.LIVE_SET_STATE,
        data: {
            isLive: false,
            isPaused: true,
            runningPartNumber: 0,
            runningBlockNumber: 0,
        }
    }
};

// Asynchronous ActionCreators

// fetchLiveData once
// export const fetchLiveData = () => {
//     const ref = firebaseDb.ref('live/');
//     return dispatch => {
//         const liveData = '';
//         ref.once('value',)
//             .then((snapshot)=> {
//                 console.log(snapshot.val());
//             })
//     }
// };

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
// export const fetchLiveData = () => {
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

export const startTheShow = () => {
    console.log('starting The show');
    return dispatch => {
        dispatch(setIsLiveAndPlay());
    };
};

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