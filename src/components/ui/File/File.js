import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import Typography from "@material-ui/core/Typography";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

import CardContent from "@material-ui/core/CardContent";
import { humanFileSize } from "../../../shared/utility";

const styles = theme => ({
    card: {
        maxWidth: 345,
    },
    header: {
        alignItems: 'flex-start',
        paddingBottom: 0
    },
    content: {
        height: 0,
        paddingTop: 5,
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        display: 'inline-block'
    },
    icon: {
        lineHeight: .9,
        fontSize: 100,
    },
    link: {
        wordWrap: 'break-word',
        display: 'inline-block'
    }
});
/**
 * Created by Doa on 14-1-2020.
 */
const File = withStyles(styles)(
    ({classes, deleteClicked, fileData: {size, name, url}}) => {
        return (
            <>
                <Card className={classes.card}>
                    <CardHeader className={classes.header}
                        // avatar={
                        //     <IconButton>
                        //         <GetAppIcon/>
                        //     </IconButton>
                        // }
                    action={
                        <IconButton onClick={deleteClicked}>
                            <DeleteIcon color='secondary'/>
                        </IconButton>
                    }
                    title={<InsertDriveFileIcon className={classes.icon}/>}
                    />
                        <CardContent className={classes.content}>
                            <a className={classes.link} target='_blank' href={url}>{name}</a>
                            <Typography variant='caption'>{' - ' + humanFileSize(size, 1024)} </Typography>
                        </CardContent>
                </Card>
            </>);
    });

export default File;