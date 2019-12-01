import React from "react";
import {Route, NavLink, Switch} from "react-router-dom";
import clsx from "clsx";

import {Checkbox, withStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import TuneIcon from '@material-ui/icons/Tune';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

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
});

const MySideDrawer = withStyles(styles)(
    ({
         classes, variant, open, onClose, onItemClick,
         showSeconds, toggleShowSeconds, displayRealTime, toggleDisplayRealTime,
         isEditable, toggleIsEditable
     }) => (
        <Drawer variant={variant} open={open} onClose={onClose}>
            {/*div to offset the drawer with the heighth of the Toolbar, when the variant is persistent*/}
            <div
                className={clsx({
                    [classes.toolbarMargin]: variant === 'persistent'
                })}
            />
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
                    to='/account'
                    text='Account'
                    Icon={TuneIcon}
                    onClick={onItemClick('Account')}
                />
                <NavItem
                    to='/logout'
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
                    to='/'
                    text='Schedule'
                    Icon={HomeIcon}
                    onClick={onItemClick('Schedule')}
                />
                <NavItem
                    to='/monitor'
                    text='Monitor'
                    Icon={DesktopWindowsIcon}
                    onClick={onItemClick('Monitor')}
                />
                <NavItem
                    to='/shows'
                    text='Other Shows'
                    Icon={WebIcon}
                    onClick={onItemClick('Compact View')}
                />
                <NavItem
                    to='/mobile'
                    text='Mobile view'
                    Icon={WebIcon}
                    onClick={onItemClick('Mobile view')}
                />
            </List>
        </Drawer>
    )
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