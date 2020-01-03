import React from 'react';
import {compose} from "redux";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import './App.css';

import * as ROUTES from './shared/routes'

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
import TestPage from "./components/TestPage/TestPage";


import {withFirebase} from "./firebase";
import { withAuthentication } from './hoc/Session'

const App = () => {

    let routes = (
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
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Layout variant='temporary'>
                {routes}
            </Layout>
        </MuiPickersUtilsProvider>
    );
};

export default compose(
    withAuthentication,
    withRouter,
    withFirebase
)(App);
