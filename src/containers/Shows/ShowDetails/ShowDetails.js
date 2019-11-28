import React, {Component} from 'react';
import {compose} from 'redux';
import {DateTimePicker, KeyboardDateTimePicker, KeyboardTimePicker} from '@material-ui/pickers'


import {withStyles} from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import {connect} from 'react-redux'
import {
    updateObject,
    convertArrayToObject,
    convertObjectstoArray,
    sceneCategories
} from '../../../shared/utility'
import {HuePicker} from 'react-color'
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip'
import * as actions from '../../../store/actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
    paper: {
        margin: 'auto',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    title: {
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: 5,
        marginBottom: 1,
        alignItems: 'center'
    },
    form: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    titleInput: {},
    dateTimePicker: {
        width: '50%',
        wordWrap: 'break-word',
        marginBottom: 5
    }
});

/**
 * Created by Doa on 28-11-2019.
 */
class ShowDetails extends Component {

    state = {
        dateTimeMs: moment(),
        title: 'your show title',
        description: '',
        location: '',
        photoUrl: 'none',

    };

    componentDidMount() {
        this.props.onSetPageTitle('Show Details');
        if (this.props.location.state) {
            if (this.props.location.state.elementId) {
                let currentShow = this.props.shows.filter((aShow) => aShow.id === this.props.location.state.elementId)[0];
                if (currentShow) {
                    this.setState(updateObject(currentShow,
                        {
                            dateTimeMs: moment(currentShow.dateTimeMs)
                        }));
                }
            }
        }
    }

    inputChangedHandler = (event) => {
        console.log(this.state);
        this.setState({[event.target.id]: event.target.value})
    };


    startDateTimeChangedHandler = (date) => {
        this.setState({dateTimeMs: date})
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        const show = updateObject(this.state,
            {
                dateTimeMs: this.state.dateTimeMs.valueOf()
            });
        if (this.props.location.state && this.props.location.state.elementId) {
            this.props.onUpdate(this.props.location.state.elementId, show, 'shows');
            this.props.history.goBack();
        } else {
            this.props.onSave('shows', show);
            this.props.history.push('/');
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                <form className={classes.form}
                      onSubmit={this.onSubmitHandler}>
                    <DateTimePicker
                        className={classes.dateTimePicker}
                        inputVariant="outlined"
                        value={this.state.dateTimeMs}
                        disablePast
                        onChange={this.startDateTimeChangedHandler}
                        label='Choose date and start time'
                        format='dddd D MMMM YYYY, HH:mm'
                        showTodayButton
                        allowKeyboardControl
                        ampm={false}
                        animateYearScrolling
                    />
                    <TextField className={classes.titleInput}
                               onChange={this.inputChangedHandler}
                               value={this.state.title}
                               required
                               id='title'
                               label='title'
                               margin='normal'
                               variant='outlined'
                    />
                    <TextField
                        onChange={this.inputChangedHandler}
                        value={this.state.description}
                        id='description'
                        label='description'
                        multiline
                        rows={3}
                        margin='normal'
                        variant='outlined'
                    />
                    <TextField
                        onChange={this.inputChangedHandler}
                        value={this.state.location}
                        id='location'
                        label='location'
                        margin='normal'
                        variant='outlined'
                    />
                    <Button type='submit'>Submit</Button>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onUpdate: (showId, data, elementName) => dispatch(actions.update(showId, data, elementName)),
        onSetPageTitle: (title) => dispatch(actions.setPageTitle(title)),
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(ShowDetails)