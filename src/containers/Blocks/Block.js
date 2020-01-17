import React, {Component} from 'react';
import Time from '../../components/Time/Time'
import PartsList from "../Parts/PartsList/PartsList";

import classes from './Block.module.css'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import OptionsMenu from "../../components/ui/OptionsMenu/OptionsMenu";
import {Tooltip} from "@material-ui/core";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import Attachement from "../../components/ui/Attachements/Attachement";


/**
 * Created by Doa on 23-10-2019.
 */
class Block extends Component {

    state = {
        showChildren: true,
        maxDuration: 0
    };

    toggleVisibilityHandler = () => {
        this.setState((prevState) => {
            return {showChildren: !prevState.showChildren};
        });
    };

    render() {
        let startTime = this.props.startTime - this.props.duration;
        let textColor = (this.props.blockData.textColorBlack) ? '#000' : '#fff';
        let parts = null;
        let arrow = <Tooltip title='unfold details' placement='left-end'>
            <KeyboardArrowLeftIcon onClick={this.toggleVisibilityHandler}/>
        </Tooltip>;

        if (this.state.showChildren) {
            parts = <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <Tooltip title='Add Part'>
                    <IconButton size="small" color="primary"
                                className={classes.button}
                                onClick={() => this.props.clicked(null, 'part/details', this.props.blockData.id)}
                                aria-label="add">
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
                <PartsList startTime={startTime}
                           parentId={this.props.blockData.id}
                           clicked={this.props.clicked}
                           running={this.props.running}/>
            </div>
            arrow = <Tooltip title='hide details' placement='left-end'>
                <KeyboardArrowDownIcon onClick={this.toggleVisibilityHandler}/>
            </Tooltip>
        }


        return (
            <div className={classes.Wrapper}>
                <div className={classes.Empty}>
                    <div className={classes.Block}
                         style={{
                             background: this.props.blockData.color,
                             color: textColor,
                         }}>
                        {this.props.children}
                        <Time startTime={startTime}
                              duration={this.props.duration}
                              isLive={!!this.props.running}/>
                        <div className={classes.Title}
                             onClick={() => this.props.clicked(this.props.blockData.id, 'block/details')}>
                            {this.props.blockData.title}
                            {(this.props.running) ? '  running' : null}
                            <Attachement elementData={this.props.blockData}/>
                        </div>
                        <div className={classes.Controls}>
                            <OptionsMenu
                                elementType='blocks'
                                element={this.props.blockData}
                                parent={this.props.blockData.showId}/>
                            {arrow}
                        </div>
                    </div>
                </div>
                {parts}
            </div>
        );
    };
}

export default Block;