import React from 'react';
import * as PropTypes from 'prop-types';
import {compose} from "redux";
import {convertObjectstoArray} from '../../shared/utility'
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

const styles = () => ({
    root: {
        marginLeft: 5
    },
    simpleCrewList: {
        display: 'flex',
        fleDirection: 'row',
        justifyContent: 'flex-start',
        margin: '0 5px 0 5px',
        cursor: 'pointer',
        color: '#444444',
        textDecoration: 'underline',
        fontSize: '.8em'
    }
});

// const deadlineWarning = (actorName, enqueueSnackbar) => {
//     const message = actorName + ' to Stage, 1 minute to start';
//     enqueueSnackbar(message, {
//         variant: 'info',
//         preventDuplicate: true
//     })
// };
/**
 * React functional component that displays the users that feature in this showElement.
 * Also dispatches Snackbar Messages when user is due to appear on stage.
 * <br />Created by Doa on 18-11-2019.
 */
const displayCrew = ({classes, team, onSetDisplayUser, currentTime, isPaused, enqueueSnackbar, users, isSimple}) => {
    // immediately return when no team is present
    if (!team) return null;
    // get id's of all teammembers and put in array
    const teamArray = convertObjectstoArray(team);
    // crewArray will get all the teammembers data
    let crewArray = [];
    teamArray.map((actor) => {
        const id = (actor.id) ? actor.id : actor;
        // check if user with this id is found, else do not push into array
        return users[id] && crewArray.push(users[id])
    });
    // sort array by role
    crewArray = crewArray.sort((a, b) => a.role - b.role);
    let currentRole = '';

    return crewArray.map((member, index) => {
        let showRole = null;

        if (member.role !== currentRole) {
            showRole = member.role + 's ';
            currentRole = member.role;
        }

        let result = <span className={classes.simpleCrewList} key={index}
                           onClick={() => onSetDisplayUser(member)}>
            {member.firstName}
        </span>;

        if (!isSimple) {
            result = (
                <span className={classes.root} key={index}>
                    {showRole}
                    <Chip
                        size='small'
                        variant='outlined'
                        avatar={<Avatar alt={member.firstName} src={member.imageUrl}/>}
                        label={member.firstName}
                        onClick={() => onSetDisplayUser(member)}/>
                     </span>
            )
        }

        return result
    });
}

displayCrew.propTypes = {
    /** object node of users that feature in this element */
    team: PropTypes.object,
    /** function that sets the userId of the user to be shown in detail */
    onSetDisplayUser: PropTypes.func,
    /** current (local) time in Milliseconds*/
    currentTime: PropTypes.number,
    /** true if current show is paused */
    isPaused: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        currentTime: state.global.currentTime,
        isPaused: state.live.isPaused,
        users: state.users.users
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetDisplayUser: (user) => dispatch(actions.setDisplayUser(user))
    }
};
/* @component */
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(displayCrew);