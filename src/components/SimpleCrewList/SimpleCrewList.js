import React from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {convertObjectstoArray} from '../../shared/utility'
import {connect} from "react-redux";
import * as actions from "../../store/actions";

const styles = () => ({
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

/** React functional component that lists the user names of participants of current element
 * <br /> Created by Doa on 23-10-2019.
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

simpleCrewList.propTypes = {
    /** object node of users that feature in this element */
    team: PropTypes.object,
    /** function that sets the userId of the user to be shown in detail */
    onSetDisplayUser: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetDisplayUser: (user) => dispatch(actions.setDisplayUser(user))
    }
};



/* @component */
export default connect(null, mapDispatchToProps)(simpleCrewList);

