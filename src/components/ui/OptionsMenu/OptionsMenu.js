import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {Dialog, ListItemText} from "@material-ui/core";
import * as actions from "../../../store/actions";
import {compose} from "redux";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {updateObject} from "../../../shared/utility";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    optionsMenu: {
        cursor: 'pointer'
    },
    delete: {
        color: 'red'
    }
});

/**
 * Created by Doa on 26-11-2019.
 */
const optionsMenu = withStyles(styles)(
    ({
         classes, elementType, element, parent, shows, blocks, parts, scenes,
         onSave, onDelete, onCopyPartAndScenes, onCopyBlockPartsAndScenes
     }) => {

        const [anchor, setAnchor] = useState(null);
        const [dialog, setDialog] = useState(false);
        let optionsMenu = [];
        let newParent = {};
        let order = 100;

        switch (elementType) {
            case 'scenes': {
                optionsMenu = parts;
                newParent = 'partId';
                break;
            }
            case 'parts': {
                console.log('parts');
                optionsMenu = blocks;
                newParent = 'blockId';
                break;
            }
            case 'blocks': {
                optionsMenu = shows;
                newParent = 'showId';
                break;
            }
        }

        const handleListItemClicked = (target) => {
                switch (elementType) {
                    case 'scenes': {
                        order = scenes.filter(aScene => aScene.partId === target).length;
                        break;
                    }
                    case 'parts': {
                        order = parts.filter(aPart => aPart.blockId === target).length;
                        break;
                    }
                    default:
                        order = blocks.length;
                }
                let newElement = updateObject(element, {[newParent]: target, order: order});
                delete newElement.id;
                console.log(order);
                console.log(target);
                console.log(newElement);
                if (dialog === 'Copy') {
                    onSave(elementType, newElement)
                }
                if (dialog === 'Copy all') {
                    if (elementType === 'parts') {
                        onCopyPartAndScenes(newElement, element.id)
                    } else {
                        console.log('copying Blocks')
                        onCopyBlockPartsAndScenes(newElement, element.id)
                    }
                }
            }
        ;

        const deleteClicked = () => {
            console.log(element.id);
            onDelete(element.id, elementType);
            setAnchor(null)
        };


        const optionsClicked = (action) => {
            setDialog(action);
            setAnchor(null)
        };

        const closeMenu = (e) => {
            setAnchor(null)
        };

        return (
            <>
                <Tooltip title={'More options'}>
                <MoreHorizIcon
                    className={classes.optionsMenu}
                    onClick={(e) => setAnchor(e.currentTarget)}/>
                </Tooltip>
                <Menu
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    onClose={closeMenu}>
                    <MenuItem onClick={() => optionsClicked('Copy')}>
                        Copy
                    </MenuItem>
                    {(elementType == 'scenes') ? null :
                        <MenuItem onClick={() => optionsClicked('Copy all')}>
                            Copy All
                        </MenuItem>}
                    <MenuItem className={classes.delete}
                              onClick={deleteClicked}>
                        Delete
                    </MenuItem>
                </Menu>
                <Dialog open={Boolean(dialog)} onClose={() => setDialog(null)}>
                    {dialog} to:
                    <List>
                        {optionsMenu.map((option, index) => (
                            <ListItem
                                selected={option.id === parent}
                                autoFocus button dense
                                value={option.id}
                                key={index}
                                onClick={(event) => handleListItemClicked(option.id)}>
                                <ListItemText primary={option.title}/>
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
            </>);
    }
);

const mapStateToProps = (state) => {
    return {
        showId: state.show.currentShow,
        shows: state.show.shows,
        blocks: state.show.blocks,
        parts: state.show.parts,
        scenes: state.show.scenes,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data)),
        // onUpdate: (showId, data, elementName) => dispatch(actions.update(showId, data, elementName)),
        onDelete: (id, elementType) => dispatch(actions.deleteElement(id, elementType)),
        onCopyPartAndScenes: (partData, partId) => dispatch(actions.copyPartAndScenes(partData, partId)),
        onCopyBlockPartsAndScenes: (blockData, blockId) => dispatch(actions.copyBlockPartsAndScenes(blockData, blockId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(optionsMenu);
