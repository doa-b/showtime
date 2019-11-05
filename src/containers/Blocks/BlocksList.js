import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'

import Block from './Block'
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import classes from './BlocksList.module.css';


import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {compose} from "redux";


const DragHandle = sortableHandle(() => <DragIndicatorIcon/>);

const SortableContainer = sortableContainer(({children}) => {
    return <div className={classes.Inner}>{children}</div>;
});

class BlocksList extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                items: this.props.blocks.filter(aBlock => aBlock.showId === this.props.parentId)
            };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onUpdate(this.props.showId, this.state.items, 'blocks');
        }
    }

    SortableItem = sortableElement(({value, startTime, duration, running}) =>
        <Block
            children={<DragHandle/>}
            blockData={value}
            startTime={startTime}
            duration={duration}
            parentId={value.id}
            clicked={this.props.clicked}
            running={running}
        />);

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    calculateDuration = (parts, parentIndex) => {
        let duration = 0;
        parts.map((part, index) => {
           if (parentIndex === this.props.currentBlockNumber) {
               if (index > this.props.currentPartNumber) duration += part.duration;
               if (index === this.props.currentPartNumber) duration += (part.duration - this.props.runningPartDuration);
           } else
               duration += part.duration
        });
        return duration;
    };

    render() {

        let startTimeCounter = 0;
        if (this.props.showRealTime) {
            if (this.props.isLive) {
                startTimeCounter = this.props.currentTime
            } else if (this.props.showStartDateTime < this.props.currentTime)
                startTimeCounter = this.props.showStartDateTime;
        }
        let duration = 0;
        return (
            <div className={classes.BlocksList}>
                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                    {this.state.items.map((value, index) => {
                        duration = this.calculateDuration(this.props.parts.filter(
                            (part) => part.BlockId === value.id), index);
                        return (
                            <this.SortableItem
                                key={value.id}
                                index={index}
                                value={value}
                                duration={duration}
                                running={(index === this.props.currentBlockNumber)}
                                startTime={startTimeCounter += duration}
                            />
                        )
                    })}
                </SortableContainer>
                <Button
                    onClick={() => this.props.clicked(null, 'block/details', this.props.showId)}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}>
                    Add Block
                </Button>
            </div>
        )
        // return <this.SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle/>;
    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
        blocks: state.show.blocks,
        parts: state.show.parts,
        showRealTime: state.show.showRealTime,
        currentTime: state.show.currentTime,
        showStartDateTime: state.show.showStartDateTime,
        runningPartDuration: state.show.runningPartDuration,
        currentPartNumber: state.live.currentPartNumber,
        currentBlockNumber: state.live.currentPartNumber,
        isLive: state.live.isLive

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (showId, data, elementName) => dispatch(actions.updateOrder(showId, data, elementName))
    }
};

// todo alternative render method: https://github.com/clauderic/react-sortable-hoc/blob/master/examples/drag-handle.js
// todo scroll down https://github.com/clauderic/react-sortable-hoc to see how to pass down props

export default connect(mapStateToProps, mapDispatchToProps)(BlocksList);