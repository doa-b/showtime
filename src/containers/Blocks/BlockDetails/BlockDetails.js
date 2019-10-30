import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import {connect} from 'react-redux'
import {updateObject} from '../../../shared/utility'
import {HuePicker} from 'react-color'
import Switch from "@material-ui/core/Switch";
import * as actions from "../../../store/actions";
import {update} from "../../../store/actions";

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
        textColorBlack: false
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

    inputChangedHandler = (event) => {
        console.log(this.state);
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


    render() {
        const textColor = (this.state.textColorBlack) ? '#000' : '#fff';

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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onUpdate: (showId, data, elementName) => dispatch(actions.update(showId, data, elementName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetails);