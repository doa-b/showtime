import React, {Component} from 'react';
import {compose} from "redux";

import {withFirebase} from "../../firebase";
import {withAuthorization} from '../../hoc/Session'
import * as ACCESSLEVEL from '../../shared/accessLevel'

class AdminPage extends Component {
    constructor(props) {
        super(props);
        // TODO put this in store later
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

    render() {
        const {users, loading} = this.state;

        return (
            <div>
                <h1>Admin</h1>
                <p>
                    The Admin Page is accessible by every signed in admin user.
                </p>
                {loading && <div>Loading ...</div>}
                <UserList users={users}/>
            </div>
        )
    }
}

const UserList = ({users}) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
                <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
                <span>
          <strong>Username:</strong> {user.username}
        </span>
            </li>
        ))}
    </ul>
);

const condition = authUser =>
    authUser && authUser.accessLevel >= ACCESSLEVEL.ADMINISTRATOR;

export default compose(
    withAuthorization(condition),
    withFirebase
)(AdminPage);