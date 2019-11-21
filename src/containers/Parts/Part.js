import React, {Component} from 'react';

import classes from './Part.module.css'

import ScenesList from "../Scenes/ScenesList";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Time from "../../components/Time/Time";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import DisplayCrew from "../../components/DisplayCrew/DisplayCrew";

/**
 * Created by Doa on 23-10-2019.
 */
class Part extends Component {

    state = {
        showChildren: true
    };

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
            if (duration === 0 && !this.props.isPaused) {
                this.props.onPartEnd()
            }
            progressBar = (
                <ProgressBar
                    full={this.props.partData.duration}
                    timeLeft={duration}
                    height='6px'/>)
        }

        let scenes = null;
        let arrow = <KeyboardArrowLeftIcon className={classes.Arrow}
                                           onClick={this.toggleVisibilityHandler}/>;

        if (this.state.showChildren) {
            scenes = <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <IconButton size="small" color="primary" className={classes.button} aria-label="add"
                            onClick={() => this.props.clicked(null, 'scene/details', this.props.partData.id)}>
                    <AddIcon/>
                </IconButton>
                <ScenesList
                    parentId={this.props.partData.id}
                    startTime={startTime}
                    clicked={this.props.clicked}/>
            </div>
            arrow = <KeyboardArrowDownIcon className={classes.Arrow}
                                           onClick={this.toggleVisibilityHandler}/>
        }

        return (
            <div className={classes.Wrapper}>
                <div className={classes.Part}>
                    {this.props.children}
                    <Time startTime={startTime}
                          duration={duration}
                          live={this.props.runningTime}/>
                          <div className={classes.Title}
                         onClick={() => this.props.clicked(this.props.partData.id, 'part/details')}>{this.props.partData.title}</div>
                    <div className={classes.vl}></div>
                    <DisplayCrew
                        team={this.props.partData.team}
                        deadLine={startTime - 58000}/>
                    {arrow}
                </div>
                {progressBar}
                {scenes}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isPaused: state.live.isPaused
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPartEnd: () => dispatch(actions.partHasEnded())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Part);