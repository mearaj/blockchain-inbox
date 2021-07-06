import logo from 'assets/png/logo.png';
import React from 'react';

const CommonCardHeader: React.FC = () => {
  return (
    <div style={{display: 'flex', backgroundColor: '#3f51b5', justifyContent: "center"}}>
      <img src={logo} style={{height: 56}} alt="Bluzelle Logo"/>
    </div>
  )
};


export default CommonCardHeader;
