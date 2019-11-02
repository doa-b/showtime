import React, { useState } from 'react';
import Select from 'react-select';
import clsx from 'clsx'

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import {ListItemAvatar} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
        height: 300,
        padding: 5
    },
    input: {
        display: 'flex',
        padding: 5
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 2,
        alignItems: 'center',
        overflow: 'hidden',
        padding: 5
    },
    noOptionsMessage: {
        padding: 5
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 10,
        left: 0,
        right: 0
    },
    chip: {
        margin: 5,
        padding: 2
    }
}));

const inputComponent = ({ inputRef, ...props }) => (
    <div ref={inputRef} {...props} />
);

// set up the Select component to use a Material-UI textField component
const Control = props => (
    <TextField
        fullWidth
        InputProps={{
            inputComponent,
            inputProps: {
                className: props.selectProps.classes.input,
                inputRef: props.innerRef,
                children: props.children,
                ...props.innerProps
            }
        }}
        {...props.selectProps.textFieldProps}
    />
);

// it uses the chip component to render a selected value.
const MultiValue = props => (
    <Chip
        tabIndex={-1}
        clickable={true}
        variant='outlined'
        avatar={<Avatar alt={props.children} src='https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'/>}
        label={props.children}
        className={clsx(props.selectProps.classes.chip, {
            [props.selectProps.classes.chipFocused]: props.isFocused
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
    />
);

// the component that displays the autocomplete options when te user starts typing
// or clicks the down arrow. The paper component surrounds the options
const Menu = props => (
    <Paper
        square
        className={props.selectProps.classes.paper}
        {...props.innerProps}
    >
        {props.children}
    </Paper>
);

// Is rendered when there aren't any autocomplete options to display
const NoOptionsMessage = props => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);

// Renders individual options that are displayed in the autocomplete menu,
// using material-UI's MenuItem
// The selected and style properties alter the way that the item is displayed,
// based on the isSelected and isFocused properties.
// The children property sets the value of the item.

const Option = props => (
    <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
            fontWeight: props.isSelected ? 500 : 400
        }}
        {...props.innerProps}
    >
        {props.children}
    </MenuItem>
);

// The Placeholder text of the Autocomplete component is
// shown before the user types anything or makes a selection
// The Material-UI Typography component is used to theme the Placeholder text.
const Placeholder = props => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);

// Typography is used to render the selected value from the menu within the autocomplete input
const SingleValue = props => (
    <Typography
        className={props.selectProps.classes.singleValue}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);

// wraps the SingleValue component with a div and the valueContainer CSS class
const ValueContainer = props => (
    <div className={props.selectProps.classes.valueContainer}>
        {props.children}
    </div>
);

// By default, the Select component uses a pipe character as a separator between
// the buttons on the right side of the autocomplete menu. Since they're going to be
// replaced by Material-UI button components, this separator is no longer necessary
const IndicatorSeparator = () => null;

// this button is used to clear any selection made previously by the user
// the click handler is passed in through the innerProps
const ClearIndicator = props => (
    <IconButton {...props.innerProps}>
        <CancelIcon />
    </IconButton>
);

// replaces the default button used to show the autocomplete menu
const DropdownIndicator = props => (
    <IconButton {...props.innerProps}>
        <ArrowDropDownIcon />
    </IconButton>
);

// main function to export
function Autocomplete(props) {
    const classes = useStyles();
    const [value, setValue] = useState(null);
    console.log(value);

    return (
        <div className={classes.root}>
            <Select
                value={value}
                onChange={v => setValue(v)}
                textFieldProps={{
                    label: 'Team',
                    InputLabelProps: {
                        shrink: true
                    }
                }}
                {...{ ...props, classes }}
            />
        </div>
    );
}

// the component property ties all previous components together and passes it to select as default
// property. It can be further overridden
Autocomplete.defaultProps = {
    isClearable: true,
    components: {
        Control,
        Menu,
        NoOptionsMessage,
        Option,
        Placeholder,
        SingleValue,
        MultiValue,
        ValueContainer,
        IndicatorSeparator,
        ClearIndicator,
        DropdownIndicator
    },
    options: [
        { label: 'Boston Bruins', value: 'BOS', avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg' },
        { label: 'Buffalo Sabres', value: 'BUF', avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg' },
        { label: 'Detroit Red Wings', value: 'DET', avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg' },
        { label: 'Florida Panthers', value: 'FLA', avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg' },
        { label: 'Montreal Canadiens', value: 'MTL', avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg' },
        { label: 'Ottawa Senators', value: 'OTT', avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg' },
        { label: 'Tampa Bay Lightning', value: 'TBL', avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg' },
        { label: 'Toronto Maple Leafs', value: 'TOR' },
        { label: 'Carolina Hurricanes', value: 'CAR' },
        { label: 'Columbus Blue Jackets', value: 'CBJ' },
        { label: 'New Jersey Devils', value: 'NJD' },
        { label: 'New York Islanders', value: 'NYI' },
        { label: 'New York Rangers', value: 'NYR' },
        { label: 'Philadelphia Flyers', value: 'PHI' },
        { label: 'Pittsburgh Penguins', value: 'PIT' },
        { label: 'Washington Capitals', value: 'WSH' },
        { label: 'Chicago Blackhawks', value: 'CHI' },
        { label: 'Colorado Avalanche', value: 'COL' },
        { label: 'Dallas Stars', value: 'DAL' },
        { label: 'Minnesota Wild', value: 'MIN' },
        { label: 'Nashville Predators', value: 'NSH' },
        { label: 'St. Louis Blues', value: 'STL' },
        { label: 'Winnipeg Jets', value: 'WPG' },
        { label: 'Anaheim Ducks', value: 'ANA' },
        { label: 'Arizona Coyotes', value: 'ARI' },
        { label: 'Calgary Flames', value: 'CGY' },
        { label: 'Edmonton Oilers', value: 'EDM' },
        { label: 'Los Angeles Kings', value: 'LAK' },
        { label: 'San Jose Sharks', value: 'SJS' },
        { label: 'Vancouver Canucks', value: 'VAN' },
        { label: 'Vegas Golden Knights', value: 'VGK' }
    ]
};

export default Autocomplete;