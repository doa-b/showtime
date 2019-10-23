import React, {Component} from 'react';

import classes from './Layout.module.css'


/**
 * Created by Doa on 23-10-2019.
 */
class Layout extends Component {

    render()
    {
        return (this.props.children);
    }
}

export default Layout;