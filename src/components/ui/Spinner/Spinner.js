import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    centered: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-5rem',
        marginLeft: '-5rem'
    },
});
/**
 * Created by Doa on 1-12-2019.
 */
const spinner = withStyles(styles)(
    ({classes}) => {
        return <CircularProgress
            className={classes.centered}
            size='10rem'/>;
    });

export default spinner;