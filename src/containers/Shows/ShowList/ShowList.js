import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux'
import moment from 'moment'
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import * as actions from "../../../store/actions";
import {Typography} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import logo from '../../../assets/images/trinity-logo-dark-transparent.png';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DesktopWindowsIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Link, NavLink} from "react-router-dom";
import { withFirebase} from "../../../firebase";

const styles = theme => ({
    paper: {
        margin: 'auto',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    listItem: {
        textAlign: 'start',
        alignItems: 'center',
    },
    addNewListItem: {
        textAlign: 'center',
        alignItems: 'center',
    },
    image: {
        height: 50,
        marginRight: 10
    },
    addNew: {
        color: 'light-grey',
        margin: '0px 10px 0px 10px',
        textAlign: 'center'
    },
    checked: {
        marginLeft: 10
    }
});

/**
 * Created by Doa on 27-11-2019.
 */
class ShowList extends Component {

    showClickedHandler = (showId) => {
        this.props.onSetCurrentShow(this.props.firebase, showId);
        this.props.history.push('/');
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography variant='h4' component='h1'>
                    Choose a show
                </Typography>
                <List>
                    {this.props.shows.map((show, index) => (
                        <ListItem
                            selected={show.id === this.props.showId}
                            key={index}
                            className={classes.listItem}
                            button
                            alignItems="flex-start"
                            onClick={() => this.showClickedHandler(show.id)}>
                            <img className={classes.image} src={logo}/>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant='subtitle1'>
                                        {show.title}
                                    </Typography>}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {show.location + ', ' +
                                            moment(show.dateTimeMs).format('dddd D MMMM YYYY, HH:mm')}
                                        </Typography>
                                    </>
                                }
                            />
                            <CheckCircleOutlineIcon className={classes.checked} color={'primary'}/>
                        </ListItem>
                    ))}
                    <ListItem key='a100'
                              className={classes.addNewListItem}
                              button
                              component={NavLink}
                              to='/show/details'>
                        <ListItemText
                            primary={
                                <Typography
                                    className={classes.addNew}
                                    variant='subtitle1'>
                                    Add new show
                                </Typography>}/>
                        <AddCircleOutlineIcon/>
                    </ListItem>
                </List>
            </Paper>);

    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
        shows: state.show.shows,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetCurrentShow: (firebase, showId) => dispatch(actions.setCurrentShow(firebase, showId))
    }
};

export default compose(
    withStyles(styles),
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps))(ShowList)