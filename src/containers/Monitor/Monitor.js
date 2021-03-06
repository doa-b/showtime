import React from 'react';
import {Textfit} from 'react-textfit';
import {connect} from "react-redux";
import {convertObjectstoArray, msToTime} from "../../shared/utility";
import {withStyles} from "@material-ui/core";

import ScaleText from "react-scale-text";
import clsx from "clsx";

const styles = () => ({
    fullWidthText: {
        width: '100%',
        fontSize: '25.5vw',
        padding: 0,
        marginTop: '-8vw',
        marginBottom: '-4vw'
    },
    fullWidthTime: {
        lineHeight: .9,
        width: '100%',
        fontSize: '25.5vw',
        padding: 0,
    },
    pauseColor: {
        opacity: 0,
        transition: 'opacity .99s ease-in-out'
    },
    currentPartSC: {
        overflowX: 'hidden',
        maxHeight: '40vh',
        width: '100%',
        lineHeight: .9,
        background: '#09d3ac',
        paddingBottom: '1vh 0'
    },
    currentPart: {
        width: '100%',
        height: 'auto',
        lineHeight: 1,
        background: '#09d3ac',
        paddingBottom: '1vh'
    },
    nextCue: {
        lineHeight: 1,
        width: '100%',
        background: '#eeee',
        paddingBottom: '1vh',
        fontStyle: 'italic'
    },
    nextPart: {
        width: '100%',
        height: 'auto',
        lineHeight: 1,
        paddingBottom: '1vh',
        background: '#09d3ac'
    },
    followingPartSC: {
        overflowX: 'hidden',
        maxHeight: '40vh',
        width: '100%',
        lineHeight: .9,
        background: '#cccccc',
        paddingBottom: '1vh',
    },
    followingPart: {
        width: '100%',
        height: 'auto',
        lineHeight: 1,
        paddingBottom: '2vh',
        background: '#cccccc',
    },
    root: {
        textAlign: 'center',
    },
    name: {
        width: '100%',
        height: 'auto',
        lineHeight: 1,
        background: '#09d3ac',
        paddingBottom: '1vh'
    },
    textMessage: {
        overflowX: 'hidden',
        lineHeight: .9,
        height: '67vh',
        width: '100%'
    },
    alert: {
        color: 'red'
    },
    separator: {
        width: '100%',
        height: 13,
        borderBottom: '1px solid black',
        textAlign: 'center',
        marginBottom: 10
    },
    separatorText: {
        fontWeight: 'bold',
        fontSize: 15,
        background: 'white',
        padding: '0 5px',
    }
});

/**
 * Created by Doa on 14-11-2019.
 */
const Monitor = withStyles(styles)(
    ({
         classes, nextPartTitle, nextPartDuration, followingPartCue, followingPartTitle,
         isLive, showHasFinished, currentTime, message, runningPartDuration, isPaused
     }) => {

        const isOdd = () => {
            const test = Math.round(currentTime / 1000);
            return test % 2;
        };

        const timeLeft = nextPartDuration - runningPartDuration;
        let time = (timeLeft >= 0)
            ? (isPaused)
                ? <span className={clsx({
                    [classes.pauseColor]: !isOdd()
                })}>{msToTime(timeLeft, true)}</span>
                : msToTime(timeLeft, true)
            : <span className={clsx({
                [classes.alert]: isOdd()
            })}>TIME UP</span>;

        let body = (
            <div className={classes.currentPart}>
                <Textfit className={classes.nextPart} mode='single'>
                    show will start soon
                </Textfit>
            </div>
        );

        // for multiline tekst use ScaleText
        //  <div className={classes.currentPartSC}>
        //                     <ScaleText >
        //                         {currentPartTitle}
        //                     </ScaleText>
        //                 </div>
        if (isLive) {
            body = (
                <>
                    <div className={classes.currentPart}>
                        <Textfit className={classes.nextPart} mode='single'>
                            {nextPartTitle}
                        </Textfit>
                    </div>
                    <div className={classes.fullWidthText}>
                        {time}
                    </div>
                    <div className={classes.separator}>
                        <span className={classes.separatorText}>Next up</span>
                    </div>
                    <Textfit className={classes.nextCue} mode='single'>
                        {followingPartCue}
                    </Textfit>
                    {(followingPartTitle) ? (
                        <Textfit className={classes.followingPart} mode='single'>
                            {followingPartTitle}
                        </Textfit>
                        //
                        //     <div className={classes.followingPartSC}>
                        //     <ScaleText>
                        //         {followingPartTitle}
                        //     </ScaleText>
                        // </div>
                    ) : null}

                </>)
        }
        if (showHasFinished) {
            body = (
                <ScaleText>
                    Show has finished
                </ScaleText>
            )
        }

        if (message) {
            let name = '';
            convertObjectstoArray(message.team).map(member => (
                    name = name + ' ' + member.firstName
                )
            );
            body =
                (<>
                        <Textfit
                            mode='single'
                            className={clsx({
                                [classes.name]: true, [classes.alert]: isOdd()
                            })}>
                            {name}
                        </Textfit>
                        <div className={clsx({
                            [classes.textMessage]: true, [classes.alert]: !isOdd()
                        })}>
                            <ScaleText>
                                {message.message}
                            </ScaleText>
                        </div>
                        <Textfit className={classes.fullWidthTime} mode={'single'}>
                            {time}
                        </Textfit>
                    </>
                )
        }
        return (
            <div className={classes.root}>
                {body}
            </div>)
    });

const mapStateToProps = (state) => {
    return {
        currentTime: state.global.currentTime,
        isLive: state.live.isLive,
        isPaused: state.live.isPaused,
        nextPartTitle: state.live.nextPartTitle,
        nextPartDuration: state.live.nextPartDuration,
        followingPartCue: state.live.followingPartCue,
        followingPartTitle: state.live.followingPartTitle,
        showHasFinished: state.live.showHasFinished,
        runningPartDuration: state.live.runningPartDuration,
        message: state.live.monitorMessage
    }
};

export default connect(mapStateToProps, null)(Monitor)

