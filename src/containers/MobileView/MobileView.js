import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import {compose} from "redux";
import {convertObjectstoArray, msToTime} from "../../shared/utility";
import Avatar from "@material-ui/core/Avatar";
import Spinner from "../../components/ui/Spinner/Spinner";
import InlinePartDetails from "./InlineDetails/InlinePartDetails";
import {AuthUserContext} from "../../hoc/Session";

const styles = () => ({
    root: {
        width: '100vw',
    },

    scene: {
        display: 'flex',
        boxSizing: 'border-box',
        fleDirection: 'row',
        justifyContent: 'flex-start',
        AlignItems: 'baseline',
        flexWrap: 'wrap',
        width: 'fit-content',
        marginLeft: 'auto',
        padding: '0 5px 0 5px',
    },
    end: {
        color: 'white',
        background: 'blue',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: 5
    },
});

/**
 * Created by Doa on 28-11-2019.
 */
class mobileView extends Component {

    state = {
        currentUser: 'id12',
        showOnlyMe: true
    };

    render() {
        const {
            classes, blocks, parts, scenes, loading, showStartDateTime, isLive, isPaused,
            runningPartNumber, runningBlockNumber, runningTime = 0, currentTime
        } = this.props;

        let startTimeCounter = (showStartDateTime > currentTime ) ? currentTime : showStartDateTime;
        if (isLive) startTimeCounter -= runningTime
        let page = <Spinner/>
        // filter out parts that have already finished
        let blocksArray = blocks.slice(runningBlockNumber);

        const calculateDuration = (parts, parentIndex) => {
            let duration = 0;
            let i = 0;
            if (parentIndex === runningBlockNumber) {
                duration = -runningTime;
                i = runningPartNumber;
            }

            for (i; i < parts.length; i++)
                duration += parts[i].duration;
            return duration;
        };

        if (!loading) {
            page = (
                <AuthUserContext.Consumer>
                    {authUser => (
                        <div className={classes.root}>
                            {blocksArray.map((block, blockIndex) => {
                                const textColor = (block.textColorBlack) ? '#000' : '#fff';
                                const duration = calculateDuration(parts.filter(
                                    (aPart) => aPart.blockId === block.id), blockIndex);
                                let partsArray = parts.filter((part) => part.blockId === block.id);
                                // filter out parts that have already finished for this block
                                if (blockIndex === runningBlockNumber) partsArray = partsArray.slice(runningPartNumber);
                                return (
                                    <div key={blockIndex} className={classes.root}>
                                        <InlinePartDetails
                                            blockDuration={duration}
                                            isRunning={isLive && blockIndex == runningBlockNumber}
                                            authUser={authUser}
                                            data={block}
                                            startTime={startTimeCounter}
                                            runningTime={runningTime}/>
                                        {partsArray.map((part, partIndex) => {
                                            let scenesArray = scenes.filter((scene) => scene.partId === part.id);
                                            return (
                                                <div key={partIndex}>
                                                    <InlinePartDetails
                                                        isRunning={isLive && partIndex == 0 && blockIndex == runningBlockNumber}
                                                        authUser={authUser}
                                                        data={part}
                                                        startTime={-part.duration + (startTimeCounter += part.duration)}
                                                        runningTime={runningTime}/>
                                                    {scenesArray.map((scene, index) => {
                                                        const team = convertObjectstoArray(scene.team);
                                                        // filter out scenes that are not for this authUser
                                                        // TODO replace check with real authUser.uid:  team.filter((actor) => actor.id === authUser.uid).length > 0
                                                        const mustShow = team.filter((actor) => actor.firstName == authUser.firstName).length > 0;
                                                        let sceneRunningTime = runningTime - scene.startTime;
                                                        if (sceneRunningTime < 0) sceneRunningTime = 0;
                                                        // remove from DOM when scene is passed
                                                        const style = (mustShow && sceneRunningTime < scene.duration) ?  {}: {display: 'none'};
                                                        return (
                                                            <div key={index} className={classes.scene}
                                                                 style={style}>
                                                                <InlinePartDetails
                                                                    isRunning={isLive && partIndex == runningPartNumber && !!sceneRunningTime}
                                                                    authUser={authUser}
                                                                    data={scene}
                                                                    startTime={startTimeCounter +scene.startTime}
                                                                    runningTime={sceneRunningTime}
                                                                    category={scene.category}
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )})}
                                    </div>
                                )})
                            }
                            <div className={classes.end}>
                                {'End of Show:  ' + msToTime(startTimeCounter)}
                            </div>
                        </div>
                    )}
                </AuthUserContext.Consumer>
            )
        }
        return page
    }
}

const mapStateToProps = (state) => {
    return {
        currentTime: state.global.currentTime,
        shows: state.show.shows,
        blocks: state.show.blocks,
        parts: state.show.parts,
        scenes: state.show.scenes,
        loading: state.show.loading,
        showStartDateTime: state.show.showStartDateTime,
        runningPartNumber: state.live.runningPartNumber,
        runningBlockNumber: state.live.runningBlockNumber,
        isLive: state.live.isLive,
        isPaused: state.live.isPaused,
        runningTime: state.live.runningPartDuration,
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps))(mobileView);