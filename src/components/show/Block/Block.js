import React from 'react';

import classes from './Block.module.css'

import Part from '../Block/Part/Part'
/**
 * Created by Doa on 23-10-2019.
 */
const block = (props) => {

    let parts = null;

    if (props.parts) {
        parts = props.parts.filter(part => part.BlockId === props.blockData.id).
            map((part) => (
                <Part key={part.elementId}
                title={part.title}/>
        ))
    }
    return (
        <div>
            blockName: {props.blockData.title}
            {parts}
        </div>

    );
};

export default block;