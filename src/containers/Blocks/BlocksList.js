import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'

import Block from './Block'
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

import classes from './BlocksList.module.css';
import {calculateDuration} from "../../shared/utility";

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
        console.log('the block props');
        console.log(props);
        this.state =
            {
                items: this.props.blocks.filter(aBlock => aBlock.showId === this.props.parentId)
            };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            console.log('THE ORDER HAS CHANGED');
            this.props.onUpdate(this.props.showId, this.state.items, 'blocks');
        }
    }

    SortableItem = sortableElement(({value, startTime, duration,}) =>
        <Block
            children={<DragHandle/>}
            blockData={value}
            startTime={startTime}
            duration={duration}
            parentId={value.id}
            history={this.props.history}
        />);

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        let startTimeCounter = 0;
        let duration = 0;
        return (
            <div className={classes.BlocksList}>
                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                    {this.state.items.map((value, index) => {
                        duration = calculateDuration(this.props.parts.filter(
                            (part) => part.BlockId === value.id));
                        return (
                            <this.SortableItem
                                key={value.id}
                                index={index}
                                value={value}
                                duration={duration}
                                startTime={startTimeCounter += duration}
                            />

                        )
                    })}
                </SortableContainer>
                <Button
                    component={Link} to={"/block/details"}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                >
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
        parts: state.show.parts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (showId, data, elementName) => dispatch(actions.updateOrder(showId, data, elementName))
    }
};

// todo alternative render method: https://github.com/clauderic/react-sortable-hoc/blob/master/examples/drag-handle.js
// todo scroll down https://github.com/clauderic/react-sortable-hoc to see how to pass down props

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(BlocksList);