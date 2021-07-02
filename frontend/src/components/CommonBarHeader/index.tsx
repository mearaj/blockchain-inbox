import {Typography} from '@material-ui/core';
import React from 'react';
import useStyles from './styles';


const CommonBarHeader:React.FC = (props)=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {props.children}
      </Typography>
    </div>
  )
}

export default CommonBarHeader;
