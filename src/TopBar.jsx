import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  bar: {
    backgroundColor: '#000',
  },
  header: {
    color: '#fff',
  },
});

function TopBar(props) {
  const { classes } = props;
  return (
    <AppBar className={classes.bar} position='static'>
      <Toolbar>
        <Typography className={classes.header} type='title' color='inherit'>
          piRipper
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
