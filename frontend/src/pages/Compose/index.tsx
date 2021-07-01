import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';


const ComposePage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>
        Compose Header
      </CommonBar>
      Compose Page
    </div>
  );
}

export default ComposePage;
