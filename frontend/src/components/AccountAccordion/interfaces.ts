import {BrowserRouterProps} from 'react-router-dom';
import {Account} from 'store';
import React from 'react';

export interface AccountAccordionProps extends BrowserRouterProps {
  account: Account,
  className?: string,
  expanded?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
}
