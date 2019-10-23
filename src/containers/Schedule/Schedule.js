import React, {Component} from 'react';

import classes from './Schedule.module.css'
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Block from "../../components/show/Block/Block";

/**
 * Created by Doa on 23-10-2019.
 */
class Schedule extends Component {

    saveDummyShowHandler = () => {
        const show = {
            name: 'Trinity International Trend Day',
            location: 'Beursgebouw Zwitserland',
            date: '12-1-2019'
        };
        this.props.onSave('shows', show);
    };

    saveDummyBlocksHandler = () => {
        for (let i = 1; i < 4; i++) {
            let block = {
                showId: this.props.currentShow,
                order: i,
                title: `this is Trinity block ${i}`,
                starttime: 0,
                duration: i * 10
            };
            this.props.onSave('blocks', block);
        }
        let block = {
            showId: this.props.currentShow,
            order: 0,
            title: `this is Trinity block ${0}`,
            starttime: 0,
            duration: 5
        };
        this.props.onSave('blocks', block);

    };
    saveDummyScenesHandler = () => {
        for (let i = 1; i < 4; i++) {
            let scene = {
                showId: this.props.currentShow,
                partId: 1,
                order: i,
                title: `this is Scene ${i}`,
                starttime: 0,
                duration: 1
            };
            this.props.onSave('scenes', scene);
        }
    };

    saveDummyPartsHandler = () => {
        for (let i = 1; i < 4; i++) {
            let part = {
                showId: this.props.currentShow,
                BlockId: 1,
                order: i,
                title: `this is part ${i}`,
                starttime: 0,
                duration: 1
            };
            this.props.onSave('parts', part);
        }
    };

    loadShowDataHandler = (showId) => {
        this.props.onFetch('-Lrst6TmmyYrkouGmiac')

    };

    render() {
        let blocksList = null;
        if (this.props.blocks) {
            blocksList = this.props.blocks.map((block) => (

                <Block key={block.id}
                       blockData={block}
                       parts={this.props.parts}/>
            ))
        }

        return (
            <>
                <h1>Schedule</h1>
                <button onClick={this.saveDummyShowHandler}>
                    Save a Dummy Show to Firebase
                </button>
                <button onClick={this.saveDummyBlocksHandler}>
                    Save Dummy Blocks to Firebase
                </button>
                <button onClick={this.saveDummyPartsHandler}>
                    Save Dummy Parts to Firebase
                </button>
                <button onClick={this.saveDummyScenesHandler}>
                    Save Dummy Scenes to Firebase
                </button>

                <button onClick={this.loadShowDataHandler}>
                    Fetch all showdata
                </button>
                {blocksList}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentShow: state.show.currentShow,
        blocks: state.show.blocks,
        parts: state.show.parts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onFetch: (showId) => dispatch(actions.fetch(showId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)