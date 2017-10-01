import React from 'react';
import styled from 'styled-components';

const TopBarHeader = styled.header`
  display : flex;
  flex-direction : row;
  position : fixed;
  background-color : #fcfcfc;
  color : white;
  top : 0;
  left : 0;
  width : 100%;
  height : 65px;
  z-index : 200;
  padding : 0 30px;
  box-shadow :
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 1px 0 rgba(0, 0, 0, 0.05)
`;

const AppTopBar = () => {
  return (
    <TopBarHeader>
      Intro
    </TopBarHeader>
  );
};

export default AppTopBar;
