import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import './App.css';
import Schedule from './containers/Schedule/Schedule';
import BlockDetails from './containers/Blocks/BlockDetails/BlockDetails'
import PartDetails from './containers/Parts/PartDetails/PartDetails'
import Layout from './hoc/Layout/Layout';
import Monitor from "./containers/Monitor/Monitor";
import SceneDetails from "./containers/Scenes/SceneDetails/SceneDetails";
import ShowList from "./containers/Shows/ShowList/ShowList";


function App() {

    let routes = (
        <Switch>
            <Route path="/" exact component={Schedule}/>
            <Route path="/block/details" exact component={BlockDetails}/>
            <Route path="/part/details" exact component={PartDetails}/>
            <Route path="/scene/details" exact component={SceneDetails}/>
            <Route path="/monitor" exact component={Monitor}/>
            <Route path="/shows" exact component={ShowList}/>
            <Redirect to="/"/>
        </Switch>
    );
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <Layout variant='temporary'>
            {routes}
        </Layout>
        </MuiPickersUtilsProvider>
    );
}

export default withRouter(App);
