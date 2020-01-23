import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import {compose} from "redux";
import {convertObjectstoArray, msToTime} from "../../shared/utility";
import Avatar from "@material-ui/core/Avatar";
import Spinner from "../../components/ui/Spinner/Spinner";

const styles = () => ({
    root: {
        width: '100vw',
    },
    block: {
        background: 'blue',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: 5,
    },
    startTime: {
        marginRight: 5
    },
    sceneStartTime: {
        marginRight: 5,
        marginLeft: 5
    },
    part: {
        background: '#eee',
        border: '1px solid #ccc',
        padding: '0 5px 0',
    },
    scene: {
        display: 'flex',
        boxSizing: 'border-box',
        fleDirection: 'row',
        justifyContent: 'flex-start',
        AlignItems: 'baseline',
        flexWrap: 'wrap',
        width: 'fit-content',
        marginLeft: 'auto',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: '0 5px 0 5px',
    },
    end: {
        color: 'white',
        background: 'blue',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 2px #ccc',
        padding: 5
    },
    avatar: {
        margin: 'auto',
        height: 15,
        width: 15
    },
    cue: {
        marginLeft: 2,
        color: 'grey'
    }
});

/**
 * Created by Doa on 28-11-2019.
 */
class mobileView extends Component {

    state = {
        currentUser: 'id12',
        showOnlyMe: true
    };

    componentDidMount() {
        if (this.props.shows.length === 0) {
            this.props.onFetch(this.props.currentShow);
        }
    }


    render() {
        const {classes, blocks, parts, scenes, loading, showStartDateTime} = this.props;

        let startTimeCounter = showStartDateTime;
        let page = <Spinner/>
        let sceneCounter = 0;

        if (!loading) {
            page = (
                <div className={classes.root}>
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
                                                let style = {};
                                                let cue = null;
                                                if (mustShow) {
                                                    sceneCounter += 1;
                                                    if (sceneCounter === 2) {
                                                        cue = <i className={classes.cue}>{scene.cue}</i>

                                                    }
                                                } else style = {display: 'none'};
                                                style = (mustShow) ? {} : {display: 'none'};
                                                console.log(style);
                                                return (
                                                    <div key={index} className={classes.scene}
                                                         style={style}>
                                                        <Avatar
                                                            className={classes.avatar}
                                                            alt='me'
                                                            src='http://djdoa.nl/DJDoa_WebPages/__Old_Website/doa_avatar_small.jpg'/>
                                                        {cue}
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
        onFetch: (showId) => dispatch(actions.fetch(showId))
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(mobileView);