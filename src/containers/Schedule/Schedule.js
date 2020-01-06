import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom'
import {withAuthorization} from '../../hoc/Session';
import {withFirebase} from "../../firebase";

import * as actions from "../../store/actions";
import {connect} from "react-redux";
import BlocksList from "../Blocks/BlocksList/BlocksList";
import Spinner from '../../components/ui/Spinner/Spinner'
import {msToDate, msToTime, updateObject} from "../../shared/utility";
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";

import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';

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
    })
;

/**
 * Created by Doa on 23-10-2019.
 */
class Schedule extends Component {

    state = {
        showUser: false,
        userId: ''
    };

    componentDidMount() {
        //this.props.onFetchLiveData(this.props.firebase);
        this.props.onFetch(this.props.currentShow);
        if (this.props.currentTime === 0) {
            this.props.onStartClock(this.props.firebase, true);
        }
    }

    /**
     * Opens the modal with backdrop to display DisplayUser component
     * @public
     * @param user: the user to display in the modal
     */
    openUserModal = (user) => {
        this.setState({showUser: true, user: user})
    };

    /**
     * pushes to a new route
     * @param elementId
     * @param pathName
     * @param parentId
     */
    showDetailsHandler = (elementId, pathName, parentId) => {
        if (elementId) {
            this.props.history.push({
                pathname: pathName,
                state: {
                    elementId: elementId
                }
            })
        } else {
            this.props.history.push({
                pathname: pathName,
                state: {
                    parentId: parentId
                }
            })
        }
    };

    getNextPart = (currentBlockNumber, currentPartNumber) => {
        let nextPart = currentPartNumber;
        let nextBlock = currentBlockNumber;
        const runningBlockId = this.props.blocks[currentBlockNumber].id;
        const runningBlockPartsAmount =
            this.props.parts.filter(aPart => aPart.blockId === runningBlockId).length;
        if (currentPartNumber + 1 < runningBlockPartsAmount) {
            nextPart += 1
        } else {
            nextBlock += 1;
            nextPart = 0;
        }
        if (nextBlock < this.props.blocks.length) {
            const nextBlockId = this.props.blocks[nextBlock].id;
            const partDetails = this.props.parts.filter(aPart => aPart.blockId === nextBlockId)[nextPart];
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

    skipToNextPartHandler = () => {
        const previousShowState = {
            isPaused: true,
            runningPartNumber: this.props.runningPart,
            runningBlockNumber: this.props.runningBlock,
            runningPartDuration: this.props.runningPartDuration,
            runningPartStartTime: this.props.runningPartStartTime,
            pause: this.props.pause + this.props.runningPartDuration
        };
        let live = {
            previousShowState: previousShowState,
            isPaused: false,
            pause: 0,
            runningPartDuration: 0,
            runningPartStartTime: -1, // sets current server Time};
        };
        let nextUpPart = this.getNextPart(this.props.runningBlock, this.props.runningPart);
        if (nextUpPart) {
            live = updateObject(live, nextUpPart);
            console.log(nextUpPart);
            const followingPart = this.getNextPart(nextUpPart.runningBlockNumber, nextUpPart.runningPartNumber);
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
            this.props.onSaveLiveData(this.props.firebase, live)
        } else {
            // set end of show
            this.props.onSaveLiveData(this.props.firebase,
                {
                    showHasFinished: true
                });
        }
    };

    skipToNextPartHandler2 = () => {
        let nextPart = this.props.runningPart;
        let nextBlock = this.props.runningBlock;
        this.getNextPart(nextBlock, nextPart);
        // save the previous state when user clicks on Next, so he can return to it
        const previousState = {
            paused: true,
            runningPartNumber: nextPart,
            runningBlockNumber: nextBlock,
            runningPartDuration: this.props.runningPartDuration,
            runningPartStartTime: this.props.runningPartStartTime,
            pause: this.props.pause + this.props.runningPartDuration
        };
        //this.props.onSavePreviousState(previousState);

        const runningBlockId = this.props.blocks[this.props.runningBlock].id;
        const runningBlockPartsAmount =
            this.props.parts.filter(aPart => aPart.blockId === runningBlockId).length;
        console.log(runningBlockPartsAmount);
        console.log('running Part ' + this.props.runningPart);

        if (this.props.runningPart + 1 < runningBlockPartsAmount) {
            nextPart += 1
        } else {
            nextBlock += 1;
            nextPart = 0;
            console.log('NextPart: ' + nextPart);
            console.log('NextBlock: ' + nextBlock);
        }
        if (nextBlock < this.props.blocks.length) {
            // save nextUp
            this.props.onSaveLiveData(this.props.firebase,
                {
                    isPaused: false,
                    pause: 0,
                    runningBlockNumber: nextBlock,
                    runningPartNumber: nextPart,
                    runningPartDuration: 0,
                    runningPartStartTime: -1, // sets current server Time
                    previousShowState: previousState
                });
            // this.props.onSetNextPart(nextPart, nextBlock)
            // this.props.onSaveLiveData();
        } else {
            // set end of show
            this.props.onSaveLiveData(this.props.firebase,
                {
                    showHasFinished: true
                });
            //this.props.onEndOfShow();
        }
    };

    returnToPreviousHandler = () => {
        const p = this.props.previousShowState;
        this.props.onSaveLiveData(this.props.firebase, p);
        // this.props.onSetNextPart(p.runningPartNumber, p.runningBlockNumber);
        // this.props.onResetRunningPartDuration(p.runningPartDuration);
        // this.props.onSavePreviousState(null)
    };

    togglePauseHandler = () => {
        if (this.props.isPaused) {
            // resume
            this.props.onSaveLiveData(this.props.firebase,
                {
                    isPaused: false,
                    pause: this.props.pause
                });
        } else {
            // pause
            this.props.onSaveLiveData(this.props.firebase,
                {
                    isPaused: true,
                    runningPartDuration: this.props.runningPartDuration
                })
        }
    };

    resetTheShow = () => {
        this.props.onSaveLiveData(this.props.firebase,
            {
                isLive: false,
                isPaused: true,
                pause: 0,
                previousShowState: null,
                runningBlockNumber: 0,
                runningPartNumber: 0,
                runningPartStartTime: -1,
                showHasFinished: false,
                nextPartId: null,
                nextPartTitle: null,
                nextPartCue:null,
                followingPartId: null,
                followingPartTitel: null,
                followingPartCue: null
            });
    };

    startTheShow = () => {
        this.props.onSaveLiveData(this.props.firebase,
            {
                isLive: true,
                isPaused: false,
                pause: 0,
                runningPartStartTime: -1,
                scheduledEndTime: this.props.scheduledEndTime
            });
    };


    render() {
        const {classes} = this.props;
        let page = <Spinner/>

        // let liveControls = (
        //     <Fab variant="extended" aria-label="start"
        //          onClick={this.props.onStartTheShow} className={classes.fab}>
        //         Start The Show!
        //     </Fab>
        // );

        if (this.props.shows.length > 0 && !this.props.showHasFinished && !this.props.loading) {
            const show = this.props.shows.filter((show) => show.id === this.props.currentShow)[0];

            let head = (
                <>
                    <Typography variant='h2' component='h1'>
                        {show.title}
                    </Typography>
                    <div className={classes.dateTime}>
                        <Typography variant='h6'>
                            {msToDate(this.props.showStartDateTime)}
                        </Typography>
                        <Typography variant='h6'>
                            {msToTime(this.props.showStartDateTime)}
                        </Typography>
                        <Fab variant="extended" aria-label="start"
                             onClick={this.startTheShow} className={classes.fab}>
                            Start The Show!
                        </Fab>

                    </div>
                </>
            );

            if (this.props.isLive) {
                let playPause = (this.props.isPaused) ?
                    <PlayArrowIcon fontSize='large' color='secondary'/> : <PauseIcon fontSize='large'/>

                let previous = null;
                if (this.props.previousShowState) {
                    previous = (
                        <Fab className={classes.actionButton}
                             color='primary' aria-label='back'
                             onClick={this.returnToPreviousHandler}>
                            <SkipPreviousIcon fontSize={'large'}/>
                        </Fab>)
                }

                head = (
                    <div className={classes.liveView}>
                        {previous}
                        <Typography variant='h2'>
                            {msToTime(this.props.currentTime, true)}
                        </Typography>
                        <Fab className={classes.actionButton}
                             color='primary' aria-label='play'
                             onClick={this.togglePauseHandler}>
                            {playPause}
                        </Fab>
                        <Fab className={classes.actionButton}
                             color='primary' aria-label='play'
                             onClick={this.skipToNextPartHandler}>
                            <SkipNextIcon fontSize='large'/>
                        </Fab>
                    </div>
                )
            }

            page =
                <div>
                    <div className={classes.paper}>
                        <button onClick={this.resetTheShow}>
                            Reset the show
                        </button>
                        {head}</div>
                    <BlocksList
                        parentId={this.props.currentShow}
                        clicked={this.showDetailsHandler}
                        userClicked={this.openUserModal}
                    />
                </div>
        }

        if (this.props.showHasFinished) {
            page =
                <>
                    <h2>Show has ended</h2>
                    <button onClick={this.resetTheShow}>
                        Reset the show
                    </button>
                </>
        }
        return page
    }
}

const mapStateToProps = (state) => {
    return {
        currentShow: state.show.currentShow,
        showName: state.show.showName,
        showStartDateTime: state.show.showStartDateTime,
        currentTime: state.global.currentTime,
        shows: state.show.shows,
        blocks: state.show.blocks,
        parts: state.show.parts,
        scenes: state.show.scenes,
        loading: state.show.loading,
        isLive: state.live.isLive,
        isPaused: state.live.isPaused,
        runningPart: state.live.runningPartNumber,
        runningPartDuration: state.live.runningPartDuration,
        runningBlock: state.live.runningBlockNumber,
        showHasFinished: state.live.showHasFinished,
        previousShowState: state.live.previousShowState,
        pause: state.live.pause,
        runningPartStartTime: state.live.runningPartStartTime,
        scheduledEndTime: state.live.scheduledEndTime
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
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Schedule)