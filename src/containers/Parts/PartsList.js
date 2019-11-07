import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import Part from './Part'
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

import classes from './PartsList.module.css'

const DragHandle = sortableHandle(() => <DragIndicatorIcon/>);

const SortableContainer = sortableContainer(({children}) => {
    return <div className={classes.Inner}>{children}</div>;
});

const SortableItem = sortableElement(({value, startTime, clicked, runningTime}) => {
    let duration = value.duration;
    if (value.status === 'running') {
      //  TODO hier kun je nu dingen doen
    }
    return (
    <Part
        children={<DragHandle/>}
        partData={value}
        startTime={startTime}
        parentId={value.id}
        runningTime={runningTime}
        clicked={clicked}
    />)})

class PartsList extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                items: this.props.parts.filter(aPart => aPart.BlockId === this.props.parentId),
            };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items) {
            console.log('THE ORDER HAS CHANGED');
            this.props.onUpdate(this.props.showId, this.state.items, 'parts');
        }
    }

    toggleVisibilityHandler = () => {
        console.log('clicked');
        this.setState((prevState) => {
            return {hidden: !prevState.visible};
        });
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        let startTimeCounter = this.props.startTime;
        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {this.state.items.map((value, index) => {
                    let item = null;
                    if (!this.props.running) {
                    item = (<SortableItem
                            key={value.id}
                            index={index}
                            value={value}
                            startTime={startTimeCounter += value.duration}
                            clicked={this.props.clicked}/>
                    )} else {
                        if (index > this.props.runningPartNumber) {
                            item = (<SortableItem
                                    key={value.id}
                                    index={index}
                                    value={value}
                                    startTime={-this.props.runningTime + (startTimeCounter += value.duration)}
                                    clicked={this.props.clicked}/>
                            )
                        }
                        if (index === this.props.runningPartNumber) {
                            item = (<SortableItem
                                    key={value.id}
                                    index={index}
                                    value={value}
                                    startTime={-this.props.runningTime + (startTimeCounter += value.duration)}
                                    runningTime={this.props.runningTime}
                                    clicked={this.props.clicked}/>
                            )
                        }}
                        return item
                   })}
            </SortableContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
        parts: state.show.parts,
        runningPartNumber: state.live.runningPartNumber,
        runningTime: state.live.runningPartDuration
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (showId, data, elementName) => dispatch(actions.updateOrder(showId, data, elementName))
    }
};

// todo alternative render method: https://github.com/clauderic/react-sortable-hoc/blob/master/examples/drag-handle.js
// todo scroll down https://github.com/clauderic/react-sortable-hoc to see how to pass down props

export default connect(mapStateToProps, mapDispatchToProps)(PartsList);

