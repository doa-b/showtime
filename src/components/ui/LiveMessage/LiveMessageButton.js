import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import { compose } from "redux";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import AnnouncementIcon from '@material-ui/icons/AnnouncementOutlined';
import {withFirebase} from "../../../firebase";
import Modal from "../Modal/Modal";
import Dialog from "./Dialog";

const styles = theme => ({
    message: {
        maxWidth: '80%',
        color: 'inherit',
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
    ({classes, monitorMessage, firebase}) => {

        const [isDialogOpen, setDialogOpen] = useState(false);
        const [buttonText, setButtonText] = useState('');

        const setMonitorMessage = (message) => {
            firebase.setLiveData(
                {
                    monitorMessage: message
                });
            if (message) setButtonText(message)
        };

        const ToggleDialog = () => {
            if (monitorMessage) {
                setButtonText('');
                setMonitorMessage('');

            } else setDialogOpen(!isDialogOpen);
        };
        let modal = null;

        if (isDialogOpen) {
            modal = (
                <Modal show
                       modalClosed={() => setDialogOpen(false)}>
                    <Dialog
                    close = {() => setDialogOpen(false)}
                    setMonitorMessage={(message) => setMonitorMessage(message)}/>
                </Modal>
            )
        }
        return (
            <>
                {modal}
                <Button
                    className={classes.message}
                    onClick={ToggleDialog}>
                    <AnnouncementIcon
                        className={classes.icon}
                    />
                    {buttonText}
                </Button>
            </>);
    });

const mapStateToProps = (state) => {
    return {
        monitorMessage: state.live.monitorMessage,
    }
};


export default compose(
    withFirebase,
    connect(mapStateToProps)
) (LiveMessageButton);