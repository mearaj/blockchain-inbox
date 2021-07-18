import React from 'react';
import useStyles from './styles';
import Logo from 'svg/Logo';
import {ExpandMore} from '@material-ui/icons';
import {AccordionSummary} from '@material-ui/core';

const CommonAccordionHeader: React.FC = (props) => {
  const classes = useStyles();

  return (
    <AccordionSummary
      expandIcon={<ExpandMore className={classes.expandedMore}/>} className={classes.accordionSummary}
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
