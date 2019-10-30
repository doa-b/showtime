import React, {Component} from 'react';
import StartTime from '../../components/StartTime/StartTime'
import Duration from '../../components/Duration/Duration'
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
        console.log('çlicked');
        this.setState((prevState) => {
            return {showChildren: !prevState.showChildren};
        });
    };

    showDetailsHandler = () => {

        // TODO Check with BrowserRouter for this
        this.props.history.push({
            pathname: 'block/details',
            state: {
                id: this.props.blockData.id
            }
        })
    };

    render() {
        console.log('block ' + this.props.blockData.id);
        console.log(this.props)
        let startTime = this.props.startTime - this.props.duration;
        let textColor = (this.props.blockData.textColorBlack) ? '#000' : '#fff';
        let parts = null;
        let arrow = <KeyboardArrowLeftIcon onClick={this.toggleVisibilityHandler}/>;

        if (this.state.showChildren) {
            parts = <div className={classes.Below}>
                <span className={classes.Spacer}></span>
                <IconButton size="small" color="primary"
                            className={classes.button}
                            aria-label="add">
                    <AddIcon/>
                </IconButton>
                <PartsList startTime={startTime}
                           parentId={this.props.blockData.id}/>
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
                    <StartTime startTime={startTime}/>
                    <Duration duration={this.props.duration}/>
                    <div className={classes.Title}
                         onClick={this.showDetailsHandler}>
                        {this.props.blockData.title}</div>
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