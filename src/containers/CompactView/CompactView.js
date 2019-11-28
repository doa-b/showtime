import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import {compose} from "redux";
import {convertObjectstoArray, msToTime } from "../../shared/utility";
import Avatar from "@material-ui/core/Avatar";

const styles = () => ({
    root: {},
    block: {
        background: 'blue',
        width: '100%',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: 5
    },
    startTime: {
        marginRight: 5
    },
    sceneStartTime: {
        marginRight: 5,
        marginLeft: 5
    },
    part: {
        width: '100%',
        background: '#eee',
        border: '1px solid #ccc',
        padding: '0 5px 0',
        margin: '4px 5px 0 5px',
    },
    scene: {
        display: 'flex',
        fleDirection: 'row',
        justifyContent: 'flex-start',
        AlignItems: 'baseline',
        flexWrap: 'wrap',
        width: 'fit-content',
        marginLeft: 'auto',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: '0 5px 0 5px',
        margin: '1px 5px 1px 5px',
    },
    end: {
        color: 'white',
        background: 'blue',
        width: '100%',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: 5
    },
    avatar: {
        margin: 'auto',
        height: 15,
        width: 15
    }
});

/**
 * Created by Doa on 28-11-2019.
 */
class compactView extends Component {

    state = {
        currentUser: 'id12',
        showOnlyMe: true
    };

    componentDidMount() {
        if (this.props.shows.length === 0) {
            this.props.onFetch(this.props.currentShow);
        }
        this.props.onSetPageTitle('Compact');
    }


    render() {
        const {classes, blocks, parts, scenes, loading, showStartDateTime} = this.props;

        let startTimeCounter = showStartDateTime;
        let page = <h2>Loading...</h2>;

        if (!loading) {
            page = (
                <div className={classes.page}>
                    {blocks.map((block, index) => {
                        const textColor = (block.textColorBlack) ? '#000' : '#fff';
                        const partsArray = parts.filter((part) => part.blockId === block.id);
                        return (
                            <div key={index} className={classes.root}>
                                <div className={classes.block}
                                     style={{
                                         background: block.color,
                                         color: textColor,
                                     }}>
                                    {block.title}
                                </div>
                                {partsArray.map((part, index) => {
                                    let scenesArray = scenes.filter((scene) => scene.partId === part.id);
                                    return (
                                        <div key={index}>
                                            <div className={classes.part}>
                                                <span className={classes.startTime}>
                                                    {msToTime(-part.duration + (startTimeCounter += part.duration), true)}
                                                </span>
                                                <b>{part.title}</b>
                                            </div>
                                            {scenesArray.map((scene, index) => {
                                                const team = convertObjectstoArray(scene.team);
                                                const mustShow = team.filter((actor) => actor.firstName === 'Doa').length > 0;
                                                const style = (mustShow) ? {} : {display: 'none'};
                                                console.log(style);
                                                return (
                                                    <div key={index} className={classes.scene}
                                                         style={style}>
                                                        <Avatar
                                                            className={classes.avatar}
                                                            alt='me'
                                                            src='https://image.tmdb.org/t/p/original/i5kxTQ9GSGKY6CaI8F3cdwoF3KD.jpg'/>
                                                        <span className={classes.sceneStartTime}>
                                                              {msToTime(scene.startTime, true, false)}
                                                         </span>
                                                        {scene.title}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })
                                }
                            </div>)

                    })
                    }
                    <div className={classes.end}>
                        {'End of Show:  ' + msToTime(startTimeCounter)}
                    </div>
                </div>)
        }
        return page
    }
}

const mapStateToProps = (state) => {
    return {
        shows: state.show.shows,
        blocks: state.show.blocks,
        parts: state.show.parts,
        scenes: state.show.scenes,
        loading: state.show.loading,
        showStartDateTime: state.show.showStartDateTime
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (showId) => dispatch(actions.fetch(showId)),
        onSetPageTitle: (title) => dispatch(actions.setPageTitle(title))
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(compactView);