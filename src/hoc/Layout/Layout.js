import React, {Component} from 'react';
import { compose } from "redux";
import { withRouter } from 'react-router-dom'

import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {SnackbarProvider} from 'notistack';

import { pageTitle } from "../../shared/routes";

import classes from './Layout.module.css'

import Button from "@material-ui/core/Button";

import MyToolbar from "../../components/ui/MyToolbar/MyToolbar";
import MySideDrawer from "../../components/ui/MySideDrawer/MySideDrawer";
import Modal from '../../components/ui/Modal/Modal'
import DisplayUser from "../../components/DisplayUser/DisplayUser";

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
        let modal = null;
        const notistackRef = React.createRef();
        const onClickDismiss = key => () => {
            notistackRef.current.closeSnackbar(key);
        };
        if (this.props.displayUser) {
            modal = (
                <Modal show
                       modalClosed={() => this.props.onSetDisplayUser(null)}>
                    <DisplayUser
                        user={this.props.displayUser}
                        close={() => this.props.onSetDisplayUser(null)}/>
                </Modal>
            )
        }

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
                    title={pageTitle(this.props.location.pathname)}
                    onMenuClick={this.toggleDrawer}
                    isLive={this.props.isLive}
                    showName={this.props.showName}
                    showAllScenes={this.props.showAllScenes}
                    setShowAllScenes={this.props.onSetFoldAll}/>
                <MySideDrawer
                    variant={this.props.variant}
                    open={this.state.drawer}
                    onClose={this.toggleDrawer}
                    onItemClick={this.onItemClick}
                    showSeconds={this.props.displaySeconds}
                    toggleShowSeconds={this.props.onToggle}
                    displayRealTime={this.props.displayRealTime}
                    toggleDisplayRealTime={this.props.onToggleRealTime}
                    isEditable={this.props.isEditable}
                    toggleIsEditable={this.props.onToggleIsEditable}
                />
                <div className={classes.Main}>
                {this.props.children}
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

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggle: () => dispatch(actions.toggleShowSeconds()),
        onToggleRealTime: () => dispatch(actions.toggleDisplayRealTime()),
        onSetDisplayUser: (user) => dispatch(actions.setDisplayUser(user)),
        onToggleIsEditable: () => dispatch(actions.toggleIsEditable()),
        onSetFoldAll: (value) => dispatch(actions.setShowAllScenes(value))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),

)(Layout);