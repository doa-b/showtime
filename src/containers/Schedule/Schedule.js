import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom'

import * as actions from "../../store/actions";
import {connect} from "react-redux";
import BlocksList from "../Blocks/BlocksList/BlocksList";
import {msToDate, msToTime} from "../../shared/utility";
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";

import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';

/**
 * Created by Doa on 23-10-2019.

 */
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

class Schedule extends Component {

    // TODO maybe we need to add an updated flag to show reducer to let schedule auto re-render.
    //  Or else we use the loading flag
    state = {
        showUser: false,
        userId: ''
    };

    componentDidMount() {
        this.props.onFetch('-Lrst6TmmyYrkouGmiac');
        if (this.props.currentTime === 0) {
            this.props.onStartClock();
        }
    }

    openUserModal = (user) => {
        this.setState({showUser: true, user: user})
    };

    closeUserModal = () => {
        this.setState({showUser: false})
    };

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

    saveDummyPartsHandler = () => {
        for (let i = 1; i < 2; i++) {
            let part = {
                showId: this.props.currentShow,
                BlockId: '-Lrst8o1hZiIjJSePXFu',
                order: i,
                title: `Block 0: this is part ${i}`,
                starttime: 0,
                duration: 60000
            };
            this.props.onSave('parts', part);
        }
    };

    skipToNextPartHandler = () => {
        console.log(this.props);
        let nextPart = this.props.runningPart;
        let nextBlock = this.props.runningBlock;
        const runningBlockId = this.props.blocks[this.props.runningBlock].id;
        const runningBlockPartsAmount =
            this.props.parts.filter(aPart => aPart.BlockId === runningBlockId).length;
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
        } else this.props.onEndOfShow();
    };

// todo Remove duration from block in database. It is calculated on the fly

    render() {
        const {classes} = this.props;
        let body = <h2>Show has ended</h2>
        let total = <p>Loading...</p>;

        let liveControls = (
            <Fab variant="extended" aria-label="start"
                 onClick={this.props.onStartTheShow} className={classes.fab}>
                Start The Show!
            </Fab>
        );

        let head = (
            <>
                <Typography variant='h2' component='h1'>
                    Trinity Fall Trend Show Switserland
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
                <PlayArrowIcon fontSize='large'/> : <PauseIcon fontSize='large'/>

            head = (
                <div className={classes.liveView}>
                    <Typography variant='h2'>
                        {msToTime(this.props.currentTime)}
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

        if (this.props.blocks.length > 0 && this.props.parts && this.props.scenes) {
            total =
                <div>
                    <BlocksList
                        parentId={this.props.currentShow}
                        clicked={this.showDetailsHandler}
                        userClicked={this.openUserModal}
                    />
                </div>
        }

        if (!this.props.showHasFinished) {
            body = (
                <>
                    <div className={classes.paper}>{head}</div>
                    {total}
                </>
            )
        }
        return body
    }
}

const mapStateToProps = (state) => {
    return {
        currentShow: state.show.currentShow,
        showName: state.show.showName,
        showStartDateTime: state.show.showStartDateTime,
        runningPartDuration: state.show.runningPartDuration,
        currentTime: state.show.currentTime,
        blocks: state.show.blocks,
        parts: state.show.parts,
        scenes: state.show.scenes,
        loading: state.show.loading,
        isLive: state.live.isLive,
        isPaused: state.live.isPaused,
        runningPart: state.live.runningPartNumber,
        runningBlock: state.live.runningBlockNumber,
        showHasFinished: state.live.showHasFinished
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
        onEndOfShow: () => dispatch(actions.showHasEnded())
    }
};

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Schedule)