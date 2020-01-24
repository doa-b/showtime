import React from 'react';
import {compose} from "redux";
import {withAuthorization} from '../../hoc/Session';
import {withFirebase} from "../../firebase";
import LiveMessageButton from "../ui/LiveMessage/LiveMessageButton";

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
import Monitor from "../../containers/Monitor/MonitorOld";
import clsx from "clsx";
import ScaleText from "react-scale-text";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    dateTime: {
        width: '100%',
    },
    liveView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    actionButton: {
        marginLeft: 10
    },
    resetButton: {
        marginRight: 5
    },
    buttons: {
        marginTop: 5
    },
    alert: {
        color: 'red',
    },
    textMessage: {
        margin: '5px 10px 0 10px',
        overflowX: 'hidden',
        border: '3px solid red'
    },
});
/**
 * Created by Doa on 7-1-2020.
 */
const ShowControls = withStyles(styles)(
    ({
         classes, firebase, blocks, parts, currentTime, onResetTheShow,
         live: {
             isLive, isPaused, pause, runningPartNumber, runningBlockNumber,
             runningPartDuration, runningPartStartTime,
             previousShowState, scheduledEndTime, monitorMessage
         }
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
                    nextPartDuration: partDetails.duration,
                    nextPartCue: partDetails.cue
                };
                return next;
            }
            return null
        };

        const getNext2Up = (blockNumber, partNumber) => {
            let live = {};
            let nextUpPart = getNextPart(blockNumber, partNumber);
            if (nextUpPart) {
                live = updateObject(live, nextUpPart);
                const followingPart = getNextPart(nextUpPart.runningBlockNumber, nextUpPart.runningPartNumber);
                if (followingPart) {
                    live = updateObject(live, {
                        followingPartId: followingPart.nextPartId,
                        followingPartTitle: followingPart.nextPartTitle,
                        followingPartCue: followingPart.nextPartCue
                    })
                }
            } else live = {
                showHasFinished: true,
                nextPartId: '',
                nextPartTitle: '',
                nextPartCue: '',
                followingPartId: '',
                followingPartTitle: '',
                followingPartCue: '',
                scheduledEndTime: ''
            }
            ;
            console.log('the new live is');
            console.log(live);
            return live

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
                isLive: true,
                previousShowState: previousShowState,
                isPaused: false,
                pause: 0,
                runningPartDuration: 0,
                runningPartStartTime: -1, // sets current server Time};
            };
            live = updateObject(live, getNext2Up(runningBlockNumber, runningPartNumber));
            firebase.setLiveData(live);
        };

        const returnToPreviousHandler = () => {
            firebase.setLiveData(previousShowState);
        };

        const pauseHandler = () => {
            firebase.setLiveData(
                {
                    isPaused: true,
                    runningPartDuration: runningPartDuration
                })
        };

        const resumeHandler = () => {
            firebase.setLiveData(
                {
                    isPaused: false,
                    pause: pause
                });
        };

        const startTheShow = () => {
            let live = {
                isLive: true,
                isPaused: false,
                pause: 0,
                runningPartStartTime: -1,
                scheduledEndTime: scheduledEndTime
            };
            // get the current 2 parts before the show starts
            live = updateObject(live, getNext2Up(0, -1));
            getNext2Up(0, -1);
            firebase.setLiveData(live)
        };

        const isOdd = () => {
            const test = Math.round(currentTime / 1000);
            return test % 2;
        };

        // *** Rendering ***

        let controls = (
            <Fab variant="extended" aria-label="start"
                 onClick={startTheShow} className={classes.fab}>
                Start The Show!
            </Fab>
        );

        if (isLive) {
            let playPause = (
                <Fab className={classes.actionButton}
                     color='primary' aria-label='play'
                     onClick={pauseHandler}>
                    <PauseIcon fontSize='large'/>
                </Fab>
            );

            if (isPaused) {
                playPause = (
                    <Fab className={classes.actionButton}
                         color='secondary' aria-label='play'
                         onClick={resumeHandler}>
                        <PlayArrowIcon fontSize='large'/>
                    </Fab>
                )
            }

            let previous = null;
            if (previousShowState) {
                previous = (
                    <Fab className={classes.actionButton}
                         color='primary' aria-label='back'
                         onClick={returnToPreviousHandler}>
                        <SkipPreviousIcon fontSize={'large'}/>
                    </Fab>)
            }

            const messageAlert = (monitorMessage) ? (
                <div className={clsx({
                    [classes.textMessage]: true, [classes.alert]: !isOdd()
                })}>
                    <ScaleText>
                        {monitorMessage.message}
                    </ScaleText>
                </div>
            ) : null;
            controls = (
                <>
                    <div className={classes.liveView}>
                        {previous}
                        <Typography variant='h2'>
                            {msToTime(currentTime, true)}
                        </Typography>
                        {playPause}
                        <Fab className={classes.actionButton}
                             color='primary' aria-label='play'
                             onClick={skipToNextPartHandler}>
                            <SkipNextIcon fontSize='large'/>
                        </Fab>
                    </div>
                    <div className={classes.buttons}>
                        <Button className={classes.resetButton}
                                variant="contained" color="primary"
                                onClick={() => onResetTheShow(firebase)}>
                            Reset the Show
                        </Button>
                        <LiveMessageButton/>
                        {messageAlert}
                    </div>
                    {/*<div className={classes.monitor}>*/}
                    {/*    <Monitor/>*/}
                    {/*</div>*/}
                </>
            );
        }
        return controls;
    });

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
        onResetTheShow: (firebase) => dispatch(actions.resetTheShow(firebase))
    }
};

// checks if user is authenticated to access this page (broad-grained authorization)
const condition = authUser => !!authUser;

/* @component */
export default compose(
    withFirebase,
    withAuthorization(condition),
    connect(mapStateToProps, mapDispatchToProps))(ShowControls);