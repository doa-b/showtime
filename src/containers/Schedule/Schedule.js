import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom'

import * as actions from "../../store/actions";
import {connect} from "react-redux";
import BlocksList from "../Blocks/BlocksList/BlocksList";
import Spinner from '../../components/ui/Spinner/Spinner'
import {msToDate, msToTime} from "../../shared/utility";
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
        this.props.onFetchLiveData();
        this.props.onSetPageTitle('Schedule');
        this.props.onFetch(this.props.currentShow);
        if (this.props.currentTime === 0) {
            this.props.onStartClock();
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

    showDetailsHandler = (elementId, pathName, parentId) => {
        this.props.onSetPageTitle(pathName.split('/')[0] + ' details');
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

    skipToNextPartHandler = () => {
        let nextPart = this.props.runningPart;
        let nextBlock = this.props.runningBlock;
        // save the previous state when user clicks on Next, so he can return to it
        const previousState = {
            runningPartNumber: nextPart,
            runningBlockNumber: nextBlock,
            runningPartDuration: this.props.runningPartDuration
        };
        this.props.onSavePreviousState(previousState);
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
            this.props.onSetNextPart(nextPart, nextBlock)
            this.props.onSaveLiveData();
        } else this.props.onEndOfShow();
    };

    returnToPreviousHandler = () => {
        const p = this.props.previousState;
        this.props.onSetNextPart(p.runningPartNumber, p.runningBlockNumber);
        this.props.onResetRunningPartDuration(p.runningPartDuration)
        this.props.onSavePreviousState(null)
    };

    render() {
        const {classes} = this.props;
        let page = <Spinner/>

        let liveControls = (
            <Fab variant="extended" aria-label="start"
                 onClick={this.props.onStartTheShow} className={classes.fab}>
                Start The Show!
            </Fab>
        );

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
                             onClick={this.props.onStartTheShow} className={classes.fab}>
                            Start The Show!
                        </Fab>

                    </div>
                </>
            );

            if (this.props.isLive) {
                let playPause = (this.props.isPaused) ?
                    <PlayArrowIcon fontSize='large' color='secondary'/> : <PauseIcon fontSize='large'/>

                let previous = null;
                if (this.props.previousState) {
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
                             onClick={this.props.onTogglePause}>
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
                        {head}</div>
                    <BlocksList
                        parentId={this.props.currentShow}
                        clicked={this.showDetailsHandler}
                        userClicked={this.openUserModal}
                    />
                </div>
        }

        if (this.props.showHasFinished) {
            page = <h2>Show has ended</h2>
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
        previousState: state.live.previousState
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onFetch: (showId) => dispatch(actions.fetch(showId)),
        onStartClock: () => dispatch(actions.startClock()),
        onStartTheShow: () => dispatch(actions.startTheShow()),
        onTogglePause: () => dispatch(actions.toggleIsPaused()),
        onSetNextPart: (nextPart, nextBlock) => dispatch(actions.setNextPart(nextPart, nextBlock)),
        onEndOfShow: () => dispatch(actions.showHasEnded()),
        onSetPageTitle: (title) => dispatch(actions.setPageTitle(title)),
        onSavePreviousState: (previousState) => dispatch(actions.savePreviousState(previousState)),
        onResetRunningPartDuration: (value) => dispatch(actions.resetRunningPartDuration(value)),
        onFetchLiveData: () => dispatch(actions.fetchLiveData()),
        onSaveLiveData: () => dispatch(actions.saveLiveData())
    }
};

/* @component */
export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Schedule)