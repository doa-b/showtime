import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import {connect} from 'react-redux'
import {updateObject, top100Films} from '../../../shared/utility'
import {HuePicker} from 'react-color'
import Switch from "@material-ui/core/Switch";
import Chip from '@material-ui/core/Chip'
import * as actions from "../../../store/actions";
import {update} from "../../../store/actions";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Avatar from "@material-ui/core/Avatar";

/**
 * Created by Doa on 30-10-2019.
 */
class BlockDetails extends Component {

    state = {
        title: 'your block title here',
        showId: this.props.showId,
        order: this.props.blocks.length,
        description: '',
        color: '#0017ff',
        textColorBlack: false,
        team: [this.props.users[0]]
    };

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.id) {
            let currentBlock = this.props.blocks.filter((aBlock) => aBlock.id === this.props.location.state.id)[0];
            if (currentBlock) {
                this.setState(
                    {
                        title: currentBlock.title,
                        description: currentBlock.description,
                        order: currentBlock.order,
                        color: currentBlock.color,
                        textColorBlack: currentBlock.textColorBlack
                    })
            }
        } else {
            this.setState(
                {order: this.props.blocks.length}
            )
        }
    }

    inputChangedHandler = (event, value) => {
        console.log(value)
        console.log(this.state);
        console.log(event);
        console.log(event.target)
        if (value) {
            this.setState({team: value})
        }
        this.setState({[event.target.id]: event.target.value})

    };
    onSubmitHandler = (event) => {
        event.preventDefault();
        if (this.props.location.state && this.props.location.state.id) {
            this.props.onUpdate(this.props.location.state.id, this.state, 'blocks')
        } else {
            this.props.onSave('blocks', this.state)
        }

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
        const textColor = (this.state.textColorBlack) ? '#000' : '#fff';
        const filterOptions = createFilterOptions({
            ignoreCase: 'true',
            stringify: option => option.firstName,
        });

        return (
            <div>
                {this.state.order}
                <HuePicker
                    color={this.state.color}
                    onChangeComplete={this.colorChangedHandler}/>
                <span style={{
                    background: this.state.color,
                    color: textColor
                }}>{this.state.title}</span>

                <form onSubmit={this.onSubmitHandler}>
                    white<Switch
                    color='primary'
                    checked={this.state.textColor}
                    onChange={this.textColorChangedHandler}/>black
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
                        value={this.state.description}
                        id='description'
                        label='description'
                        multiline
                        rows={3}
                        margin='normal'
                        variant='outlined'/>
                    <Autocomplete
                        value={this.state.team}
                        id='team'
                        multiple
                        onChange={this.inputChangedHandler}
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
        blocks: state.show.blocks,
        users: state.show.users,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onUpdate: (showId, data, elementName) => dispatch(actions.update(showId, data, elementName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetails);