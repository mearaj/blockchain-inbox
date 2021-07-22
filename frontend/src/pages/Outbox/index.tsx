import React, {useEffect} from 'react';
import CommonBar from 'components/CommonBar';
import {DataGrid} from '@material-ui/data-grid'

import useStyles from './styles';
import CuriumExtensionRequired from 'guards/CuriumRequired';
import {AppState, messagesAction} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import columns from './columns';

const OutboxPage: React.FC = () => {
  const classes = useStyles();
  const outbox = useSelector((appState: AppState) => appState.messagesState.outbox);

  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(async () => {
      dispatch(messagesAction.getOutbox());
    },);
    return () => clearTimeout(timerId);
  }, []);


  console.log(outbox);
  return (
    <CuriumExtensionRequired>
      <div className={classes.root}>
        <CommonBar>Outbox</CommonBar>
        {
          <DataGrid
            rows={outbox.map((eachOutbox) => ({...eachOutbox, id: eachOutbox.uuid}))}
            columns={columns}
            className={classes.table}
            pageSize={5}
          />
        }
      </div>
    </CuriumExtensionRequired>
  );
}

export default OutboxPage;
