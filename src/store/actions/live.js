import * as actionTypes from './actionTypes';
import * as actions from '../actions'
import {updateObject} from "../../shared/utility";
import {initialState} from '../reducers/live'

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

export const updateScheduledEndTime = (time) => {
    return {
        type: actionTypes.LIVE_UPDATE_SCHEDULED_END_TIME,
        time: time
    }
};

export const setLiveState = (data) => {
    return {
        type: actionTypes.LIVE_SET_STATE,
        data: data
    }
};

export const resetShow = () => {
    return {
        type: actionTypes.RESET_THE_SHOW
    }
};

// *** Asynchronous ActionCreators ***

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
    return (dispatch, getState) => {
        let runningPartDuration = 0;
        // when show is paused, set currentpartDuration as provided from db
        if (show.isPaused) {
            dispatch(setLiveState(show))
        } else {
            if (show.isLive) {
                if (getState().live.serverOffset) {
                    console.log('taking known offset version')
                    runningPartDuration = getState().live.serverOffset + Date.now() - show.runningPartStartTime - show.pause
                    dispatch(setLiveState(updateObject(show, {runningPartDuration: runningPartDuration})))
                } else {
                    firebase.db.ref('/.info/serverTimeOffset')
                        .once('value')
                        .then(function stv(data) {
                            console.log('the current ServerDateTime is: ');
                            console.log(data.val() + Date.now());
                            //                      current serverTime
                            runningPartDuration = (data.val() + Date.now() - show.runningPartStartTime - show.pause);
                            console.log(runningPartDuration);
                            const newLiveState = updateObject(show,
                                {
                                    runningPartDuration: runningPartDuration,
                                    serverOffset: data.val()
                                });
                            console.log('nowdispatchingLiveState');
                            console.log(newLiveState);
                            dispatch(setLiveState(newLiveState))
                        }, function (err) {
                            return err;
                        });
                }

            } else dispatch(setLiveState(updateObject(show,
                {runningPartDuration: runningPartDuration})))
        }
    }
};

export const resetTheShow = (firebase) => {
    console.log('RESETTING THE SHOW');
    const newData = updateObject(initialState, {
        runningPartStartTime: -1,
    });
    delete newData.currentShow;
    delete newData.serverOffset;

    return dispatch => {
        firebase.live().update(newData);
        dispatch(resetShow())
    };
};

export const setCurrentShow = (firebase, showId) => {
    return dispatch => {
        firebase.live().update({currentShow: showId})
            .then(() => {
                dispatch(actions.fetch(showId))

            })

    }
};

// export const partHasEnded = (firebase) => {
//     console.log('Part has ended');
//     return dispatch => {
//         firebase.live().update({isPaused: true});
//         dispatch(partEnd());
//     }
// };