import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {CardHeader} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {},
    header: {
        textAlign: 'center',
        texTransform: 'capitalize'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    message: {
        width: '100%'
    }
});

/**
 * Created by Doa on 8-1-2020.
 */
const Dialog = withStyles(styles)(
    ({classes, close, setMonitorMessage}) => {
        const [message, setMessage] = useState('');
        const [recipients] = [];

        const inputChangedHandler = (event) => {
            setMessage(event.target.value)
        };

        const onSubmit = (event) => {
            event.preventDefault();
            setMonitorMessage(message)
            // firebase.setLiveData(
            //     {
            //         monitorMessage: message
            //     });
            close();
        };

        return (
            <Card raised>
                <CardHeader className={classes.header}
                            title='Send Message'
                            subheader='To Monitor and actor(s)'
                            action={
                                <IconButton aria-label="close" onClick={close}>
                                    <CloseIcon/>
                                </IconButton>
                            }/>
                <CardContent className={classes.content}>
                    <form onSubmit={onSubmit}>
                        <TextField className={classes.message}
                                   onChange={inputChangedHandler}
                                   value={message}
                                   id='message'
                                   label='message'
                                   multiline
                                   rows={3}
                                   margin='normal'
                                   variant='outlined'/>
                        <TextField className={classes.message}
                                   onChange={inputChangedHandler}
                                   value={message}
                                   id='message'
                                   label='message'
                                   multiline
                                   rows={3}
                                   margin='normal'
                                   variant='outlined'/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Send Now!
                        </Button>
                    </form>
                </CardContent>

            </Card>);
    });

export default Dialog;