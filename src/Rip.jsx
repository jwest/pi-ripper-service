import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 600,
    margin: 'auto',
    marginTop: 16,
  },
  actions: {
    textAlign: 'right',
  },
  pos: {
    textAlign: 'right',
    color: theme.palette.text.secondary,
  },
  artist: {
    marginBottom: 12,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  status: {
    color: theme.palette.text.secondary,
  },
});

function progressCounter(disk) {
  if (disk.status === 'END') {
    return 100;
  }
  if (!!disk.trackCount && !!disk.rippedTrackCount) {
    return parseInt(disk.rippedTrackCount, 10) / parseInt(disk.trackCount, 10) * 100;
  }
  return 0;
}

function getLink(disk) {
  if (!disk.metadata) {
    return null;
  }
  if (!disk.metadata.link) {
    return null;
  }
  return disk.metadata.link;
}

function Rip(props) {
  const { classes, disk } = props;
  const progress = progressCounter(disk);
  const link = getLink(disk);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type='headline' className={classes.title} component='h2'>
          {disk.title || 'Loading title'}
        </Typography>
        <Typography type='body1' className={classes.artist}>
          {disk.artist || 'Loading artist'}
        </Typography>
        <Typography type='body1' className={classes.status}>
          Status: {disk.status || 'Loading...'}
        </Typography>
        {!!link &&
          <Typography type='body1' className={classes.status}>
            Link: <a href={link}>Go to musicbrainz</a>
          </Typography>
        }
        <br />
        {!!disk.trackCount && !!disk.rippedTrackCount &&
          <Typography type="body1" className={classes.pos}>
            {disk.rippedTrackCount} of {disk.trackCount} tracks
          </Typography>
        }
        <LinearProgress mode={!!progress ? 'determinate' : 'indeterminate'} value={progress} />
      </CardContent>
      {false && 
        <CardActions className={classes.actions}>
          <Button raised color='accent'>Stop</Button>
          <Button dense color='accent'>Shoutdown</Button>
        </CardActions>
      }
    </Card>
  );
}

Rip.propTypes = {
  classes: PropTypes.object.isRequired,
  disk: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rip);
