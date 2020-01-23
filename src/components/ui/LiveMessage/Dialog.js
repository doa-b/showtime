import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {CardHeader} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Autocomplete, {createFilterOptions} from "@material-ui/lab/Autocomplete/Autocomplete";
import {convertArrayToObject} from "../../../shared/utility";

const styles = theme => ({
    root: {
        position: 'fixed',
        zIndex: 1,
        top: 48,
        left: '1%',
        width: '95%',
        padding: '5 5 0 5',
        '@media (min-width:600px)': {
            top: '20%',
            left: '30%',
            width: '40%',
            minWidth: 400
        },
    },
    header: {
        paddingBottom: 0,
        textAlign: 'center',
        texTransform: 'capitalize',
    },
    content: {
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    message: {
        width: '100%'
    },
    team: {
        position: 'relative',
        zIndex: '15000',
        border: 5
    }
    // TODO: https://stackoverflow.com/questions/33373113/dropdown-contents-below-modal
    // TODO: https://stackoverflow.com/questions/57946563/material-ui-facing-an-issue-that-drop-down-options-are-coming-below-the-modal
});

/** Max 140 characters
 * Created by Doa on 8-1-2020.
 */
const Dialog = withStyles(styles)(
    ({classes, close, setMonitorMessage, users, displayUser}) => {
        const [message, setMessage] = useState('');
        const [team, setTeam] = useState([]);

        const isInvalid = message === '';
        const inputChangedHandler = (event) => {
            setMessage(event.target.value)
        };

        const onSubmit = (event) => {
            event.preventDefault();
            const data = {
                message: message,
                team: convertArrayToObject(team, 'id')
            };
            setMonitorMessage(data);
            close();
        };

        const filterOptions = createFilterOptions({
            ignoreCase: 'true',
            stringify: option => option.firstName,
        });

        return (
            <Card raised className={classes.root}>
                <CardHeader className={classes.header}
                            title='Send Message'
                            subheader='To Monitor and actor(s)'
                            action={
                                <IconButton aria-label="close" onClick={close}>
                                    <CloseIcon/>
                                </IconButton>
                            }/>
                <CardContent className={classes.content}>
                    <form onSubmit={onSubmit}>
                        <Autocomplete className={classes.team}
                                      autoComplete="new-password"
                                      value={team}
                                      id='team'
                                      multiple
                                      onChange={(event, value) => setTeam(value)}
                                      groupBy={option => option.groups}
                                      getOptionLabel={option => option.firstName}
                                      options={users.map(option => option)}
                                      defaultValue={[users[1]]}
                                      filterOptions={filterOptions}
                                      filterSelectedOptions
                                      renderTags={(value, {className, onDelete}) =>
                                          value.map((option, index) => (
                                              <Chip
                                                  key={index}
                                                  variant='outlined'
                                                  data-tag-index={index}
                                                  tabIndex={-1}
                                                  label={option.firstName}
                                                  avatar={<Avatar alt={option.firstName} src={option.imageUrl}/>}
                                                  className={className}
                                                  onDelete={onDelete}
                                                  // onClick={() => this.props.onSetDisplayUser(option)}
                                              />
                                          ))
                                      }
                                      renderInput={params => (
                                          <TextField
                                              {...params}
                                              variant='filled'
                                              label='Team members'
                                              placeholder='name'
                                              margin='normal'
                                              fullWidth
                                          />
                                      )}
                        />
                        <TextField className={classes.message}
                                   fullWidth
                                   onChange={inputChangedHandler}
                                   value={message}
                                   inputProps={{maxLength: 140}}
                                   id='message'
                                   label='message'
                                   multiline
                                   rows={3}
                                   margin='normal'
                                   variant='outlined'/>
                        <Button
                            disabled={isInvalid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Send Now!
                        </Button>
                    </form>
                </CardContent>

            </Card>);
    });

export default Dialog;