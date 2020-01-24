import React, {Component} from 'react';
import Time from '../../components/Time/Time'
import PartsList from "../Parts/PartsList/PartsList";
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
        width: 'calc(100% - 8px)',
        display: 'flex',
        flexDirection: 'column',
        background: 'blue',
        border: '1px solid #ccc',
        boxShadow: '3px 3px 3px #ccc',
        color: 'white',
        padding: 1,
        '@media (min-width:600px)': {
           flexDirection: 'row'
        },
    },
    block: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    spacer: {
        '@media (min-width:600px)': {
            marginLeft: '1%'
        }
    },
    below: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        '@media (min-width:600px)': {
            flexDirection: 'row'
        }
    },
    controls: {
        display: 'none',
        cursor: 'pointer',
        marginLeft: 'auto',
        '@media (min-width:600px)': {
            display: 'block'
        },
    },
    controlsMobile: {
        display: 'inline',
        cursor: 'pointer',
        marginLeft: 'auto',
        '@media (min-width:600px)': {
            display: 'none'
        }
    },
    title: {
        cursor: 'pointer',
        fontWeight: 'bold',
        '@media (max-width:600px)': {
            width: '100%'
        }
    },
    add: {
        order: 3,
        display: 'block',
        '@media (min-width:600px)': {
            order: 1
        }
    },
    part: {
        width: '100%',
        order: 2
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
                        <div className={classes.controlsMobile}>
                            <OptionsMenu
                                elementType='blocks'
                                element={blockData}
                                parent={blockData.showId}/>
                            {arrow}
                        </div>
                        <div className={classes.title}
                             onClick={() => clicked(blockData.id, 'block/details')}>
                            {blockData.title}
                        </div>
                    </div>
                    <div className={classes.controls}>
                        <OptionsMenu
                            elementType='blocks'
                            element={blockData}
                            parent={blockData.showId}/>
                        {arrow}
                    </div>
                </div>
                {(this.state.showChildren) ? (
                    <div className={classes.below}>
                        <span className={classes.spacer}></span>
                        <div className={classes.add}>
                            <Tooltip title='Add Part'>
                                <IconButton size="small" color="primary"
                                            className={classes.button}
                                            onClick={() => clicked(null, 'part/details', blockData.id)}
                                            aria-label="add">
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className={classes.part}>
                            <PartsList startTime={beginTime}
                                       parentId={blockData.id}
                                       clicked={clicked}
                                       running={running}/>
                        </div>
                    </div>
                ) : null
                }
            </>
        );
    };
}

export default withStyles(styles)(Block);