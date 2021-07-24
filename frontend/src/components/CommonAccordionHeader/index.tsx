import React from 'react';
import useStyles from './styles';
import Logo from 'svg/Logo';
import {ExpandMore} from '@material-ui/icons';
import {AccordionSummary} from '@material-ui/core';
import {BrowserRouterProps} from 'react-router-dom';
import clsx from 'clsx';

export interface CommonAccordionHeaderProps extends BrowserRouterProps {
  className?: string;
}

export const CommonAccordionHeader: React.FC<CommonAccordionHeaderProps> = (props) => {
  const classes = useStyles();
  const {className, ...otherProps} = props;

  return (
    <AccordionSummary
      expandIcon={<ExpandMore className={classes.expandedMore}/>}
      className={clsx(classes.accordionSummary, className)}
      {...otherProps}
    >
      <div className={classes.content}>
        <Logo className={classes.logo}/>
        <div className={classes.header}>
          {props.children}
        </div>
      </div>
    </AccordionSummary>
  )
};


export default CommonAccordionHeader;
