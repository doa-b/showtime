import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {compose} from "redux";
import {connect} from "react-redux";
import {withSnackbar} from 'notistack';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import {TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    card: {
        maxWidth: 322
    },
    media: {
        width: 322,
        height: 322
    },
    content: {
        textAlign: 'center'
    },
    header: {
        textAlign: 'center',
        texTransform: 'capitalize'
    },
    actions: {
        justifyContent: 'space-between'
    },
    message: {
        width: '100%'
    }
});
/**
 * Created by Doa on 19-11-2019.
 */
const displayUser = withStyles(styles)(
    ({classes, user, close, enqueueSnackbar}) => {

        const [message, setMessage] = useState('');
        const [expanded, setExpanded] = useState(false);

        const ExpandIcon = ({expanded}) =>
            expanded ? <ExpandMoreIcon/> : <ChevronLeftIcon/>;

        const toggleExpanded = () => {
            setExpanded(!expanded);
        };

        const inputChangedHandler = (event, value) => {
            setMessage(event.target.value)
        };

        const sendMessageHandler = () => {
            enqueueSnackbar(message, {
                variant: 'warning',
                preventDuplicate: true
            })
        };

        return (
            <Card className={classes.card} raised>
                <CardHeader
                    className={classes.header}
                    title={user.firstName + ' ' + user.lastName}
                    subheader={user.groups.charAt(0).toUpperCase() + user.groups.slice(1) + ', ' + user.country}
                    action={
                        <IconButton aria-label="close" onClick={close}>
                            <CloseIcon/>
                        </IconButton>
                    }
                avatar={
                    <IconButton size='small' aria-label="edit">
                    <EditIcon/>
                    </IconButton>}
                />
                <CardMedia
                    className={classes.media}
                    image={user.imageUrl}
                    title={user.firstName}
                />
                <CardContent className={classes.content}>
                    <TextField className={classes.message}
                               onChange={inputChangedHandler}
                               value={message}
                               id='message'
                               label='message'
                               multiline
                               rows={3}
                               margin='normal'
                               variant='outlined'/>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<SendIcon/>}
                        onClick={sendMessageHandler}
                    > Send
                    </Button>
                    <IconButton
                        className={classes.expand}
                        onClick={toggleExpanded}>
                        <ExpandIcon expanded={expanded}/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded}>
                    {/* the CardContent component is used here so that once the additional content is shown,
                    it is styled consistently with the rest of the card content.*/}
                    <CardContent>
                        <Typography>
                            List of Parts and Scenes this user is in
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    });

export default withSnackbar(displayUser);