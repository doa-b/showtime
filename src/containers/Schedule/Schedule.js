import React, {Component} from 'react';

import classes from './Schedule.module.css'
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Block from '../../components/show/Block/Block';
import Part from '../../components/show/Block/Part/Part';
import Scene from '../../components/show/Block/Part/Scenes/Scene'
import {calculateDuration} from "../../shared/utility";
import PanToolIcon from '@material-ui/icons/PanTool';
import Scenes from '../Scenes/Scenes'

/**
 * Created by Doa on 23-10-2019.
 */
class Schedule extends Component {

    constructor(props) {
        super(props)
    }

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

    expandOrCollapseParts = () => {

    };

// todo Remove duration from block and part and database. It is calculated on the fly
    // Todo remove packege react-drag-listview
    render() {
        let blocksList = <p>Loading...</p>;
        let scenes = null;
        if (this.props.blocks.length>1 && this.props.parts && this.props.scenes) {
            let startTimeCounter = 0;
            blocksList = this.props.blocks.map((block) => {
                const parts = this.props.parts.filter(aPart => aPart.BlockId === block.id);
                return (
                    <div key={block.id}>
                        <div className={classes.Block}>
                            <Block
                                startTime={startTimeCounter}
                                duration={calculateDuration(parts)}
                                blockData={block}/>
                            {parts.map((part) => {
                                console.log(part);
                                const scenes=this.props.scenes
                                    // TODO add .filter(aScene => aScene.PartId === '-LrstBEWgr-XAFQeVpxz');
                                return (
                                    <div className={classes.Wrapper}>
                                        <span className={classes.Spacer}></span>
                                        <PanToolIcon/>
                                        <div className={classes.Inner}>
                                            <Part key={part.id}
                                                  startTime={startTimeCounter += part.duration}
                                                  partData={part}/>
                                            <Scenes scenes={scenes}
                                                    startTime={startTimeCounter}/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                );
            })
        }

        if (this.props.scenes.length > 1) {

        }
// todo put part and scene here, not as child of eachother. Else we cannot calculate start times with 3 nested maps

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
                {scenes}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentShow: state.show.currentShow,
        blocks: state.show.blocks,
        parts: state.show.parts,
        scenes: state.show.scenes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        onFetch: (showId) => dispatch(actions.fetch(showId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)