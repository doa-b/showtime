import React from 'react';

import classes from './ProgressBar.module.css'

/**
 * Created by Doa on 17-11-2019.
 */
const progressBar = ({full, timeLeft, height }) => {

    let barWidth = (timeLeft/full*100)+'%';
    let progressBarColor = '#a9a9a9';
    if (timeLeft < 5000) {progressBarColor = '#ff0000'}

    return (
        <div className={classes.Empty}>
            <div style={{
                     width: barWidth,
                     height:  height,
                     background: progressBarColor
                 }}>
            </div>
        </div>
    );
};

export default progressBar;