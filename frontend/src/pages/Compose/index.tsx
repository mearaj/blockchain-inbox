import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CommonBarHeader from 'components/CommonBarHeader';


const ComposePage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>
        <CommonBarHeader>
          Compose
        </CommonBarHeader>
      </CommonBar>
      Compose Page
    </div>
  );
}

export default ComposePage;
