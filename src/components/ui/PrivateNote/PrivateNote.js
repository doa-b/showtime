import React, {useState, Component, forwardRef, useImperativeHandle} from 'react';
import {TextField} from "@material-ui/core";
import {withFirebase} from "../../../firebase";
import Button from "@material-ui/core/Button";

/**
 * Created by Doa on 17-1-2020.
 */
class PrivateNote extends Component {
    constructor(props) {
        super(props);
        let note = '';
        if (props.authUser && props.authUser.notes) note = props.authUser.notes[props.elementId];
        this.state = {
            note: note,
            button: false
        }
    }

    inputChangedHandler = (event, value) => {
        this.setState({note: event.target.value, button: true})
    };

    submit = () => {
        console.log(this.state.note);
        this.setState({button: false})
        this.props.firebase.savePersonalNote(this.props.elementId, this.state.note)

    };

    render() {

        const page = (this.props.small)
            ? (<div >
                    <TextField
                        style={{backgroundColor: '#ffc'}}
                        fullWidth
                        onChange={this.inputChangedHandler}
                        value={this.state.note}
                        label='your private note'
                        placeholder='This note will only be visible to you'
                        multiline
                        size='small'
                        margin='normal'
                        variant='outlined'/>
                    {(this.state.button) ? (
                        <Button
                            variant='outlined'
                            onClick={this.submit}>
                            save your private note
                        </Button>
                    ) : null}
                </div>
            )
            : (
                <div style={{
                    margin: 'auto', width: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <TextField
                        autoFocus
                        onChange={this.inputChangedHandler}
                        value={this.state.note}
                        label='your private note'
                        placeholder='This note will only be visible to you'
                        multiline
                        rows={3}
                        margin='normal'
                        variant='outlined'/>
                    {(this.state.button) ? (
                        <Button
                            onClick={this.submit}>
                            save your private note
                        </Button>
                    ) : null}
                </div>
            );

        return page
    }

};

export default withFirebase(PrivateNote);