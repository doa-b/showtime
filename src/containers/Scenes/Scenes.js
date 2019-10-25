import React, {Component} from 'react';

import Scene from '../../components/show/Block/Part/Scenes/Scene'
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

const DragHandle = sortableHandle(() => <DragIndicatorIcon/>);

const SortableContainer = sortableContainer(({children}) => {
    return <ul>{children}</ul>;
});

class Scenes extends Component {
    constructor(props) {
        super(props);
        console.log('the scene props');
        console.log(props);
        this.state =
            {
                items: this.props.scenes,

            };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            console.log('THE ORDER HAS CHANGED')
            this.props.onUpdate(this.props.showId, this.state.items, 'scenes');
        }
    }

    SortableItem = sortableElement(({value}) =>

        <Scene
            children={<DragHandle/>}
            sceneData={value}
            startTime={this.props.startTime}
        />);

    SortableList = sortableContainer(({items}) => {
        return (
            <ul>
                {items.map((value, index) =>
                    <this.SortableItem key={value.id} index={index} value={value}/>
                )}
            </ul>
        );
    });

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        return (
            <ul>
                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                    {this.state.items.map((value, index) => (
                        <this.SortableItem key={value.id} index={index} value={value}/>
                    ))}
                </SortableContainer>
            </ul>
        )
        // return <this.SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle/>;
    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (showId, data, elementName) => dispatch(actions.updateOrder(showId, data, elementName))
    }
};

// todo alternative render method: https://github.com/clauderic/react-sortable-hoc/blob/master/examples/drag-handle.js
// todo scroll down https://github.com/clauderic/react-sortable-hoc to see how to pass down props

export default connect(mapStateToProps, mapDispatchToProps)(Scenes);