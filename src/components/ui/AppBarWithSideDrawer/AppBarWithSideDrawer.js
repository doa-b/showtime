import React, {useState, Fragment} from 'react';
import {Route, NavLink, Switch} from "react-router-dom";
import clsx from "clsx";

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import {Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListSubheader from "@material-ui/core/ListSubheader";

import MyToolbar from "../MyToolbar/MyToolbar";
import MySideDrawer from "../MySideDrawer/MySideDrawer";

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
        marginLeft: 5
    }
});

// const MyToolbar = withStyles(styles)(
//     ({classes, title, onMenuClick, isLive, showName}) => (
//         <>
//             <AppBar className={classes.aboveDrawer}>
//                 <Toolbar>
//                     <IconButton
//                         className={classes.menuButton}
//                         color="inherit"
//                         aria-label="Menu"
//                         onClick={onMenuClick}
//                     >
//                         <MenuIcon/>
//                     </IconButton>
//                     <Typography
//                         variant="h5"
//                         color="inherit"
//                         className={classes.flex}
//                     >
//                         {(isLive)? 'LIVE ' + showName :title }
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <div className={classes.toolbarMargin}/>
//         </>
//     )
// );

// const MyDrawer = withStyles(styles)(
//     ({classes, variant, open, onClose, onItemClick, displaySeconds, toggleShowSeconds}) => (
//         <Drawer variant={variant} open={open} onClose={onClose}>
//             {/*div to offset the drawer with the heighth of the Toolbar, when the variant is persistent*/}
//             <div
//                 className={clsx({
//                     [classes.toolbarMargin]: variant === 'persistent'
//                 })}
//             />
//
//
//             <List>
//                 <ListSubheader>
//                     Controls
//                 </ListSubheader>
//                 <FormControlLabel
//                     className={classes.checkBox}
//                     control={<Checkbox
//                         value={displaySeconds}
//                         onChange={toggleShowSeconds}
//                         checked={displaySeconds}/>}
//                     label='Display Seconds'/>
//                 <ListSubheader>
//                    Navigation
//                 </ListSubheader>
//                 <NavItem
//                     to='/'
//                     text='Schedule'
//                     Icon={HomeIcon}
//                     onClick={onItemClick('Schedule')}
//                 />
//                 <NavItem
//                     to='/page2'
//                     text='Page 2'
//                     Icon={WebIcon}
//                     onClick={onItemClick('Page 2')}
//                 />
//                 <NavItem
//                     to='/page3'
//                     text='Page 3'
//                     Icon={WebIcon}
//                     onClick={onItemClick('Page 3')}
//                 />
//             </List>
//         </Drawer>
//     )
// );
//
// const NavListItem = withStyles(styles)(
//     ({classes, Icon, text, active, ...other}) => (
//         <ListItem button component={NavLink} {...other}>
//             <ListItemIcon
//                 classes={{
//                     root: clsx({[classes.activeListItem]: active})
//                     //   The clsx() function is used extensively by Material-UI–this isn't an extra dependency.
//                     //   It allows you to dynamically change the class of an element without introducing custom logic into your markup.
//                     //   For example, the clsx({ [classes.activeListItem]: active }) syntax will only apply the activeListItem class if active is true.
//                     //   The alternative will involve introducing more logic into your component.
//                 }}
//             >
//                 <Icon/>
//             </ListItemIcon>
//             <ListItemText
//                 classes={{
//                     primary: clsx({
//                         [classes.activeListItem]: active
//                     })
//                 }}
//             >
//                 {text}
//             </ListItemText>
//         </ListItem>
//     )
// );
//
// const NavItem = props => (
//     <Switch>
//         <Route
//             exact
//             path={props.to}
//             render={() => <NavListItem active={true} {...props} />}
//         />
//         <Route path="/" render={() => <NavListItem {...props} />}/>
//     </Switch>
// );

// can be either variant = persistent or variant is temporary. Changes behaviour accordingly
function AppBarWithSideDrawer({classes, variant, showSeconds, isLive, toggleShowSeconds, showName}) {
    const [drawer, setDrawer] = useState(false);
    const [title, setTitle] = useState('Schedule');

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    const onItemClick = title => () => {
        setTitle(title);
        setDrawer(variant === 'temporary' ? false : drawer);
    };

    return (
        <div className={classes.root}>
            <MyToolbar title={title} onMenuClick={toggleDrawer} isLive={isLive}  showName={showName}/>
            <MySideDrawer
                variant={variant}
                open={drawer}
                onClose={toggleDrawer}
                onItemClick={onItemClick}
                showSeconds={showSeconds}
                toggleShowSeconds={toggleShowSeconds}
            />
        </div>
    );
}

export default withStyles(styles)(AppBarWithSideDrawer);