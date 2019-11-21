import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import Time from "../Time/Time";

const styles = theme => ({
    scene: {
        display: 'flex',
        fleDirection: 'row',
        justifyContent: 'flex-start',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: '1px 5px 1px 5px',
        margin: '1px 5px 1px 5px',
    },
    title: {
        cursor: 'pointer'
    }
});

/**
 * Created by Doa on 23-10-2019.
 */
const scene = withStyles(styles)(({classes, startTime, sceneData, children, detailClicked}) => {
    return (
        <div className={classes.scene}>
            {children}
            <Time startTime={startTime + sceneData.startTime}
                  duration={sceneData.duration}/>
            <div className={classes.title}
                 onClick={() => detailClicked(sceneData.id, 'scene/details')}>{sceneData.title}</div>
        </div>
    )
});

export default scene;