import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import React from "react";

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    }
});

const MyToolbar = withStyles(styles)(
    ({classes, title, onMenuClick, isLive, showName}) => (
        <>
            <AppBar className={classes.aboveDrawer}>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        onClick={onMenuClick}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h5"
                        color="inherit"
                        className={classes.flex}
                    >
                        {(isLive)? 'LIVE ' + showName :title }
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}/>
        </>
    )
);

export default MyToolbar;