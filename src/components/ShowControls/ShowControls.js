import React from 'react';
import {compose} from "redux";
import {withAuthorization} from '../../hoc/Session';
import {withFirebase} from "../../firebase";

import * as actions from "../../store/actions";
import {connect} from "react-redux";

import {msToTime, updateObject} from "../../shared/utility";
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";

import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    dateTime: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    liveView: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    actionButton: {
        marginLeft: 10
    }
});
/**
 * Created by Doa on 7-1-2020.
 */
const ShowControls = withStyles(styles)(
    ({
         classes, firebase, blocks, parts, onSaveLiveData, currentTime,
         live: {
             isLive, isPaused, pause, runningPartNumber, runningBlockNumber,
             runningPartDuration, runningPartStartTime,
             previousShowState, scheduledEndTime
         }, ...props
     }) => {

        const getNextPart = (currentBlockNumber, currentPartNumber) => {
            let nextPart = currentPartNumber;
            let nextBlock = currentBlockNumber;
            const runningBlockId = blocks[currentBlockNumber].id;
            const runningBlockPartsAmount =
                parts.filter(aPart => aPart.blockId === runningBlockId).length;
            if (nextPart + 1 < runningBlockPartsAmount) {
                nextPart += 1
            } else {
                nextBlock += 1;
                nextPart = 0;
            }
            if (nextBlock < blocks.length) {
                const nextBlockId = blocks[nextBlock].id;
                const partDetails = parts.filter(aPart => aPart.blockId === nextBlockId)[nextPart];
                console.log('nextPartDetails');
                console.log(partDetails);
                const next = {
                    runningBlockNumber: nextBlock,
                    runningPartNumber: nextPart,
                    nextPartId: partDetails.id,
                    nextPartTitle: partDetails.title,
                    nextPartCue: partDetails.cue
                };
                return next;
            }
            return null
        };

        const skipToNextPartHandler = () => {
            const previousShowState = {
                isPaused: true,
                runningPartNumber: runningPartNumber,
                runningBlockNumber: runningBlockNumber,
                runningPartDuration: runningPartDuration,
                runningPartStartTime: runningPartStartTime,
                pause: pause + runningPartDuration
            };
            let live = {
                previousShowState: previousShowState,
                isPaused: false,
                pause: 0,
                runningPartDuration: 0,
                runningPartStartTime: -1, // sets current server Time};
            };
            let nextUpPart = getNextPart(runningBlockNumber, runningPartNumber);
            if (nextUpPart) {
                live = updateObject(live, nextUpPart);
                console.log(nextUpPart);
                const followingPart = getNextPart(nextUpPart.runningBlockNumber, nextUpPart.runningPartNumber);
                if (followingPart) {
                    live = updateObject(live, {
                        followingPartId: followingPart.nextPartId,
                        followingPartTitel: followingPart.nextPartTitle,
                        followingPartCue: followingPart.nextPartCue
                    })
                }
                console.log('The new live will be');
                console.log(live)
                //now set the new live
               firebase.setLiveData( live)
            } else {
                // set end of show
                onSaveLiveData(firebase,
                    {
                        showHasFinished: true
                    });
            }
        };

        const returnToPreviousHandler = () => {
           firebase.setLiveData(previousShowState);
        };

        const togglePauseHandler = () => {
            if (isPaused) {
                // resume
                onSaveLiveData(this.props.firebase,
                    {
                        isPaused: false,
                        pause: pause
                    });
            } else {
                // pause
               firebase.setLiveData(
                    {
                        isPaused: true,
                        runningPartDuration: runningPartDuration
                    })
            }
        };

        const resetTheShow = () => {
           firebase.setLiveData(
                {
                    isLive: false,
                    isPaused: true,
                    pause: 0,
                    previousShowState: null,
                    runningBlockNumber: 0,
                    runningPartNumber: 0,
                    runningPartDuration: 0,
                    runningPartStartTime: -1,
                    showHasFinished: false,
                    nextPartId: null,
                    nextPartTitle: null,
                    nextPartCue: null,
                    followingPartId: null,
                    followingPartTitel: null,
                    followingPartCue: null,
                    scheduledEndTime: null,
                });
        };

        const startTheShow = () => {
           firebase.setLiveData(
                {
                    isLive: true,
                    isPaused: false,
                    pause: 0,
                    runningPartStartTime: -1,
                    scheduledEndTime: scheduledEndTime
                });
        };

        let controls = (
            <Fab variant="extended" aria-label="start"
                 onClick={startTheShow} className={classes.fab}>
                Start The Show!
            </Fab>
        );

        if (isLive) {
            let playPause = (isPaused) ?
                <PlayArrowIcon fontSize='large' color='secondary'/> : <PauseIcon fontSize='large'/>

            let previous = null;
            if (previousShowState) {
                previous = (
                    <Fab className={classes.actionButton}
                         color='primary' aria-label='back'
                         onClick={returnToPreviousHandler}>
                        <SkipPreviousIcon fontSize={'large'}/>
                    </Fab>)
            }
            controls = (
                <>
                    <div className={classes.liveView}>
                        {previous}
                        <Typography variant='h2'>
                            {msToTime(currentTime, true)}
                        </Typography>
                        <Fab className={classes.actionButton}
                             color='primary' aria-label='play'
                             onClick={togglePauseHandler}>
                            {playPause}
                        </Fab>
                        <Fab className={classes.actionButton}
                             color='primary' aria-label='play'
                             onClick={skipToNextPartHandler}>
                            <SkipNextIcon fontSize='large'/>
                        </Fab>
                    </div>
                    <Button variant="contained" color="primary"
                            onClick={resetTheShow}>
                        Reset the Show
                    </Button>
                </>
            );
        }
        return controls;
    });

// classes, firebase, blocks, parts, onSaveLiveData, currentTime
const mapStateToProps = (state) => {
    return {
        currentTime: state.global.currentTime,
        blocks: state.show.blocks,
        parts: state.show.parts,
        live: state.live
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onFetch: (showId) => dispatch(actions.fetch(showId)),
        onStartClock: (firebase, isAdmin) => dispatch(actions.startClock(firebase, isAdmin)),
        onStartTheShow: () => dispatch(actions.startTheShow()),
        onTogglePause: () => dispatch(actions.toggleIsPaused()),
        onSetNextPart: (nextPart, nextBlock) => dispatch(actions.setNextPart(nextPart, nextBlock)),
        onEndOfShow: () => dispatch(actions.showHasEnded()),
        onSavePreviousState: (previousState) => dispatch(actions.savePreviousState(previousState)),
        onResetRunningPartDuration: (firebase) => dispatch(actions.resetRunningPartDuration(firebase)),
        onFetchLiveData: (firebase) => dispatch(actions.setLiveDataListener(firebase)),
        onSaveLiveData: (firebase, data) => dispatch(actions.saveLiveData(firebase, data))
    }
};

// checks if user is authenticated to access this page (broad-grained authorization)
const condition = authUser => !!authUser;

/* @component */
export default compose(
    withFirebase,
    withAuthorization(condition),
    connect(mapStateToProps, mapDispatchToProps))(ShowControls);