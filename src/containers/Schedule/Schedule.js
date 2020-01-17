import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom'
import {withAuthorization} from '../../hoc/Session';
import {withFirebase} from "../../firebase";

import * as actions from "../../store/actions";
import {connect} from "react-redux";
import BlocksList from "../Blocks/BlocksList/BlocksList";
import Spinner from '../../components/ui/Spinner/Spinner'
import {msToDate, msToTime, updateObject} from "../../shared/utility";
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import MusicUploadButton from "../../components/FileUpload/can_be_removed/MusicUploadButton";
import ImageUpload from "../../components/FileUpload/FileUpload";

import ShowControls from "../../components/ShowControls/ShowControls";
import PrivateNote from "../../components/ui/PrivateNote/PrivateNote";

const styles = theme => ({
        root: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        dateTime: {
            width: '100%',
        }
    })
;

/**
 * Created by Doa on 23-10-2019.
 */
class Schedule extends Component {

    componentDidMount() {
        this.props.onFetch(this.props.currentShow);
        // if (this.props.currentTime === 0) {
        //     this.props.onStartClock();
        // }
    }

    /**
     * pushes to a new route
     * @param elementId
     * @param pathName
     * @param parentId
     */
    showDetailsHandler = (elementId, pathName, parentId) => {
        if (elementId) {
            this.props.history.push({
                pathname: pathName,
                state: {
                    elementId: elementId
                }
            })
        } else {
            this.props.history.push({
                pathname: pathName,
                state: {
                    parentId: parentId
                }
            })
        }
    };

    render() {
        const {classes, showHasFinished, shows, currentShow, showStartDateTime, isLive,
            onFetch, onStartCLock, firebase, loading, onResetTheShow} = this.props;
        let page = <Spinner/>
        let head = null;

        if (showHasFinished) {
            page =
                <>
                    <h2>Show has ended</h2>
                    <button onClick={() => onResetTheShow(firebase)}>
                        Reset the show
                    </button>
                </>

        } else if (shows.length > 0 && !loading) {
            const show = shows.filter((show) => show.id === currentShow)[0];

            if (!isLive) {
                head = (
                    <>
                        <Typography variant='h2' component='h1'>
                            {show.title}
                        </Typography>

                        <div className={classes.dateTime}>
                            <Typography variant='h6'>
                                {msToDate(showStartDateTime)}
                            </Typography>
                            <Typography variant='h6'>
                                {msToTime(showStartDateTime)}
                            </Typography>
                        </div>
                    </>
                );
            }

            page = (
                <>
                    <div className={classes.root}>
                        {head}
                        <ShowControls/>


                    </div>
                    <BlocksList
                        parentId={currentShow}
                        clicked={this.showDetailsHandler}
                    />
                </>
                )
        }

        return page
    }
}

const mapStateToProps = (state) => {
    return {
        showHasFinished: state.live.showHasFinished,
        shows: state.show.shows,
        currentShow: state.show.currentShow,
        showStartDateTime: state.show.showStartDateTime,
        loading: state.show.loading,
        isLive: state.live.isLive,
        currentTime: state.global.currentTime
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (showId) => dispatch(actions.fetch(showId)),
        onStartClock: () => dispatch(actions.startClock()),
        onResetTheShow: (firebase) => dispatch(actions.resetTheShow(firebase))
    }
};

// checks if user is authenticated to access this page (broad-grained authorization)
const condition = authUser => !!authUser;

/* @component */
export default compose(
    withFirebase,
    withAuthorization(condition),
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Schedule)