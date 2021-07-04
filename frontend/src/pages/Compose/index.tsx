import React from 'react';
import CommonBar from 'components/CommonBar';

import useStyles from './styles';
import CommonBarHeader from 'components/CommonBarHeader';
import {Card, CardContent, CardHeader, FormControl, TextField} from '@material-ui/core';


const ComposePage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CommonBar>
        <CommonBarHeader>
          Compose
        </CommonBarHeader>
      </CommonBar>
      <Card>
        <CardContent>
          <FormControl>
            <TextField label="To" placeholder="Enter recipient wallet address here"/>
          </FormControl>
          <TextField label="From" />
        </CardContent>
      </Card>
    </div>
  );
}

export default ComposePage;
