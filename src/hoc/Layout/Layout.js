import React, {Component} from 'react';
import { compose } from "redux";
import { withRouter } from 'react-router-dom'

import * as actions from "../../store/actions";
import * as ROUTES from '../../shared/routes'
import {connect} from "react-redux";
import {SnackbarProvider} from 'notistack';

import { pageTitle } from "../../shared/routes";

import classes from './Layout.module.css'

import Button from "@material-ui/core/Button";
import MyToolbar from "../../components/ui/MyToolbar/MyToolbar";
import MySideDrawer from "../../components/ui/MySideDrawer/MySideDrawer";
import Modal from '../../components/ui/Modal/Modal'
import DisplayUser from "../../components/DisplayUser/DisplayUser";

import {msToTime} from "../../shared/utility";
import {isOdd} from '../../shared/utility';

/**
 * Created by Doa on 23-10-2019.
 */
class Layout extends Component {

    state = {
        drawer: false
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
            drawer: !prevState.drawer
        }));
    };

    onItemClick = () => () => {
        this.setState(prevState => ({
            drawer: (this.props.variant === 'temporary') ? false : prevState.drawer
        }));
    };

    render() {

        const {showName, displayRealTime,  displaySeconds, isEditable,
            displayUser, showAllScenes, isLive, isPaused, currentTime,
            onToggle, onToggleRealTime, onSetDisplayUser, onToggleIsEditable,
            onSetFoldAll, location, children, variant} = this.props;

        let modal = null;
        const notistackRef = React.createRef();
        const onClickDismiss = key => () => {
            notistackRef.current.closeSnackbar(key);
        };
        if (displayUser) {
            modal = (
                <Modal show
                       modalClosed={() => onSetDisplayUser(null)}>
                    <DisplayUser
                        user={displayUser}
                        close={() => onSetDisplayUser(null)}/>
                </Modal>
            )
        }

        let title = pageTitle(location.pathname);
        if (location.pathname === ROUTES.MOBILE && isLive) {
            title = msToTime(currentTime, true);
            if (isPaused) {
                title = (isOdd(currentTime)) ? msToTime(currentTime, true)
                    : 'PAUSED'
            }
        };


        return (
            <SnackbarProvider
                ref={notistackRef}
                action={(key) => (
                    <Button onClick={onClickDismiss(key)}>
                        'Dismiss'
                    </Button>
                )}
                maxSnack={3}>
                {modal}
                <MyToolbar
                    title={title}
                    onMenuClick={this.toggleDrawer}
                    isLive={isLive}
                    showName={showName}
                    showAllScenes={showAllScenes}
                    setShowAllScenes={onSetFoldAll}/>
                <MySideDrawer
                    variant={variant}
                    open={this.state.drawer}
                    onClose={this.toggleDrawer}
                    onItemClick={this.onItemClick}
                    showSeconds={displaySeconds}
                    toggleShowSeconds={onToggle}
                    displayRealTime={displayRealTime}
                    toggleDisplayRealTime={onToggleRealTime}
                    isEditable={isEditable}
                    isLive={isLive}
                    toggleIsEditable={onToggleIsEditable}
                />
                <div className={classes.Main}>
                {children}
                </div>
            </SnackbarProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showName: state.show.showName,
        displayRealTime: state.global.displayRealTime,
        displaySeconds: state.global.displaySeconds,
        isEditable: state.global.isEditable,
        displayUser: state.global.displayUser,
        showAllScenes: state.global.showAllScenes,
        isLive: state.live.isLive,
        isPaused: state.live.isPaused,
        currentTime: state.global.currentTime,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggle: () => dispatch(actions.toggleShowSeconds()),
        onToggleRealTime: () => dispatch(actions.toggleDisplayRealTime()),
        onSetDisplayUser: (user) => dispatch(actions.setDisplayUser(user)),
        onToggleIsEditable: () => dispatch(actions.toggleIsEditable()),
        onSetFoldAll: (value) => dispatch(actions.setShowAllScenes(value)),
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),

)(Layout);