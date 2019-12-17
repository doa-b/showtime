import React, {Component} from 'react';
import {Textfit} from 'react-textfit';

import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Time from "../../components/Time/Time";
import {msToTime} from "../../shared/utility";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    FullWidthText: {
        width: '100%',
        fontSize: '25.5vw',
        padding: 0,
        marginTop: '-8vw',
        marginBottom: '-4vw'
    },

    CurrentPart: {
        background: '#09d3ac',
        padding: '.5% 0'
    },

    Wrapper: {
        textAlign: 'center'
    },

    NextPart: {
        background: '#cccccc',
        padding: '.5% 0'
    },
    Next: {
        padding: 0,
        marginTop: 0,
        marginBottom: 0
    },
    Cue: {
        border: '1px solid'
    }
});

/**
 * Created by Doa on 14-11-2019.
 */
class Monitor extends Component {

    componentDidMount() {
        this.props.onSetPageTitle('Monitor')
    }

    render() {
        const {classes} = this.props;
        let nextPart = null;
        let head = null;
        let next = null;
        let cue = null;
        let time = '';


        if (this.props.isLive) {
            const currentBlockId = this.props.blocks[this.props.runningBlock].id
            const currentParts = this.props.parts.filter(aPart => aPart.blockId === currentBlockId);
            const currentPart = currentParts[this.props.runningPart];
            const timeLeft = currentPart.duration - this.props.runningPartDuration;
            time = (timeLeft >= 0) ? msToTime(timeLeft, true) : 'TIME IS UP';
            head = (
                <Textfit className={classes.CurrentPart} mode='single'>
                    {currentPart.title}
                </Textfit>);
            if (this.props.runningPart + 1 < currentParts.length) {
                const nextPart = currentParts[this.props.runningPart + 1];
                if (nextPart.cue)
                    cue = (
                        <Textfit className={classes.Cue} mode='single'>
                            {nextPart.cue}
                        </Textfit>
                    );
                next = (
                    <Textfit className={classes.NextPart} mode='single'>
                        {nextPart.title}
                    </Textfit>
                )
            }

        }

        return (
            <div className={classes.Wrapper}>
                {head}
                <div className={classes.FullWidthText}>
                    {time}
                </div>
                <Typography className={classes.Next} variant="h4" component="h2" gutterBottom>
                    Cue for next
                </Typography>
                {/*flash red when time has passed*/}
                {cue}
                {next}
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        currentShow: state.show.currentShow,
        showName: state.show.showName,
        showStartDateTime: state.show.showStartDateTime,
        currentTime: state.global.currentTime,
        blocks: state.show.blocks,
        parts: state.show.parts,
        scenes: state.show.scenes,
        loading: state.show.loading,
        isLive: state.live.isLive,
        isPaused: state.live.isPaused,
        runningPart: state.live.runningPartNumber,
        runningBlock: state.live.runningBlockNumber,
        showHasFinished: state.live.showHasFinished,
        runningPartDuration: state.live.runningPartDuration,
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
        onSetPageTitle: (title) => dispatch(actions.setPageTitle(title))
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Monitor)

