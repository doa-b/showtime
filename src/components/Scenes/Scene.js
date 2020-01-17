import React from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { sceneCategories } from '../../shared/utility'


import Time from "../Time/Time";
import SimpleCrewList from "../SimpleCrewList/SimpleCrewList";
import OptionsMenu from "../ui/OptionsMenu/OptionsMenu";
import {connect} from "react-redux";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import {Tooltip} from "@material-ui/core";
import Attachement from "../ui/Attachements/Attachement";

const styles = () => ({
    scene: {
        display: 'flex',
        fleDirection: 'row',
        justifyContent: 'flex-start',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: '1px 5px 0px 5px',
        margin: '1px 5px 0px 5px',
        alignItems: 'center'

    },
    title: {
        paddingTop: 3,
        cursor: 'pointer',
        alignItems: 'center'
    },
    icon: {
        verticalAlign: 'middle'
    }
});

/** React functional component that displays all the sceneDetails
 * <br />Created by Doa on 23-10-2019.
 */
const scene = withStyles(styles)(({
                                      classes, startTime, currentTime, displayRealTime,
                                      runningPartDuration, sceneData, children, detailClicked, isRunning
                                  }) => {

    let realStartTime = startTime + sceneData.startTime;
    let showTime = (displayRealTime) ? currentTime : runningPartDuration;
    let style = {};
    let time = <Time startTime={realStartTime} duration={sceneData.duration}/>;


    if (isRunning) {

        if (realStartTime < showTime) {
            if (showTime < realStartTime + sceneData.duration) {
                time = (<Time startTime={realStartTime}
                              duration={sceneData.duration + sceneData.startTime - runningPartDuration}
                              isLive/>);
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
            <div className={classes.title}
                 onClick={() => detailClicked(sceneData.id, 'scene/details')}>
                <span className={classes.icon}>{sceneCategories[sceneData.category].icon}</span>
                {sceneData.title}
            </div>
           <Attachement elementData={sceneData}/>
            <SimpleCrewList team={sceneData.team}/>
            <OptionsMenu
                elementType='scenes'
                element={sceneData}
                parent={sceneData.partId}/>
        </div>
    )
});

const {func, object, bool, number} = PropTypes;

scene.propTypes = {
    /** startTime of this scene*/
    startTime: number,
    /** current Time in milliseconds */
    currentTime: number,
    /** true if component needs to show time relative to show start*/
    displayRealTime: bool,
    /** time in ms that this scenes parent Part is running*/
    runningPartDuration: number,
    /** details of this scene*/
    sceneData: object,
    /** function that is called when scene is clicked. Opens a new 'page' to scene Details*/
    detailClicked: func,
    /** true if current show is live */
    isRunning: bool
};

const mapStateToProps = (state) => {
    return {
        currentTime: state.global.currentTime,
        runningPartDuration: state.live.runningPartDuration,
        displayRealTime: state.global.displayRealTime
    };
};
/* @component */
export default connect(mapStateToProps)(scene);