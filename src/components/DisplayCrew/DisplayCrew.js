import React, {useState} from 'react';

import {ROLES, convertObjectstoArray} from '../../shared/utility'
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

/**
 * Created by Doa on 18-11-2019.
 */
const styles = theme => ({
    root: {
        marginLeft: 5
    },
});

const displayCrew = (props) => {
    return ROLES.map((role) => {
        return (
            <RoleCast
                key={role}
                cast={convertObjectstoArray(props.team)
                    .filter((actor) => actor.groups === role)}
                role={role}
                onSetDisplayUser={props.onSetDisplayUser}
            />
        )
    })
};


const RoleCast = withStyles(styles)(
    ({classes, cast, role, onSetDisplayUser}) => {

        if (cast && cast.length > 0) {
            const actors = cast.map((actor) => {
                return (
                    <span className={classes.root} key={actor.id}>
                <Chip key={actor.id}
                      size='small'
                      variant='outlined'
                      avatar={<Avatar alt={actor.firstName} src={actor.imageUrl}/>}
                      label={actor.firstName}
                      onClick={()=> onSetDisplayUser(actor)}/>
                     </span>
                )
            });

            return (
                <div className={classes.root}>
                    <b>{role}</b>
                    {actors}
                </div>)
        } else return null
    });


const mapDispatchToProps = (dispatch) => {
    return {
        onSetDisplayUser: (user) => dispatch(actions.setDisplayUser(user))
    }
};

export default connect(null, mapDispatchToProps)(displayCrew)