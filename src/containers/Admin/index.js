import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom'
import {withFirebase} from "../../firebase";
import {withAuthorization} from '../../hoc/Session'
import * as ACCESSLEVEL from '../../shared/accessLevel'
import * as ROUTES from '../../shared/routes'
import UserTable from './UserTable'
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
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

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        // set listener on users node in realtime dB
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
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

    onActiveClicked = (user) => {
        this.props.firebase.user(user.uid).update({active: !user.active})
    };

    onAddNewUserClicked = () => {
        this.props.history.push(ROUTES.ADMIN_CREATE_USER)
    };

    render() {
        const {users, loading} = this.state;
        const {classes} = this.props;

        return (
            <div className={classes.paper}>
                {loading && <div>Loading ...</div>}
                <UserTable rows={users}
                           onDetailsClicked={(user) => this.onDetailsClicked(user)}
                           onActiveClicked={(user) => this.onActiveClicked(user)}
                />
                <Fab variant="extended"
                     color='primary'
                     onClick={this.onAddNewUserClicked}>
                    <AddIcon className={classes.extendedIcon}/>
                    Create new User
                </Fab>
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
)(AdminPage);