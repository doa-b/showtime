import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import './App.css';
import Schedule from './containers/Schedule/Schedule';
import Layout from './hoc/Layout/Layout';

function App() {

    let routes = (
        <Switch>
            <Route path="/" exact component={Schedule}/>
            <Redirect to="/"/>
        </Switch>
    );
    return (
            <Layout>
                {routes}
            </Layout>
    );
}

export default withRouter(App);
