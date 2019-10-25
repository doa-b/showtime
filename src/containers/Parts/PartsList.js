import React, {Component} from 'react';

import Part from '../../components/show/Block/Part/Part'
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

class PartsList extends Component {
    constructor(props) {
        super(props);
        console.log('the parts props');
        console.log(props);
        this.state =
            {
                items: this.props.parts.filter(aPart => aPart.BlockId === this.props.parentId),
                visible: true
            };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            console.log('THE ORDER HAS CHANGED');
            this.props.onUpdate(this.props.showId, this.state.items, 'parts');
        }
    }

    toggleVisibilityHandler = () => {

    }

    SortableItem = sortableElement(({value, startTime}) =>

        <Part
            children={<DragHandle/>}
            partData={value}
            startTime={startTime}
            parentId={value.id}
        />);

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        let startTimeCounter = this.props.startTime;
        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {this.state.items.map((value, index) => (
                    <this.SortableItem
                        key={value.id}
                        index={index}
                        value={value}
                        startTime={startTimeCounter += value.duration}
                    clicked={this.toggleVisibilityHandler}/>

                ))}
            </SortableContainer>
        )
        // return <this.SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle/>;
    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
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

export default connect(mapStateToProps, mapDispatchToProps)(PartsList);