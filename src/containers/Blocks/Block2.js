import React, {Component} from 'react';
import Time from '../../components/Time/Time'
import PartsList from "../Parts/PartsList/PartsList";
import {Responsive} from 'responsive-react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import OptionsMenu from "../../components/ui/OptionsMenu/OptionsMenu";
import {Tooltip} from "@material-ui/core"
import Attachement from "../../components/ui/Attachements/Attachement";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    blockWrapper: {
        background: 'blue',
        border: '1px solid #ccc',
        boxShadow: '3px 3px 3px #ccc',
        color: 'white',
        padding: 1,
    },
    block: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
    spacer: {
        marginLeft: '1%'
    },

    below: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    belowMobile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        cursor: 'pointer',
        marginLeft: 'auto'
    },
    title: {
        cursor: 'pointer',
        fontWeight: 'bold'
    }
});

/**
 * Created by Doa on 23-10-2019.
 */
class Block extends Component {

    state = {
        showChildren: true,
    };

    toggleVisibilityHandler = () => {
        this.setState((prevState) => {
            return {showChildren: !prevState.showChildren};
        });
    };

    render() {
        const {classes, startTime, duration, blockData, clicked, running, children} = this.props;
        let beginTime = startTime - duration;
        let textColor = (blockData.textColorBlack) ? '#000' : '#fff';
        const arrow = (this.state.showChildren) ? (
            <Tooltip title='hide details' placement='left-end'>
                <KeyboardArrowDownIcon onClick={this.toggleVisibilityHandler}/>
            </Tooltip>
        ) : (
            <Tooltip title='unfold details' placement='left-end'>
                <KeyboardArrowLeftIcon onClick={this.toggleVisibilityHandler}/>
            </Tooltip>
        );

        return (
            <>
                <Responsive displayIn={['Laptop', 'Tablet']}>
                    <div className={classes.blockWrapper}
                         style={{
                             background: blockData.color,
                             color: textColor,
                         }}>
                        <div className={classes.block}>
                            {children}
                            <Time startTime={beginTime}
                                  duration={duration}
                                  isLive={!!running}/>
                            <div className={classes.title}
                                 onClick={() => clicked(blockData.id, 'block/details')}>
                                {blockData.title}
                                {(running) ? '  running' : null}
                                <Attachement elementData={blockData}/>
                            </div>
                            <div className={classes.controls}>
                                <OptionsMenu
                                    elementType='blocks'
                                    element={blockData}
                                    parent={blockData.showId}/>
                                {arrow}
                            </div>
                        </div>
                    </div>
                    {(this.state.showChildren) ? (
                        <div className={classes.below}>
                            <span className={classes.spacer}></span>
                            <Tooltip title='Add Part'>
                                <IconButton size="small" color="primary"
                                            className={classes.button}
                                            onClick={() => clicked(null, 'part/details', blockData.id)}
                                            aria-label="add">
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                            <PartsList startTime={beginTime}
                                       parentId={blockData.id}
                                       clicked={clicked}
                                       running={running}/>
                        </div>
                    ) : null
                    }
                </Responsive>

                <Responsive displayIn={['Mobile']}>
                    <div className={classes.blockWrapper}
                         style={{
                             background: blockData.color,
                             color: textColor,
                         }}>
                        <div className={classes.block}>
                            {children}
                            <Time startTime={beginTime}
                                  duration={duration}
                                  isLive={!!running}/>
                            <Attachement elementData={blockData}/>
                            <div className={classes.controls}>
                                <OptionsMenu
                                    elementType='blocks'
                                    element={blockData}
                                    parent={blockData.showId}/>
                                {arrow}
                            </div>
                        </div>
                        <div className={classes.title}
                             onClick={() => clicked(blockData.id, 'block/details')}>
                            {blockData.title}

                        </div>
                    </div>
                    {(this.state.showChildren) ? (
                        <div className={classes.belowMobile}>
                            <PartsList startTime={beginTime}
                                       parentId={blockData.id}
                                       clicked={clicked}
                                       running={running}/>
                            <Tooltip title='Add Part'>
                                <IconButton size="small" color="primary"
                                            className={classes.button}
                                            onClick={() => clicked(null, 'part/details', blockData.id)}
                                            aria-label="add">
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : null
                    }
                </Responsive>
            </>
        );
    };
}

export default withStyles(styles)(Block);