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
        for (let i = 1; i < 4; i++) {
            let part = {
                showId: this.props.currentShow,
                BlockId: '-Lrst8nwNMu-7ZRjiDVp',
                order: i,
                title: `Block 3: this is part ${i}`,
                starttime: 0,
                duration: 60000
            };
            this.props.onSave('parts', part);
        }
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
            let playPause =  (this.props.isPaused)?
                <PlayArrowIcon fontSize='large'/> : <PauseIcon fontSize='large'/>

            liveControls = (
                <>
                    <Fab color='primary' aria-label='play'
                    onClick={this.props.onTogglePause}>
                        {playPause}
                    </Fab>
                    <Fab color='primary' aria-label='play'
                    onClick={this.props.onSetNextPart}>
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
                <div></div>
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
        isPaused: state.live.isPaused
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onFetch: (showId) => dispatch(actions.fetch(showId)),
        onStartClock: () => dispatch(actions.startClock()),
        onStartTheShow: () => dispatch(actions.startTheShow()),
        onTogglePause: () => dispatch(actions.toggleIsPaused()),
        onSetNextPart: () => dispatch(actions.setNextPart())
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(Schedule)