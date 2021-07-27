import {BrowserRouterProps} from 'react-router-dom';
import React from 'react';

export interface LoginProps extends BrowserRouterProps {
  className?: string;
  expanded?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
}

export const ID_ACCOUNT_PRIVATE_KEY = "ID_ACCOUNT_PRIVATE_KEY";
export const ID_ACCOUNT_PUBLIC_KEY = "ID_ACCOUNT_PUBLIC_KEY";
