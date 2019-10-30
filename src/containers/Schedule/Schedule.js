import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom'

import classes from './Schedule.module.css'
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import BlocksList from "../Blocks/BlocksList";

/**
 * Created by Doa on 23-10-2019.
 */
class Schedule extends Component {

    // TODO maybe we need to add an updated flag to show reducer to let schedule auto re-render.
    //  Or else we use the loading flag

    componentDidMount() {
        this.props.onFetch('-Lrst6TmmyYrkouGmiac')
    }

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

// todo Remove duration from block and part and database. It is calculated on the fly

    render() {
        let total = <p>Loading...</p>;


        let blocksList = <p>Loading...</p>;

        if (this.props.blocks.length>0 && this.props.parts && this.props.scenes) {
            total =
                <div >
                    <BlocksList duration={20}
                    parentId={this.props.currentShow}/>
                </div>
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
                {total}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentShow: state.show.currentShow,
        blocks: state.show.blocks,
        parts: state.show.parts,
        scenes: state.show.scenes,
        loading: state.show.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onFetch: (showId) => dispatch(actions.fetch(showId))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
    (Schedule)