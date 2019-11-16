import React, {Component, useState} from 'react';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

import MyToolbar from "../../components/ui/MyToolbar/MyToolbar";
import MySideDrawer from "../../components/ui/MySideDrawer/MySideDrawer";

/**
 * Created by Doa on 23-10-2019.
 */
class Layout extends Component {

    state = {
        drawer: false,
        title: 'Schedule'
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
            drawer: !prevState.drawer
        }));
    };

    onItemClick = (title) => () => {
        this.props.onSetPageTitle(title);
        this.setState(prevState => ({
            drawer: (this.props.variant === 'temporary') ? false : prevState.drawer
        }));
    };

    render() {
        return (
            <>
                <MyToolbar
                    title={this.props.pageTitle}
                    onMenuClick={this.toggleDrawer}
                    isLive={this.props.isLive}
                    showName={this.props.showName}/>
                <MySideDrawer
                    variant={this.props.variant}
                    open={this.state.drawer}
                    onClose={this.toggleDrawer}
                    onItemClick={this.onItemClick}
                    showSeconds={this.props.displaySeconds}
                    toggleShowSeconds={this.props.onToggle}
                    displayRealTime={this.props.displayRealTime}
                    toggleDisplayRealTime={this.props.onToggleRealTime}
                />
                {this.props.children}
            </>);
    }
}

const mapStateToProps = (state) => {
    return {
        showName: state.show.showName,
        displayRealTime: state.show.displayRealTime,
        displaySeconds: state.show.displaySeconds,
        pageTitle: state.show.pageTitle,
        isLive: state.live.isLive,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggle: () => dispatch(actions.toggleShowSeconds()),
        onToggleRealTime: () => dispatch(actions.toggleDisplayRealTime()),
        onSetPageTitle: (title) => dispatch (actions.setPageTitle(title))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);