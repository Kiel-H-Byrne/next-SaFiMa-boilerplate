import React from 'react';
import { useSelector } from 'react-redux';

import { Typography, LinearProgress } from '@material-ui/core';

import ServiceCard from './../Services/ServiceCard';

const style = {
  headline: { margin: 'auto' }
};
const ServicesList = ({services}) => {
  //selectors
  const authUser = useSelector(state => state.session.authUser);
  const fetchingServices = useSelector(state => state.services.fetching);
  services = Object.values(services)
  
  return (
    <div>
      <Typography variant="h2" style={style.headline}>
        List of Services
      </Typography>
      {fetchingServices && <LinearProgress />}
      {
        services.map((s, i) => <ServiceCard {...s} key={`${s._id}`} />)
      }
    </div>
  );
};

export default ServicesList;
