import React from 'react';

import { Typography, Container } from '@material-ui/core';


import * as ROUTES from './../src/Routes';

import './../src/Style/App.scss';

export default function index(props) {
  return (
      <Container>
        <Typography variant="h4">Welcome to the SaFiMa Boilerplate</Typography>\
      </Container>
  );
}
