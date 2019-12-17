import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import Scene from '../../components/Scenes/Scene'
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {compose} from "redux";

const DragHandle = sortableHandle(() => <DragIndicatorIcon/>);

const SortableContainer = sortableContainer(({children}) => {
    return <div>{children}</div>;
});

class ScenesList extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                items: this.props.scenes.filter(aScene => aScene.partId === this.props.parentId),
            };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items) {
            this.props.onUpdate(this.props.showId, this.state.items, 'scenes');
        }
    }

    optionsClicked = () => {


    };

    SortableItem = sortableElement(({value}) =>

        <Scene
            children={<DragHandle/>}
            sceneData={value}
            startTime={this.props.startTime}
            detailClicked={this.props.clicked}
            isRunning={this.props.isRunning}
        />);

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {this.state.items.map((value, index) => (
                    <this.SortableItem key={index} index={index} value={value}/>
                ))}
            </SortableContainer>

        )
        // return <this.SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle/>;
    }
}

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
        scenes: state.show.scenes,
        currentTime: state.global.currentTime
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
    connect(mapStateToProps, mapDispatchToProps))
(ScenesList);