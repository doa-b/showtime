import React, {Component} from 'react';
import StartTime from '../../components/StartTime/StartTime'
import Duration from '../../components/Duration/Duration'
import Time from '../../components/Time/Time'
import PartsList from "../Parts/PartsList";

import classes from './Block.module.css'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


/**
 * Created by Doa on 23-10-2019.
 */
class Block extends Component {

    state = {
        showChildren: true
    };

    toggleVisibilityHandler = () => {
        this.setState((prevState) => {
            return {showChildren: !prevState.showChildren};
        });
    };

    showDetailsHandler = () => {
        this.props.history.push({
            pathname: 'block/details',
            state: {
                id: this.props.blockData.id
            }
        })
    };

    render() {
        let startTime = this.props.startTime - this.props.duration;
        let textColor = (this.props.blockData.textColorBlack) ? '#000' : '#fff';
        let parts = null;
        let arrow = <KeyboardArrowLeftIcon onClick={this.toggleVisibilityHandler}/>;

        if (this.state.showChildren) {
            parts = <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <IconButton size="small" color="primary"
                            className={classes.button}
                            onClick={() => this.props.clicked(null, 'block/details', null, this.props.blockData.id)}
                            aria-label="add">
                    <AddIcon/>
                </IconButton>
                <PartsList startTime={startTime}
                           parentId={this.props.blockData.id}
                           clicked={this.props.clicked}
                            running={this.props.running}/>
            </div>
            arrow = <KeyboardArrowDownIcon onClick={this.toggleVisibilityHandler}/>
        }


        return (
            <div className={classes.Wrapper}>
                <div className={classes.Block}
                     style={{
                         background: this.props.blockData.color,
                         color: textColor
                     }}>
                    {this.props.children}
                    <Time startTime={startTime}
                          duration={this.props.duration}/>
                    <div className={classes.Title}
                         onClick={() => this.props.clicked(this.props.blockData.id, 'block/details')}>
                        {this.props.blockData.title}
                        {(this.props.running)? '  running' : null}</div>
                    <div className={classes.Controls}>
                        {arrow}
                    </div>
                </div>
                {parts}
            </div>
        );
    };
}

export default Block;