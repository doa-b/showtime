import React from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sceneCategories} from '../../shared/utility'

import Time from "../Time/Time";
import SimpleCrewList from "../SimpleCrewList/SimpleCrewList";
import OptionsMenu from "../ui/OptionsMenu/OptionsMenu";
import {connect} from "react-redux";

import Attachement from "../ui/Attachements/Attachement";

const styles = () => ({
    sceneWrapper: {
        width: 'calc(100% - 8px)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
       // boxShadow: '3px 3px 3px #ccc',
        '@media (min-width:600px)': {
            flexDirection: 'row',
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 4
        }
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    body: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    title: {
        paddingTop: 3,
        cursor: 'pointer',
        alignItems: 'center'
    },
    icon: {
        verticalAlign: 'middle'
    },
    controls: {
        display: 'none',
        cursor: 'pointer',
        marginLeft: 'auto',
        '@media (min-width:600px)': {
            display: 'inline'
        },
    },
    controlsMobile: {
        display: 'inline',
        cursor: 'pointer',
        marginLeft: 'auto',
        '@media (min-width:600px)': {
            backgroundColor: 'yellow',
            display: 'none'
        }
    },
    add: {
        display: 'block',
        marginLeft: '50%',
        '@media (min-width:600px)': {
           marginLeft: 'auto'
        }
    },

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
        <>
            <div className={classes.sceneWrapper} style={style}>
                    <div className={classes.head}>
                        {children}
                        {time}
                        <Attachement elementData={sceneData}/>
                        <div className={classes.controlsMobile}>
                            <OptionsMenu
                                elementType='scenes'
                                element={sceneData}
                                parent={sceneData.partId}/>
                        </div>
                    </div>
                    <div className={classes.body}>
                        <div className={classes.title}
                             onClick={() => detailClicked(sceneData.id, 'scene/details')}>
                            <span className={classes.icon}>{sceneCategories[sceneData.category].icon}</span>
                            {sceneData.title}
                        </div>
                        <SimpleCrewList team={sceneData.team}/>
                        <div className={classes.controls}>
                            <OptionsMenu
                                elementType='scenes'
                                element={sceneData}
                                parent={sceneData.partId}/>
                        </div>
                    </div>
            </div>
        </>

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