import React, {Component} from 'react';
import {compose} from 'redux';
import {KeyboardTimePicker} from '@material-ui/pickers'


import {withStyles} from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import {connect} from 'react-redux'
import {
    updateObject,
    convertArrayToObject,
    convertObjectstoArray,
    sceneCategories, convertObjectsAndSortByKey
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
import FileUpload from "../../../components/FileUpload/FileUpload";
import {AuthUserContext} from "../../../hoc/Session";
import PrivateNote from "../../../components/ui/PrivateNote/PrivateNote";

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
        alignItems: 'center'
    },
    colorPicker: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexGrow: 1,
    },

    textColor: {
        marginLeft: 10
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

    titleAndDuration: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline'
    },

    titleInput: {
        flexGrow: 2
    },
    team: {
        border: 5
    },
    select: {
        flexGrow: 1,
    },
    durationPicker: {
        width: 150,
        marginLeft: 10,
        marginBottom: 0
    },
    startTimePicker: {
        width: 150,
        marginRight: 10,
        marginBottom: 0
    },
    categorySelect: {
        flexGrow: 1,
        marginRight: 10
    },
    categorySelection: {
        display: 'flex',
        alignItems: 'center',
    },
    selecters: {
        textAlign: 'left',
        marginTop: theme.spacing(.5),
        marginBottom: theme.spacing(1),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    icon: {
        verticalAlign: 'middle'
    }
});

/**
 * Created by Doa on 30-10-2019.
 */
class SceneDetails extends Component {

    state = {
        showId: this.props.showId,
        partId: '',
        order: 0,
        title: 'your scene title',
        cue: '',
        description: '',
        duration: moment(120000),
        startTime: moment(60000),
        color: '#ffffff',
        textColorBlack: true,
        team: [],
        category: 0,
        files: []
    };

    componentDidMount() {
        if (this.props.location.state) {
            if (this.props.location.state.elementId) {
                let currentScene = this.props.scenes.filter((aScene) => aScene.id === this.props.location.state.elementId)[0];
                if (currentScene) {
                    this.setState(updateObject(currentScene,
                        {
                            team: convertObjectstoArray(currentScene.team),
                            duration: moment(currentScene.duration),
                            startTime: moment(currentScene.startTime)
                        }));
                }
            } else {
                const numberOfScenesinPart = this.props.scenes.filter((aScene) => aScene.partId === this.props.location.state.parentId).length;
                this.setState(
                    {order: numberOfScenesinPart, partId: this.props.location.state.parentId}
                )
            }
        }
    }

    inputChangedHandler = (event) => {
        console.log(this.state);
        this.setState({[event.target.id]: event.target.value})
    };

    teamChangedHandler = (event, value) => {
        this.setState({team: value})
    };

    partChangedHandler = (event) => {
        this.setState({partId: event.target.value})
    };

    categoryChangedHandler = (event) => {
        this.setState({category: event.target.value})
    };

    durationChangedHandler = (date) => {
        console.log(date);
        console.log('this is the value: ' + date.valueOf());

        console.log(this.state.duration);
        this.setState({duration: date})
    };

    startTimeChangedHandler = (date) => {
        this.setState({startTime: date})
    };

    colorChangedHandler = (color) => {
        this.setState({color: color.hex});
    };

    textColorChangedHandler = () => {
        this.setState((prevState) => {
            return {textColorBlack: !prevState.textColorBlack};
        });
    };
    onSubmitHandler = (event) => {
        event.preventDefault();
        const scene = updateObject(this.state,
            {
                team: convertArrayToObject(this.state.team, 'id'),
                duration: this.state.duration.valueOf(),
                startTime: this.state.startTime.valueOf()
            });
        if (this.props.location.state && this.props.location.state.elementId) {
            this.props.onUpdate(this.props.location.state.elementId, scene, 'scenes')
        } else {
            this.props.onSave('scenes', scene)
        }
        // TODO let this wait until saving to store is done
        this.props.history.push('/');
    };

    render() {
        const {classes, userObject} = this.props;
        const users = convertObjectsAndSortByKey(userObject,'groups');
        console.log(users)

        const textColor = (this.state.textColorBlack) ? '#000' : '#fff';
        const filterOptions = createFilterOptions({
            ignoreCase: 'true',
            stringify: option => option.firstName,
        });

        return (
            <Paper className={classes.paper}>
                <div className={classes.title} style={{
                    background: this.state.color,
                    color: textColor
                }}>
                    <span className={classes.icon}>{sceneCategories[this.state.category].icon} </span>
                    {' ' + this.state.title}
                </div>
                <div className={classes.colorPicker}>
                    <HuePicker
                        width='60%'
                        color={this.state.color}
                        onChangeComplete={this.colorChangedHandler}/>
                    <div className={classes.textColor}>
                        Text colour: white<Switch
                        color='primary'
                        checked={this.state.textColorBlack}
                        onChange={this.textColorChangedHandler}/>black
                    </div>
                </div>

                <form className={classes.form}
                      onSubmit={this.onSubmitHandler}>
                    <div className={classes.titleAndDuration}>
                        <KeyboardTimePicker
                            id='startTime'
                            className={classes.startTimePicker}
                            required
                            keyboardIcon={<AccessTimeIcon/>}
                            inputVariant='outlined'
                            ampm={false}
                            openTo='minutes'
                            views={['minutes', 'seconds']}
                            format='mm:ss'
                            label='Relative StartTime'
                            value={this.state.startTime}
                            onChange={this.startTimeChangedHandler}
                        />
                        <TextField className={classes.titleInput}
                                   onChange={this.inputChangedHandler}
                                   value={this.state.title}
                                   required
                                   id='title'
                                   label='title'
                                   margin='normal'
                                   variant='outlined'/>
                        <KeyboardTimePicker
                            className={classes.durationPicker}
                            required
                            keyboardIcon={<AccessTimeIcon/>}
                            inputVariant='outlined'
                            ampm={false}
                            openTo='minutes'
                            views={['minutes', 'seconds']}
                            format='mm:ss'
                            label='Duration'
                            value={this.state.duration}
                            onChange={this.durationChangedHandler}
                        />
                    </div>
                    <TextField
                        onChange={this.inputChangedHandler}
                        value={this.state.cue}
                        id='cue'
                        label='cue'
                        margin='normal'
                        variant='outlined'/>
                    <TextField
                        onChange={this.inputChangedHandler}
                        value={this.state.description}
                        id='description'
                        label='description'
                        multiline
                        rows={3}
                        margin='normal'
                        variant='outlined'/>
                    <div className={classes.selecters}>
                        <FormControl className={classes.categorySelect}
                                     id='category'>
                            <FormHelperText>Choose a category</FormHelperText>
                            <Select className={classes.categorySelection}
                                    autoWidth
                                    labelId='categoryLabel'
                                    id='category'
                                    variant='outlined'
                                    value={this.state.category}
                                    onChange={this.categoryChangedHandler}>
                                {sceneCategories.map((category, index) => {
                                    return (
                                        <MenuItem key={[index]} value={index}>
                                            <span className={classes.icon}>{category.icon}</span>
                                            {category.label}
                                        </MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.select}
                                     id='partId'>
                            <FormHelperText>Choose the parent Part</FormHelperText>
                            <Select className={classes.select}
                                    autoWidth
                                    labelId='label'
                                    id='partId'
                                    variant='outlined'
                                    value={this.state.partId}
                                    onChange={this.partChangedHandler}>
                                {this.props.parts.map(part => {
                                    return <MenuItem key={part.id} value={part.id}>{part.title}</MenuItem>
                                })}
                            </Select>
                        </FormControl>

                    </div>
                    <Autocomplete className={classes.team}
                                  value={this.state.team}
                                  id='team'
                                  multiple
                                  onChange={this.teamChangedHandler}
                                  groupBy={option => option.groups}
                                  getOptionLabel={option => option.firstName}
                                  options={users.map(option => option)}
                                  defaultValue={[users[1]]}
                                  filterOptions={filterOptions}
                                  filterSelectedOptions
                                  renderTags={(value, {className, onDelete}) =>
                                      value.map((option, index) => (
                                          <Chip
                                              key={index}
                                              variant='outlined'
                                              data-tag-index={index}
                                              tabIndex={-1}
                                              label={option.firstName}
                                              avatar={<Avatar alt={option.firstName} src={option.imageUrl}/>}
                                              className={className}
                                              onDelete={onDelete}
                                              onClick={() => this.props.onSetDisplayUser(option)}
                                          />
                                      ))
                                  }
                                  renderInput={params => (
                                      <TextField
                                          {...params}
                                          variant='filled'
                                          label='Team members'
                                          placeholder='name'
                                          margin='normal'
                                          fullWidth
                                      />
                                  )}
                    />
                    <Button
                        type='submit'
                    >
                        Submit
                    </Button>
                </form>
                {this.state.id ?
                    <>
                        <AuthUserContext.Consumer>
                            {authUser => <PrivateNote authUser={authUser} elementId={this.state.id}/>}
                        </AuthUserContext.Consumer>
                        <FileUpload
                            files={this.state.files}
                            elementId={this.state.id}
                            elementType='scenes'/>
                    </>
                    : null}
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
        parts: state.show.parts,
        scenes: state.show.scenes,
        userObject: state.users.users,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onUpdate: (showId, data, elementName) => dispatch(actions.update(showId, data, elementName)),
        onSetDisplayUser: (user) => dispatch(actions.setDisplayUser(user))
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(SceneDetails)