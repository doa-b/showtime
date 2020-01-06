import React, { Component } from 'react';
import {compose} from "redux";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import './App.css';

import * as ROUTES from './shared/routes'
import * as actions from './store/actions'

import Schedule from './containers/Schedule/Schedule';
import BlockDetails from './containers/Blocks/BlockDetails/BlockDetails'
import PartDetails from './containers/Parts/PartDetails/PartDetails'
import Layout from './hoc/Layout/Layout';
import Monitor from "./containers/Monitor/Monitor";
import SceneDetails from "./containers/Scenes/SceneDetails/SceneDetails";
import ShowList from "./containers/Shows/ShowList/ShowList";
import ShowDetails from "./containers/Shows/ShowDetails/ShowDetails";
import MobileView from "./containers/MobileView/MobileView";
import SignUpPage from "./containers/authentication/SignUp";
import SignInPage from "./containers/authentication/SignIn";
import SignOutPage from './containers/authentication/SignOut';
import PasswordForgetPage from "./containers/PasswordForget";
import AccountPage from "./containers/authentication/Account";
import AdminPage from './containers/Admin'
import AdminUserDetailsPage from './containers/Admin/UserDetailsPage/UserDetailsPage'
import CreateNewUserPage from "./containers/Admin/CreateNewUserPage/CreateNewUserPage";
import LogsPage from "./containers/Admin/LogsPage/LogsPage";
import TestPage from "./components/TestPage/TestPage";


import {withFirebase} from "./firebase";
import { withAuthentication } from './hoc/Session'
import {connect} from "react-redux";

class App extends Component {

    componentDidMount() {
     this.props.onSetLiveDataListener(this.props.firebase);
    }

    routes = (
        <Switch>
            <Route path={ROUTES.LANDING} exact component={Schedule}/>
            <Route path={ROUTES.SIGN_UP} exact component={SignUpPage}/>
            <Route path={ROUTES.SIGN_IN} exact component={SignInPage}/>
            <Route path={ROUTES.SIGN_OUT} exact component={SignOutPage}/>
            <Route path={ROUTES.PASSWORD_FORGET} exact component={PasswordForgetPage}/>
            <Route path={ROUTES.ACCOUNT} exact component={AccountPage}/>
            <Route path={ROUTES.ADMIN} exact component={AdminPage}/>
            <Route path={ROUTES.ADMIN_USER_DETAILS} exact component={AdminUserDetailsPage}/>
            <Route path={ROUTES.ADMIN_CREATE_USER} exact component={CreateNewUserPage}/>
            <Route path={ROUTES.ADMIN_LOGS} exact component={LogsPage}/>
            <Route path={ROUTES.HOME} exact component={Schedule}/>
            <Route path={ROUTES.SHOW_DETAILS} exact component={ShowDetails}/>
            <Route path={ROUTES.BLOCK_DETAILS} exact component={BlockDetails}/>
            <Route path={ROUTES.PART_DETAILS} exact component={PartDetails}/>
            <Route path={ROUTES.SCENE_DETAILS} exact component={SceneDetails}/>
            <Route path={ROUTES.MONITOR} exact component={Monitor}/>
            <Route path={ROUTES.SHOWS} exact component={ShowList}/>
            <Route path={ROUTES.MOBILE} exact component={MobileView}/>
            <Route path={ROUTES.TEST} exact component={TestPage}/>
            <Redirect to={ROUTES.HOME}/>
        </Switch>
    );

    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Layout variant='temporary'>
                    {this.routes}
                </Layout>
            </MuiPickersUtilsProvider>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetLiveDataListener: (firebase) => dispatch(actions.setLiveDataListener(firebase))
    };
};

export default compose(
    withAuthentication,
    withRouter,
    withFirebase,
    connect (null, mapDispatchToProps)
)(App);
