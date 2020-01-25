import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

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
import {getCurrentUTCinMs, msToTime} from "../../shared/utility";
import * as actions from "../../store/actions";

const styles = theme => ({
    partWrapper: {
        width: 'calc(100% - 8px)',
        display: 'flex',
        flexDirection: 'column',
        background: '#eee',
        border: '1px solid #ccc',
        boxShadow: '3px 3px 3px #ccc',
        padding: 1,
        '@media (min-width:600px)': {
            flexDirection: 'row'
        }
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    spacer: {
        '@media (min-width:600px)': {
            marginLeft: '1%'
        }
    },
    divider: {
        borderLeft: '1px solid darkgray',
        height: 'auto'
    },
    below: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        '@media (min-width:600px)': {
            flexDirection: 'row'
        }
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
    title: {
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    add: {
        order: 3,
        display: 'block',
        marginLeft: '48%',
        '@media (min-width:600px)': {
            marginLeft: 0,
            order: 1
        }
    },
    scene: {
        order: 2,
        width: '100%'
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
        // check if actors need to be notified. Fires when this part is set to begin within 60 seconds.
        // TODO Only fire this if you are the director!!! Director is the one that started the show. Sets his ID in live!!!
        const deadline =  msToTime(this.props.startTime - this.props.partData.duration - 60000, true)
        if (msToTime(this.props.currentTime, true) === deadline
           ) {
            const message = {
                timeMs: this.props.currentTime + 1000,
                message: 'Get to stage ' + this.props.partData.title,
                elementId: this.props.partData.id,
                team: this.props.partData.team
            };
            this.props.onSetQueuedMessage(message);
            console.log('dispatching message')
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
        const {classes, startTime, partData, runningTime, isPaused, firebase, clicked, children} = this.props;
        const beginTime = startTime - partData.duration;
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
                <div className={classes.partWrapper}>
                    <div className={classes.head}>
                        {children}
                        <Time startTime={beginTime}
                              duration={partDuration}
                              isLive={!!runningTime}/>
                        <Attachement elementData={partData}/>
                        <div className={classes.controlsMobile}>
                            <OptionsMenu
                                elementType='parts'
                                element={partData}
                                parent={partData.blockId}/>
                            {arrow}
                        </div>
                    </div>
                    <div className={classes.body}>
                        <div className={classes.title}
                             onClick={() => clicked(partData.id, 'part/details')}>
                            {partData.title}
                        </div>
                        <div className={classes.divider}></div>
                        <DisplayCrew
                            team={partData.team} />

                    </div>
                    <div className={classes.controls}>
                        <OptionsMenu
                            elementType='parts'
                            element={partData}
                            parent={partData.blockId}/>
                        {arrow}
                    </div>
                    {progressBar}
                </div>

                {(this.state.showChildren) ? (
                    <div className={classes.below}>
                        <span className={classes.spacer}></span>
                        <div className={classes.add}>
                            <Tooltip title='Add Scene'>
                                <IconButton size="small" color="primary" className={classes.button} aria-label="add"
                                            onClick={() => clicked(null, 'scene/details', partData.id)}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className={classes.scene}>
                            <ScenesList
                                isRunning={runningTime}
                                parentId={partData.id}
                                startTime={beginTime}
                                clicked={clicked}/>
                        </div>
                    </div>
                ) : null}
            </>
        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            isPaused: state.live.isPaused,
            showAllScenes: state.global.showAllScenes,
            currentTime: state.global.currentTime
        }
    };

const mapDispatchToProps = (dispatch) => {
    return {
        onSetQueuedMessage: (message) => dispatch(actions.setQueuedMessage(message))
    }
};

export default compose(
    withStyles(styles),
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps))(Part);
