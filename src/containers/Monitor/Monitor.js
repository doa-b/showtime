import React, {Component} from 'react';

import classes from './Monitor.module.css'
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Time from "../../components/Time/Time";

/**
 * Created by Doa on 14-11-2019.
 */
class Monitor extends Component {

    render() {

        return (
            <div>
               <h1>
                   Time Left:
               </h1>
                <p>Block</p>
                <p>Part</p>
                <p>Scenes</p>
            </div>);

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

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)

