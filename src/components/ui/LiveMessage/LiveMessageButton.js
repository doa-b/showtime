import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {compose} from "redux";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import AnnouncementIcon from '@material-ui/icons/AnnouncementOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {withFirebase} from "../../../firebase";
import Modal from "../Modal/Modal";
import Dialog from "./Dialog";

const styles = theme => ({
    message: {
        maxWidth: '80%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    icon: {
        marginRight: 5
    }
});


/**
 * Created by Doa on 8-1-2020.
 */
const LiveMessageButton = withStyles(styles)(
    ({classes, monitorMessage, firebase, users}) => {

        const [isDialogOpen, setDialogOpen] = useState(false);
        const [buttonText, setButtonText] = useState('send message');

        const setMonitorMessage = (message) => {
                firebase.setLiveData(
                    {
                        monitorMessage: message
                    });
            if (message) {
                setButtonText(message.message)}
        };

        const ToggleDialog = () => {
            if (monitorMessage) {
                setButtonText('send message');
                setMonitorMessage('');

            } else setDialogOpen(!isDialogOpen);
        };
        let dialog = null;
        let icon = (
            <AnnouncementIcon
                className={classes.icon}
            />
        )

        if (isDialogOpen) {
            dialog = (
                <Dialog
                    close={() => setDialogOpen(false)}
                    setMonitorMessage={(message) => setMonitorMessage(message)}
                    users={users}/>

            )
        }

        if (monitorMessage) {
            icon = (
                <CancelOutlinedIcon
                    className={classes.icon}
                    color='error'
                />
            )
        }
        return (
            <>
                {dialog}
                <Button variant="contained"
                        color="primary"
                        className={classes.message}
                        onClick={ToggleDialog}>
                    {icon}
                    {buttonText}
                </Button>
            </>);
    });

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        monitorMessage: state.live.monitorMessage,
    }
};


export default compose(
    withFirebase,
    connect(mapStateToProps)
)(LiveMessageButton);