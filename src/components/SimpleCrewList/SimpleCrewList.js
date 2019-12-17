import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {sceneCategories, convertObjectstoArray} from '../../shared/utility'
import {connect} from "react-redux";
import * as actions from "../../store/actions";

const styles = theme => ({
    crewList: {
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

/**
 * Created by Doa on 23-10-2019.
 */
const simpleCrewList = withStyles(styles)(({classes, team, onSetDisplayUser}) => {
    if (team) {
        const crew = convertObjectstoArray(team);
        return crew.map((actor) => (
            <span className={classes.crewList}
                  onClick={() => onSetDisplayUser(actor)}
                  key={actor.id}>
                {actor.firstName}
            </span>
        ))
    } else return null
});

const mapDispatchToProps = (dispatch) => {
    return {
        onSetDisplayUser: (user) => dispatch(actions.setDisplayUser(user))
    }
};

export default connect(null, mapDispatchToProps)(simpleCrewList);

