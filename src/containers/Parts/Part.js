import React, {Component} from 'react';

import classes from './Part.module.css'
import StartTime from "../../components/StartTime/StartTime";
import Duration from "../../components/Duration/Duration";
import ScenesList from "../Scenes/ScenesList";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Time from "../../components/Time/Time";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

/**
 * Created by Doa on 23-10-2019.
 */

// Todo convert this to class component and give its own state visible or not. Else we close them all

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
        let duration=this.props.partData.duration;
        if (this.props.runningTime) {
            duration -= this.props.runningTime
            if (duration === 0 && !this.props.isPaused) {this.props.onPartEnd()}
        }
        let scenes = null;
        let arrow = <KeyboardArrowLeftIcon className={classes.Arrow}
                                           onClick={this.toggleVisibilityHandler}/>;

        if (this.state.showChildren) {
            scenes = <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <IconButton size="small" color="primary" className={classes.button} aria-label="add">
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
                          duration={duration}/>
                    <div onClick={() => this.props.clicked(this.props.partData.id, 'part/details')}>{this.props.partData.title}</div>
                    {arrow}
                </div>
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