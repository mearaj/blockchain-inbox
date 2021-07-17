import React from 'react';
import useStyles from './styles';
import Logo from 'svg/Logo';

const CommonCardHeader: React.FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo className={classes.logo}/>
      <div className={classes.header}>
        {props.children}
      </div>
    </div>
  )
};


export default CommonCardHeader;
