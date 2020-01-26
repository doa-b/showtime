import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Responsive} from 'responsive-react'

import ScenesList from "../Scenes/ScenesList";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Time from "../../components/Time/Time";

import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import DisplayCrew from "../../components/DisplayCrew/DisplayCrew";
import OptionsMenu from "../../components/ui/OptionsMenu/OptionsMenu";
import {Tooltip} from "@material-ui/core";
import {withFirebase} from "../../firebase";
import Attachement from "../../components/ui/Attachements/Attachement";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    partWrapper: {

        background: '#eee',
        border: '1px solid #ccc',
        boxShadow: '3px 3px 3px #ccc',
        padding: 1,
    },
    part: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
    spacer: {
        marginLeft: '1%'
    },
    divider: {
        borderLeft: '1px solid darkgray',
        height: 'auto'
    },
    below: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    belowMobile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        cursor: 'pointer',
        marginLeft: 'auto'
    },
    title: {
        cursor: 'pointer',
        fontWeight: 'bold'
    }
});

/**
 * Created by Doa on 23-10-2019.
 */
class Part extends Component {

    state = {
        showChildren: this.props.showAllScenes
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.showAllScenes !== this.props.showAllScenes) {
            this.setState({showChildren: this.props.showAllScenes})
        }
    }

    toggleVisibilityHandler = () => {
        console.log('çlicked');
        this.setState((prevState) => {
            return {showChildren: !prevState.showChildren};
        });
    };

    showDetailsHandler = () => {
        this.props.history.push({
            pathname: 'block/details',
            state: {
                id: this.props.partData.id
            }
        })
    };

    render() {
        const {classes, startTime, partData, runningTime, isPaused, firebase, clicked, children} = this.props
        let beginTime = startTime - partData.duration;
        let partDuration = partData.duration;
        let progressBar = null;
        if (runningTime) {
            partDuration -= runningTime;
            if (partDuration <= 0 && !isPaused) {
                firebase.live().update(
                    {isPaused: true, runningPartDuration: runningTime})
            }
            progressBar = (
                <ProgressBar
                    full={partData.duration}
                    timeLeft={partDuration}
                    height='6px'/>)
        }

        const arrow = (this.state.showChildren) ? (
            <Tooltip title='hide details' placement='left-end'>
                <KeyboardArrowDownIcon onClick={this.toggleVisibilityHandler}/>
            </Tooltip>
        ) : (
            <Tooltip title='unfold details' placement='left-end'>
                <KeyboardArrowLeftIcon onClick={this.toggleVisibilityHandler}/>
            </Tooltip>
        );

        return (
            <>
                <Responsive displayIn={['Laptop', 'Tablet']}>
                    <div className={classes.partWrapper}>
                        <div className={classes.part}>
                            {children}
                            <Time startTime={beginTime}
                                  duration={partDuration}
                                  isLive={!!runningTime}/>
                            <div className={classes.title}
                                 onClick={() => clicked(partData.id, 'part/details')}>{partData.title}
                                <Attachement elementData={partData}/>
                            </div>
                            <div className={classes.divider}></div>
                            <DisplayCrew
                                team={partData.team}
                                deadLine={beginTime - 58000}/>
                            <div className={classes.controls}>
                                <OptionsMenu
                                    elementType='parts'
                                    element={partData}
                                    parent={partData.blockId}/>
                                {arrow}
                            </div>
                        </div>
                    </div>
                    {progressBar}
                    {(this.state.showChildren) ? (
                        <div className={classes.below}>
                            <span className={classes.spacer}></span>
                            <Tooltip title='Add Scene'>
                                <IconButton size="small" color="primary" className={classes.button} aria-label="add"
                                            onClick={() => clicked(null, 'scene/details', partData.id)}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                            <ScenesList
                                isRunning={!!runningTime}
                                parentId={partData.id}
                                startTime={beginTime}
                                clicked={clicked}/>
                        </div>
                    ) : null}
                </Responsive>

                <Responsive displayIn={['Mobile']}>
                    <div className={classes.partWrapper}>
                        <div className={classes.part}>
                            {children}
                            <Time startTime={beginTime}
                                  duration={partDuration}
                                  isLive={!!runningTime}/>
                            <Attachement elementData={partData}/>
                            <div className={classes.controls}>
                                <OptionsMenu
                                    elementType='parts'
                                    element={partData}
                                    parent={partData.blockId}/>
                                {arrow}
                            </div>
                        </div>
                        <div className={classes.title}
                             onClick={() => clicked(partData.id, 'part/details')}>{partData.title}
                            <div className={classes.divider}></div>
                        </div>
                        <DisplayCrew
                            team={partData.team}
                            deadLine={beginTime - 58000}/>
                    </div>
                    {progressBar}
                    {(this.state.showChildren) ? (
                        <div className={classes.belowMobile}>
                            <ScenesList
                                isRunning={!!runningTime}
                                parentId={partData.id}
                                startTime={beginTime}
                                clicked={clicked}/>
                            <Tooltip title='Add Scene'>
                                <IconButton size="small" color="primary" className={classes.button} aria-label="add"
                                            onClick={() => clicked(null, 'scene/details', partData.id)}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : null}

                </Responsive>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isPaused: state.live.isPaused,
        showAllScenes: state.global.showAllScenes
    }
};

export default compose(
    withStyles(styles),
    withFirebase,
    connect(mapStateToProps)
)(Part);