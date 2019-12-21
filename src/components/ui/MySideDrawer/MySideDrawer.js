import React from "react";
import {Route, NavLink, Switch} from "react-router-dom";
import clsx from "clsx";
import * as ROUTES from '../../../shared/routes';
import { AuthUserContext } from '../../../hoc/Session'

import {Checkbox, withStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import TuneIcon from '@material-ui/icons/Tune';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    },
    activeListItem: {
        color: theme.palette.primary.main
    },
    checkBox: {
        marginLeft: 0
    },
    avatar: {
        margin: 10,
        width: 150,
    },
    nonAuth: {
        textAlign: 'center',
        maxWidth: 150
    }
});

const MySideDrawer = withStyles(styles)(
    ({
         classes, variant, open, onClose, onItemClick,
         showSeconds, toggleShowSeconds, displayRealTime, toggleDisplayRealTime,
         isEditable, toggleIsEditable, isAuth
     }) => {

        const SideDrawerNonAuth = () => (
            <List>
                <Typography className={classes.nonAuth} variant='subtitle1' >
                   This App needs authentication
                </Typography>
                <NavItem
                    to={ROUTES.SIGN_IN}
                    text='Sign in'
                    Icon={LockOpenIcon}
                    onClick={onItemClick('Sign in')}
                />
                <NavItem
                    to={ROUTES.SIGN_UP}
                    text='Sign up'
                    Icon={PersonOutlineIcon}
                    onClick={onItemClick('Sign up')}
                />
                <NavItem
                    to={ROUTES.MONITOR}
                    text='Monitor'
                    Icon={DesktopWindowsIcon}
                    onClick={onItemClick('Monitor')}
                />
            </List>
        );

        const SideDrawerAuth = () => (
            <List>
                <ListItem alignItems='center'>
                    <img
                        className={classes.avatar}
                        alt='logged in user'
                        src='http://djdoa.nl/DJDoa_WebPages/__Old_Website/doa_avatar_small.jpg'/>
                </ListItem>
                <ListSubheader>
                    Doa Bonifacio
                </ListSubheader>
                <NavItem
                    to={ROUTES.ACCOUNT}
                    text='Account'
                    Icon={TuneIcon}
                    onClick={onItemClick('Account')}
                />
                <NavItem
                    to={ROUTES.SIGN_OUT}
                    text='Logout'
                    Icon={ExitToAppIcon}
                    onClick={onItemClick('Logout')}
                />
                <ListSubheader>
                    Controls
                </ListSubheader>
                <ListItem>
                    <Checkbox
                        value={showSeconds}
                        onChange={toggleShowSeconds}
                        checked={showSeconds}/>
                    <ListItemText>
                        Display Seconds
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <Checkbox
                        value={displayRealTime}
                        onChange={toggleDisplayRealTime}
                        checked={displayRealTime}/>
                    <ListItemText>
                        Display Realtime
                    </ListItemText>
                </ListItem>
                {/*TODO Only show this when access level is high enough, else always of. Toggle + and handles*/}
                <ListItem>
                    <Checkbox
                        value={isEditable}
                        onChange={toggleIsEditable}
                        checked={isEditable}/>
                    <ListItemText>
                        Edit Mode
                    </ListItemText>
                </ListItem>
                <ListSubheader>
                    Navigation
                </ListSubheader>
                <NavItem
                    to={ROUTES.LANDING}
                    text='Schedule'
                    Icon={HomeIcon}
                    onClick={onItemClick('Schedule')}
                />
                <NavItem
                    to={ROUTES.MONITOR}
                    text='Monitor'
                    Icon={DesktopWindowsIcon}
                    onClick={onItemClick('Monitor')}
                />
                <NavItem
                    to={ROUTES.SHOWS}
                    text='Other Shows'
                    Icon={WebIcon}
                    onClick={onItemClick('Compact View')}
                />
                <NavItem
                    to={ROUTES.MOBILE}
                    text='Mobile view'
                    Icon={WebIcon}
                    onClick={onItemClick('Mobile view')}
                />
                <NavItem
                    to={ROUTES.ADMIN}
                    text='Manage Users'
                    Icon={SupervisorAccountIcon}
                    onClick={onItemClick('Manage Users')}
                />
            </List>);

        return (
            <Drawer variant={variant} open={open} onClose={onClose}>
                {/*div to offset the drawer with the heighth of the Toolbar, when the variant is persistent*/}
                <div
                    className={clsx({
                        [classes.toolbarMargin]: variant === 'persistent'
                    })}
                />
                <AuthUserContext.Consumer>
                {authUser => authUser ? <SideDrawerAuth/> : <SideDrawerNonAuth/>}
                </AuthUserContext.Consumer>
            </Drawer>
        )
    }
);

const NavListItem = withStyles(styles)(
    ({classes, Icon, text, active, ...other}) => (
        <ListItem button component={NavLink} {...other}>
            <ListItemIcon
                classes={{
                    root: clsx({[classes.activeListItem]: active})
                    //   The clsx() function is used extensively by Material-UI–this isn't an extra dependency.
                    //   It allows you to dynamically change the class of an element without introducing custom logic into your markup.
                    //   For example, the clsx({ [classes.activeListItem]: active }) syntax will only apply the activeListItem class if active is true.
                    //   The alternative will involve introducing more logic into your component.
                }}
            >
                <Icon/>
            </ListItemIcon>
            <ListItemText
                classes={{
                    primary: clsx({
                        [classes.activeListItem]: active
                    })
                }}
            >
                {text}
            </ListItemText>
        </ListItem>
    )
);

const NavItem = props => (
    <Switch>
        <Route
            exact
            path={props.to}
            render={() => <NavListItem active={true} {...props} />}
        />
        <Route path="/" render={() => <NavListItem {...props} />}/>
    </Switch>
);

export default MySideDrawer;