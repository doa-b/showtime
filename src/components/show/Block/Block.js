import React from 'react';
import StartTime from '../../StartTime/StartTime'
import Duration from '../../Duration/Duration'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import classes from './Block.module.css'

import Part from '../Block/Part/Part'
/**
 * Created by Doa on 23-10-2019.
 */
const block = (props) => {

    return (
        <div className={classes.Block}>
            <StartTime startTime={props.startTime}/>
            <Duration duration={props.duration}/>
           {props.blockData.title}
            <ExpandMoreIcon/>
        </div>


    );
};

export default block;