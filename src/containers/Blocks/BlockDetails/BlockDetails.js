import React, {Component} from 'react';
import {compose} from "redux";
import {withStyles} from '@material-ui/core/styles';
import {TextField, Button, FormControlLabel} from "@material-ui/core";
import {connect} from 'react-redux'
import {updateObject, top100Films, convertArrayToObject, convertObjectstoArray} from '../../../shared/utility'
import {HuePicker} from 'react-color'
import Switch from "@material-ui/core/Switch";
import Chip from '@material-ui/core/Chip'
import * as actions from "../../../store/actions";
import {update} from "../../../store/actions";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

/**
 * Created by Doa on 30-10-2019.
 */

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
        padding: 5,
        marginBottom: 1,
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
    team: {
        border: 5
    },
    selectShow: {
        textAlign: 'left',
        alignItems: 'left',
        alignContent: 'left'
    }
});

class BlockDetails extends Component {

    state = {
        showId: this.props.showId,
        order: this.props.blocks.length,
        title: 'your block title',
        cue: '',
        description: '',
        color: '#0017ff',
        textColorBlack: false,
        team: [this.props.users[0]]
    };

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.elementId) {
            let currentBlock = this.props.blocks.filter((aBlock) => aBlock.id === this.props.location.state.elementId)[0];
            if (currentBlock) {
                this.setState(updateObject(currentBlock, { team: convertObjectstoArray(currentBlock.team)}))
            }
        } else {
            this.setState(
                {order: this.props.blocks.length}
            )
        }
    }

    inputChangedHandler = (event, value) => {
        console.log(value)
        console.log(event);
        console.log(event.target)
        this.setState({[event.target.id]: event.target.value})
    };

    teamChangedHandler = (event, value) => {
        this.setState({team: value})
    };

    showChangedHandler = (event, value) => {
        this.setState ({showId: event.target.value} )
    };
    onSubmitHandler = (event) => {
        event.preventDefault();
        const block = updateObject(this.state, {team: convertArrayToObject(this.state.team, 'id')})
        if (this.props.location.state && this.props.location.state.id) {
            this.props.onUpdate(this.props.location.state.id, block, 'blocks')
        } else {
            this.props.onSave('blocks', block)
        }
        // TODO let this wait until saving to store is done
        this.props.history.push('/');
    };

    colorChangedHandler = (color) => {
        this.setState({color: color.hex});
    };

    textColorChangedHandler = () => {
        this.setState((prevState) => {
            return {textColorBlack: !prevState.textColorBlack};
        });
    };

// TODO introduce full name, this makes searching more easy. Replace type with Role

    render() {
        const {classes} = this.props;

        const textColor = (this.state.textColorBlack) ? '#000' : '#fff';
        const filterOptions = createFilterOptions({
            ignoreCase: 'true',
            stringify: option => option.firstName,
        });

        return (
            <Paper className={classes.paper}>
                {/*{this.state.order}*/}
                <span className={classes.title} style={{
                    background: this.state.color,
                    color: textColor
                }}>{this.state.title}</span>
                <div className={classes.colorPicker}>
                    <HuePicker
                        width='60%'
                        color={this.state.color}
                        onChangeComplete={this.colorChangedHandler}/>
                    <div className={classes.textColor}>
                        Text colour: white<Switch
                        color='primary'
                        checked={this.state.textColor}
                        onChange={this.textColorChangedHandler}/>black
                    </div>
                </div>

                <form className={classes.form}
                      onSubmit={this.onSubmitHandler}>
                    <TextField
                        onChange={this.inputChangedHandler}
                        value={this.state.title}
                        required
                        id='title'
                        label='title'
                        margin='normal'
                        variant='outlined'/>
                    <TextField
                        onChange={this.inputChangedHandler}
                        value={this.state.cue}
                        id='cue'
                        label='cue'
                        margin='normal'
                        variant='outlined'/>
                    <TextField className={classes.selectShow}
                               onChange={this.inputChangedHandler}
                               value={this.state.description}
                               id='description'
                               label='description'
                               multiline
                               rows={3}
                               margin='normal'
                               variant='outlined'/>
                    <FormControl className={classes.selectShow}
                                 id='showId'>
                        <Select className={classes.selectShow}
                                labelId='label'
                                id='showId'
                                variant='outlined'
                                value={this.state.showId}
                                onChange={this.showChangedHandler}>
                            {this.props.shows.map(show => {
                                return <MenuItem key={show.id} value={show.id}>{show.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Autocomplete className={classes.team}
                                  value={this.state.team}
                                  id='team'
                                  multiple
                                  onChange={this.teamChangedHandler}
                                  groupBy={option => option.groups}
                                  getOptionLabel={option => option.firstName}
                                  options={this.props.users.map(option => option)}
                                  defaultValue={[this.props.users[1]]}
                                  filterOptions={filterOptions}
                                  filterSelectedOptions
                                  renderTags={(value, {className, onDelete}) =>
                                      value.map((option, index) => (
                                          <Chip
                                              key={index}
                                              variant="outlined"
                                              data-tag-index={index}
                                              tabIndex={-1}
                                              label={option.firstName}
                                              avatar={<Avatar alt={option.firstName} src={option.imageUrl}/>}
                                              className={className}
                                              onDelete={onDelete}
                                          />
                                      ))
                                  }
                                  renderInput={params => (
                                      <TextField
                                          {...params}
                                          variant="filled"
                                          label="Team members"
                                          placeholder="name"
                                          margin="normal"
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
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
        blocks: state.show.blocks,
        shows: state.show.shows,
        users: state.users.users,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onUpdate: (showId, data, elementName) => dispatch(actions.update(showId, data, elementName))
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(BlockDetails)