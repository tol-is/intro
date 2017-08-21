import React from 'react';
import styled from 'emotion/react';

const Container = styled('section')`
  display: flex;
  flex-direction: column;
  background-color: #e0e0e0;
  min-height: 100vh;
  flex: 1 0 100%;
`;

const HeaderOne = styled('h1')`
  font-size: 3.4rem;
  line-height: 1em;
  margin: 0 0 0.67em 0;
`;

const Login = () => {
  return (
    <Container>
      <HeaderOne>Login</HeaderOne>
      <a href="http://localhost:3000/auth/google">Login with google</a>
    </Container>
  );
};

export default Login;
