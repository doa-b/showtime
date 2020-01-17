import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'

import EventNoteIcon from '@material-ui/icons/EventNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {Tooltip} from "@material-ui/core";
import {AuthUserContext} from "../../../hoc/Session";

const styles = theme => ({
    fileIcon: {
        marginLeft: 2,
        justifyContent: 'center',
        verticalAlign: 'middle',
        fontSize: '1em'
    }
});
/**
 * Created by Doa on 17-1-2020.
 */
const Attachement = withStyles(styles)(
    ({classes, elementData: {id, files}}) => {
        return (
            <>
                {(files) ? (
                    <Tooltip title={'element has file attachements'}>
                        <AttachFileIcon className={classes.fileIcon}/>
                    </Tooltip>
                ) : null}
                <AuthUserContext.Consumer>
                    {authUser => (authUser.notes && authUser.notes[id]) ? (
                            <Tooltip title={'element has your private note'}>
                                <EventNoteIcon className={classes.fileIcon}/>
                            </Tooltip>
                        )
                        : null}
                </AuthUserContext.Consumer>
            </>);
    });

export default Attachement;