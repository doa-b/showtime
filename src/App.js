import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import './App.css';
import Schedule from './containers/Schedule/Schedule';
import BlockDetails from './containers/Blocks/BlockDetails/BlockDetails'
import PartDetails from './containers/Parts/PartDetails/PartDetails'
import Layout from './hoc/Layout/Layout';
import Monitor from "./containers/Monitor/Monitor";

function App() {

    let routes = (
        <Switch>
            <Route path="/" exact component={Schedule}/>
            <Route path="/block/details" exact component={BlockDetails}/>
            <Route path="/part/details" exact component={PartDetails}/>
            <Route path="/monitor" exact component={Monitor}/>
            <Redirect to="/"/>
        </Switch>
    );
    return (
            <Layout variant='temporary'>
                {routes}
            </Layout>
    );
}

export default withRouter(App);
