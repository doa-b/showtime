import React, {Component} from 'react';
import StartTime from '../../StartTime/StartTime'
import Duration from '../../Duration/Duration'
import PartsList from "../../../containers/Parts/PartsList";

import classes from './Block.module.css'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';


/**
 * Created by Doa on 23-10-2019.
 */
class Block extends Component {

    state = {
        showChildren: true
    };

    toggleVisibilityHandler = () => {
        console.log('çlicked');
        this.setState((prevState) => {
            return {showChildren: !prevState.showChildren};
        });
    };

    render() {
        let startTime = this.props.startTime - this.props.duration;
        let parts = null;
        let arrow = <KeyboardArrowLeftIcon className={classes.Arrow}
                                           onClick={this.toggleVisibilityHandler}/>;

        if (this.state.showChildren) {
            parts = <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <PartsList startTime={startTime}
                           parentId={this.props.blockData.id}/>
            </div>
            arrow = <KeyboardArrowDownIcon className={classes.Arrow}
                                           onClick={this.toggleVisibilityHandler}/>
        }

        return (
            <div className={classes.Wrapper}>
                <div className={classes.Block}>
                    {this.props.children}
                    <StartTime startTime={startTime}/>
                    <Duration duration={this.props.duration}/>
                    <div className={classes.Title}>{this.props.blockData.title}</div>
                    {arrow}
                </div>
                {parts}
            </div>
        );
    };
}

export default Block;