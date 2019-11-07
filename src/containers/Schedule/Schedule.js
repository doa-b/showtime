import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom'

import classes from './Schedule.module.css'
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import BlocksList from "../Blocks/BlocksList";
import {msToDate, msToTime} from "../../shared/utility";

import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';

/**
 * Created by Doa on 23-10-2019.
 */
class Schedule extends Component {

    // TODO maybe we need to add an updated flag to show reducer to let schedule auto re-render.
    //  Or else we use the loading flag

    componentDidMount() {
        this.props.onFetch('-Lrst6TmmyYrkouGmiac');
        this.props.onStartClock();
    }

    showDetailsHandler = (elementId, pathName, orderNumber, parentId) => {
        if (elementId) {
            this.props.history.push({
                pathname: pathName,
                state: {
                    id: elementId
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
        console.log(this.props)
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
        } else this.props.onEndofShow();
    };


// todo Remove duration from block in database. It is calculated on the fly

    render() {
        let total = <p>Loading...</p>;

        let liveControls = (
                <Fab variant="extended" aria-label="start"
                     onClick={this.props.onStartTheShow}className={classes.fab}>
                    Start The Show!
                </Fab>
           );
        if (this.props.isLive) {

            //set play/pause icon to play or pause
            let playPause = (this.props.isPaused)?
                <PlayArrowIcon fontSize='large'/> : <PauseIcon fontSize='large'/>

            liveControls = (
                <>
                    <Fab color='primary' aria-label='play'
                    onClick={this.props.onTogglePause}>
                        {playPause}
                    </Fab>
                    <Fab color='primary' aria-label='play'
                    onClick={this.skipToNextPartHandler}>
                        <SkipNextIcon fontSize='large'/>
                    </Fab>
                </>
            )
        }

        if (this.props.blocks.length > 0 && this.props.parts && this.props.scenes) {
            total =
                <div>
                    <BlocksList
                        parentId={this.props.currentShow}
                        clicked={this.showDetailsHandler}
                    />
                </div>
        }

        return (
            <>
                <h1>{this.props.showName}</h1>
                <button onClick={this.saveDummyPartsHandler}>
                    Add Some Parts
                </button>
                <h3>{msToDate(this.props.showStartDateTime)}</h3>
                <p>Scheduled Show Start Time {msToTime(this.props.showStartDateTime)}</p>
                <p>Current Time {msToTime(this.props.currentTime)}</p>
                {liveControls}
                {total}
            </>
        )
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
        runningBlock: state.live.runningBlockNumber
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onFetch: (showId) => dispatch(actions.fetch(showId)),
        onStartClock: () => dispatch(actions.startClock()),
        onStartTheShow: () => dispatch(actions.startTheShow()),
        onTogglePause: () => dispatch(actions.toggleIsPaused()),
        onSetNextPart: (nextPart, nextBlock) => dispatch(actions.setNextPart(nextPart, nextBlock))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(Schedule)