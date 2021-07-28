import {Accordion, AccordionDetails, Button, FormLabel, Radio} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {accountsActions, AppState} from 'store';

import useStyles from './styles';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import {ExpandMore} from '@material-ui/icons';
import {isLoggedIn} from 'utils/jwt';
import IconButton from '@material-ui/core/IconButton';
import {AccountAccordionProps} from './interfaces';


export const AccountAccordion: React.FC<AccountAccordionProps> = (props) => {
    const {account, className, expanded, onChange} = props;
    const classes = useStyles();
    const accountsState = useSelector((state: AppState) => state.accountsState);
    const [locallyExpanded, setLocallyExpanded] = useState(expanded===undefined ? false:expanded);
    const {currentAccount} = accountsState;
    const dispatch = useDispatch();

    const isCurrentAccount = (): boolean => {
      return !!(currentAccount?.publicKey &&
        currentAccount.publicKey===account.publicKey &&
        currentAccount.chainName===account.chainName);
    };

    const handleAccordionChange = (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      if (onChange!==undefined && expanded!==undefined) {
        onChange(event, isExpanded);
      } else {
        setLocallyExpanded(isExpanded);
      }
    };
    useEffect(() => {
      setLocallyExpanded(!!expanded);
    }, [expanded]);

    const radioId = account.publicKey + ":" + account.chainName;
    return (
      <Accordion
        expanded={locallyExpanded}
        onChange={handleAccordionChange}
        className={clsx(classes.root, className, isCurrentAccount() ? classes.current:"")}
      >
        <div className={classes.accordionSummary}>
          <Radio
            className={clsx(classes.radio, classes.checked)}
            checked={isCurrentAccount()}
            onChange={() => dispatch(accountsActions.setCurrentAccount(account))}
            id={radioId}
          />
          <FormLabel className={classes.label} htmlFor={radioId}>
            <span className={classes.labelChainName}>{account.chainName}</span>
            <span className={classes.labelPublicKey}>{account.publicKey}</span>
          </FormLabel>
          <IconButton
            onClick={(event) =>
              handleAccordionChange(event, !locallyExpanded)}
            className={classes.expandedMoreIconButton}
          >
            <ExpandMore className={clsx(classes.expandedMoreIcon, locallyExpanded ? classes.rotatedIcon:"")}/>
          </IconButton>
        </div>

        {
          <AccordionDetails>
            <div className={classes.publicKeyRow}>
              <Button
                variant="contained"
                className={classes.copyButton}
                onClick={() => copy(account.publicKey)}
              >
                Copy Public Key
              </Button>
              {
                isLoggedIn(account.auth) ?
                  <Button
                    variant="contained"
                    className={classes.buttonPrimary}
                    onClick={() => dispatch(accountsActions.logout(account))}
                  >
                    Logout
                  </Button>:
                  <Button variant="contained" className={classes.buttonPrimary}>
                    Login
                  </Button>
              }
            </div>
          </AccordionDetails>
        }
      </Accordion>
    );
  }
;


export default AccountAccordion;
