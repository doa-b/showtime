import React, {Component} from 'react';

import classes from './Part.module.css'
import { compose } from "redux";
import {connect} from "react-redux";

import ScenesList from "../Scenes/ScenesList";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Time from "../../components/Time/Time";
import * as actions from "../../store/actions";

import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import DisplayCrew from "../../components/DisplayCrew/DisplayCrew";
import OptionsMenu from "../../components/ui/OptionsMenu/OptionsMenu";
import {Tooltip} from "@material-ui/core";
import {withFirebase} from "../../firebase";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import {AuthUserContext} from "../../hoc/Session";
import Attachement from "../../components/ui/Attachements/Attachement";



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
        let startTime = this.props.startTime - this.props.partData.duration;
        let duration = this.props.partData.duration;
        let progressBar = null;
        if (this.props.runningTime) {
            duration -= this.props.runningTime;
            if (duration <= 0 && !this.props.isPaused) {
                this.props.firebase.live().update(
                    {isPaused: true, runningPartDuration: this.props.runningTime})
            }
            progressBar = (
                <ProgressBar
                    full={this.props.partData.duration}
                    timeLeft={duration}
                    height='6px'/>)
        }

        let scenes = null;
        let arrow = <Tooltip title='unfold details' placement='left-end'>
            <KeyboardArrowLeftIcon onClick={this.toggleVisibilityHandler}/>
        </Tooltip>;

        if (this.state.showChildren) {
            scenes = <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <Tooltip title='Add Scene'>
                <IconButton size="small" color="primary" className={classes.button} aria-label="add"
                            onClick={() => this.props.clicked(null, 'scene/details', this.props.partData.id)}>
                    <AddIcon/>
                </IconButton>
                </Tooltip>
                <ScenesList
                    isRunning={this.props.runningTime}
                    parentId={this.props.partData.id}
                    startTime={startTime}
                    clicked={this.props.clicked}/>
            </div>
            arrow = <Tooltip title='hide details' placement='left-end'>
                <KeyboardArrowDownIcon onClick={this.toggleVisibilityHandler} />
            </Tooltip>
        }

        return (
            <div className={classes.Wrapper}>
                <div className={classes.Part}>
                    {this.props.children}
                    <Time startTime={startTime}
                          duration={duration}
                          isLive={!!this.props.runningTime}/>
                    <div className={classes.Title}
                         onClick={() => this.props.clicked(this.props.partData.id, 'part/details')}>{this.props.partData.title}
                        <Attachement elementData={this.props.partData}/>
                    </div>
                    <div className={classes.vl}></div>
                    <DisplayCrew
                        team={this.props.partData.team}
                        deadLine={startTime - 58000}/>
                    <div className={classes.Controls}>
                        <OptionsMenu
                            elementType='parts'
                            element={this.props.partData}
                            parent={this.props.partData.blockId}/>
                        {arrow}
                    </div>

                </div>
                {progressBar}
                {scenes}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isPaused: state.live.isPaused,
        showAllScenes: state.global.showAllScenes
    }
};

export default compose (
    withFirebase,
    connect(mapStateToProps)
)(Part);