import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {sceneCategories, convertObjectstoArray} from '../../shared/utility'


import Time from "../Time/Time";
import SimpleCrewList from "../SimpleCrewList/SimpleCrewList";
import OptionsMenu from "../ui/OptionsMenu/OptionsMenu";
import {connect} from "react-redux";

const styles = theme => ({
    scene: {
        display: 'flex',
        fleDirection: 'row',
        justifyContent: 'flex-start',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: '1px 5px 1px 5px',
        margin: '1px 5px 1px 5px',
        alignItems: 'center'

    },
    title: {
        cursor: 'pointer'
    }
});

/**
 * Created by Doa on 23-10-2019.
 */
const scene = withStyles(styles)(({
                                      classes, startTime, currentTime, displayRealTime,
                                      runningPartDuration, sceneData, children, detailClicked, isRunning
                                  }) => {

    let realStartTime = startTime + sceneData.startTime;
    let showTime = (displayRealTime) ? currentTime : runningPartDuration;
    let style = {};
    let time = <Time startTime={realStartTime} duration={sceneData.duration}/>


    if (isRunning) {

        if (realStartTime < showTime) {
            if (showTime < realStartTime + sceneData.duration) {
                time = (<Time startTime={realStartTime}
                              duration={sceneData.duration + sceneData.startTime - runningPartDuration}
                              live/>);
                style = {backgroundColor: 'yellow'} // scene is running now
            } else style = {display: 'none'} // scene is finished
        } else {
        }// scene will run later
    }

    return (
        <div className={classes.scene}
             style={style}>
            {children}
            {time}
            <div>{sceneCategories[sceneData.category].icon}</div>
            <div className={classes.title}
                 onClick={() => detailClicked(sceneData.id, 'scene/details')}>{sceneData.title}</div>
            <SimpleCrewList team={sceneData.team}/>
            <OptionsMenu
                elementType='scenes'
                element={sceneData}
                parent={sceneData.partId}/>
        </div>
    )
});

const mapStateToProps = (state) => {
    return {
        currentTime: state.show.currentTime,
        runningPartDuration: state.live.runningPartDuration,
        displayRealTime: state.show.displayRealTime
    };
};

export default connect(mapStateToProps)(scene);