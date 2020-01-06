import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom'
import {withFirebase} from "../../../firebase";
import {withAuthorization} from '../../../hoc/Session'
import * as ACCESSLEVEL from '../../../shared/accessLevel'
import * as ROUTES from '../../../shared/routes'
import LogTable from '../LogTable'

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
});

class LogsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            logs: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        // set listener on logs node in realtime dB
        this.props.firebase.logs().on('value', snapshot => {
            const logsObject = snapshot.val();
            const logsList = Object.keys(logsObject).map(key => ({
                ...logsObject[key],
                uid: key,
            }));
            console.log(logsList)
            this.setState({
                logs: logsList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.logs().off();
    }

    onDetailsClicked = (user) => {
        console.log(user);
        this.props.history.push({
            pathname: ROUTES.ADMIN_USER_DETAILS,
            state: {
                user: user
            }
        })
    };

    // onActiveClicked = (user) => {
    //     this.props.firebase.user(user.uid).update({active: !user.active})
    // };

    // onAddNewUserClicked = () => {
    //     this.props.history.push(ROUTES.ADMIN_CREATE_USER)
    // };

    render() {
        const {logs, loading} = this.state;
        const {classes} = this.props;

        return (
            <div className={classes.paper}>
                {loading && <div>Loading ...</div>}
                <LogTable rows={logs}
                           onDetailsClicked={(user) => this.onDetailsClicked(user)}
                />
            </div>
        )
    }
}

const condition = authUser =>
    authUser && authUser.accessLevel >= ACCESSLEVEL.EXECUTIVE;

export default compose(
    withAuthorization(condition),
    withFirebase,
    withRouter,
    withStyles(styles)
)(LogsPage);