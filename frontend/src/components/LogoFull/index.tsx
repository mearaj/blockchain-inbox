import React from 'react';
import Logo from 'svg/Logo';
import useStyles from 'components/LogoFull/styles';
import clsx from 'clsx';
import {BrowserRouterProps} from 'react-router-dom';

interface LogoFullProps extends BrowserRouterProps {
  className?: string;
  logoClassName?: string;
}

const LogoFull: React.FC<LogoFullProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Logo className={clsx(classes.logo, props.logoClassName)}/>
      <span className={classes.logoTitle}>Bluzelle</span>
    </div>
  );
};

export default LogoFull;
