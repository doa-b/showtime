import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {convertArrayToObject, convertObjectstoArray, msToTime} from "../../../shared/utility";
import DisplayCrew from "../../../components/DisplayCrew/DisplayCrew";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PrivateNote from "../../../components/ui/PrivateNote/PrivateNote";
import {Tooltip} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import clsx from "clsx";
import Time from "../../../components/Time/Time";
import ProgressBar from "../../../components/ui/ProgressBar/ProgressBar";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
    root: {},
    part: {
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'row',
        padding: '0 5px 0',
    },
    startTime: {
        marginRight: 5
    },
    partDetails: {
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
    },
    head: {
        padding: '0 5px 0',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5
    },
    body: {
        padding: '0 5px 0',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5
    },
    time: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        verticalAlign: 'middle',
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    icon: {
        verticalAlign: 'middle',
        textAlign: 'center'
    },
    arrow: {
        marginLeft: 'auto',
        verticalAlign: 'middle',
        textAlign: 'center'
    },
    liveBorder: {
        border: '2px solid #000',
    },
    avatar: {
        margin: 'auto',
        alignItems: 'center',
        height: 19,
        width: 19
    },
    sceneLive: {
        border: '4px solid yellow',
    }

});
/**
 * Created by Doa on 15-2-2020.
 */
const InlinePartDetails = withStyles(styles)(
    ({classes, data, startTime, authUser, isRunning, runningTime = 0, blockDuration=0, category=null}) => {

        const [showDetails, setShowDetails] = useState(false);

        let textColor = (data.textColorBlack) ? '#000' : '#fff';

        let partDuration = 0;
        if (blockDuration) partDuration = blockDuration;
            else partDuration = (isRunning) ? data.duration - runningTime : data.duration;

        const progressBar = (isRunning)
            ? (
                <ProgressBar
                    full={data.duration}
                    timeLeft={partDuration}
                    height='6px'/>)
            : null;

        const files = (data.files) ? convertObjectstoArray(data.files) : [];

        const arrow = (showDetails) ? (
            <Tooltip title='hide details' placement='left-end'>
                <KeyboardArrowDownIcon onClick={() => setShowDetails(!showDetails)}/>
            </Tooltip>
        ) : (
            <Tooltip title='unfold details' placement='left-end'>
                <KeyboardArrowLeftIcon onClick={() => setShowDetails(!showDetails)}/>
            </Tooltip>
        );

        // TODO create rainbow border for live element

        const page = (showDetails)
            ? <div className={clsx(classes.partDetails,
                {[classes.liveBorder]: isRunning && !category},
                {[classes.sceneLive]: isRunning && category})}>
                <div className={classes.head}
                     style={{
                         backgroundColor: data.color,
                         color: textColor,
                     }}>
                    <div className={classes.time} onClick={() => setShowDetails(!showDetails)}>
                        <Time startTime={startTime}
                              duration={partDuration}
                              isLive={!!runningTime}/>
                       {arrow}
                    </div>
                    <span className={clsx( {[classes.title]: !blockDuration})}
                          onClick={() => setShowDetails(!showDetails)}>{data.title}</span>
                    {data.cue && <span>Cue: <i>{data.cue}</i></span>}
                    {progressBar}
                </div>
                <div className={classes.body}>
                    <div><DisplayCrew team={data.team}/></div>
                    {authUser && <PrivateNote small authUser={authUser} elementId={data.id}/>}
                    <span>{data.description}</span>
                    {files.map((file) => {
                        return (
                            <span key={file.id}>
                            <AttachFileIcon className={classes.icon}/>
                            <a href={file.url}>{file.name}</a>
                        </span>
                        )
                    })
                    }
                </div>
            </div>
            : (
                <>
                <div className={clsx(classes.part,
                    {[classes.liveBorder]: isRunning &&!category},
                    {[classes.sceneLive]: isRunning && category}
                    )}
                     style={{
                         backgroundColor: data.color,
                         color: textColor,
                     }}
                     onClick={() => setShowDetails(!showDetails)}>
                    {(!blockDuration)
                        ? (isRunning)
                            ? (<Time startTime={startTime}
                                 duration={partDuration}
                                 isLive={!!runningTime}/>)
                            : (<span className={classes.startTime}>
                    {msToTime(startTime, true)}
                </span>)
                    : null}
                    {category && <Avatar
                        className={classes.avatar}
                        alt='me'
                        src={authUser.imageUrl}/>}
                    <b>{data.title}</b>
                    <span className={classes.arrow}>{arrow}</span>
                </div>
                    </>

            );

        return page
    })
;

export default InlinePartDetails;