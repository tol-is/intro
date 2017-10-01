import React from 'react';
import styled from 'styled-components';

const FloatButton = styled.button`
  border-radius : 50%;
  outline : none;
  display: block;
  width: 1em;
  height: 1em;
  font-size: 60px;
  padding: 0;
  margin: 0;
  border:0;
  padding: 0.2em;
  & svg{
    width:100%;
    height: 100%;
    display: block;
  }
`;

export { FloatButton };
export default FloatButton;
