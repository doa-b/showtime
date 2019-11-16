import React from 'react';

import classes from './ShowDisplay.module.css'

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import {msToDate, msToTime} from "../../../shared/utility";


const styles = theme => ({
    root: {
        display: 'flex',
    },
    dateTime: {

        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
});
/**
 * Created by Doa on 16-11-2019.
 */

// Todo get dateTime from show
const ShowDisplay = withStyles(styles)(({classes, isLive, startDateTime, currentTime}) => {

    let show = (
        <>
                <Typography className={classes.title} variant='h2' component='h1'>
                    Trinity Fall Trend Show Switserland
                </Typography>
            <div className={classes.dateTime}>
                <Typography variant='h6'>
                   {msToDate(startDateTime)}
                </Typography>
                <Typography variant='h6'>
                    {msToTime(startDateTime)}
                </Typography>
            </div>
        </>
    );
    if (isLive) {
        show = (
            <Typography variant='h2'>
                {msToTime(currentTime)}
            </Typography>
        )


    }

    return  <Paper className={classes.paper}>{show}</Paper>
});

export default ShowDisplay;