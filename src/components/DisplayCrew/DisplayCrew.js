import React from 'react';
import * as PropTypes from 'prop-types';
import {compose} from "redux";
import {ROLES, convertObjectstoArray} from '../../shared/utility'
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {withSnackbar} from 'notistack';

const styles = () => ({
    root: {
        marginLeft: 5
    },
});

const deadlineWarning = (actorName, enqueueSnackbar) => {
    const message = actorName + ' to Stage, 1 minute to start';
    enqueueSnackbar(message, {
        variant: 'info',
        preventDuplicate: true
    })
};
/**
 * React functional component that displays the users that feature in this showElement.
 * Also dispatches Snackbar Messages when user is due to appear on stage.
 * <br />Created by Doa on 18-11-2019.
 */
const displayCrew = ({classes, team, onSetDisplayUser, currentTime, deadLine, isPaused, enqueueSnackbar}) => {
    let number = 0;
    return ROLES.map((role) => {
        const cast = convertObjectstoArray(team)
            .filter((actor) => actor.groups === role);

        if (cast && cast.length > 0) {
            number = 0;
            const actors = cast.map((actor) => {
                if (currentTime === deadLine && !isPaused) {
                    deadlineWarning(actor.firstName, enqueueSnackbar)
                }
                number++;
                return (
                    <span className={classes.root} key={actor.id}>
                <Chip key={actor.id}
                      size='small'
                      variant='outlined'
                      avatar={<Avatar alt={actor.firstName} src={actor.imageUrl}/>}
                      label={actor.firstName}
                      onClick={() => onSetDisplayUser(actor)}/>
                     </span>
                )
            });
            return (
                <div key={role}
                     className={classes.root}>
                    <i>{(number >1) ? role + 's' : role}</i>
                    {actors}
                </div>)
        } else return null;
    })
};

displayCrew.propTypes = {
    /** object node of users that feature in this element */
    team: PropTypes.object,
    /** function that sets the userId of the user to be shown in detail */
    onSetDisplayUser: PropTypes.func,
    /** current (local) time in Milliseconds*/
    currentTime: PropTypes.number,
    /** the time in Milliseconds in which this user should recieve a push notification*/
    deadLine: PropTypes.number,
    /** true if current show is paused */
    isPaused: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        currentTime: state.global.currentTime,
        isPaused: state.live.isPaused
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetDisplayUser: (user) => dispatch(actions.setDisplayUser(user))
    }
};
/* @component */
export default compose(
    withSnackbar,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(displayCrew);