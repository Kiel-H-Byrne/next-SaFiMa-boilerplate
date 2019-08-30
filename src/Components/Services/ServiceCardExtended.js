/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardActions, CardMedia, FormControlLabel, Typography, Button, Radio, Grid, RadioGroup } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import * as ACTIONS from '../../Actions/actionConstants';

const useStyles = makeStyles({
  cardStyle: {
    margin: '1em auto',
    padding: '1em',
    width: 360
  },
  card: {
    padding: "1em",
    width: "10em"
  }
});


const ServiceCard = props => {
  const cart = useSelector(state => state.users.cart);
  const gifts = useSelector(state => state.gifts)
  let appointmentTotal = useSelector(state => state.users.appointmentTotal)
  const [selectedRadio, setSelectedRadio] = useState("")
  

  const {
    serviceName,
    serviceDescription,
    servicePrice,
    serviceDuration,
    _id
  } = props;
  const dispatch = useDispatch();
  
  const updateCart = (item) => {
    //get id of service, add this gift object to service object, add full object to cart.
    
    let cartItem = {}
    cart[_id] = {...props, ...{"giftItem": JSON.parse(item)}}
    setSelectedRadio(item)
    let newCart = {...cart, ...cartItem}
    dispatch({
      type: ACTIONS.UPDATE_CART,
      payload: newCart
    });
  };


  const findGifts = (price) => {
    dispatch({
      type: ACTIONS.GIFTS_SAGA,
      aspect: "getGiftsWhere",
      payload: price
    })
  }

  useEffect(() => {
    // console.log("finding more")
    findGifts(servicePrice)
    // gifts[price] shouldnt change.
  }, [servicePrice]);

  const classes = useStyles();
  const GiftCard = ({gift, giftValue, service, selectedRadio}) => {
    const classes = useStyles();
    return (
      <Card className={classes.card}>
        <FormControlLabel 
      value={JSON.stringify(gift)}
      control={<Radio />}
      label={gift.name}
      />
      <CardMedia image={gift.imageUrl} style={{ height:75 }}/>
        <Typography variant="caption" paragraph>{gift.description}</Typography>
        <Typography variant="overline">{gift.type}</Typography>
      </Card>
    )
  }
  

  return (
    <Card className={classes.cardStyle}>
      <Typography variant="h6">{serviceName}</Typography>
      <Typography variant="subtitle1" paragraph>
        {serviceDescription}
      </Typography>
      <Typography variant="overline" paragraph>
        ${servicePrice} - <strong>{serviceDuration} minutes</strong>
      </Typography>
      <Typography variant="caption">(Select a Gift item to add to cart)</Typography>

      <Grid container direction="row">
      <RadioGroup aria-label="gifts" name="gift-selection" value={selectedRadio} onChange={(e,value) => updateCart(value)} row>
        {gifts[servicePrice] && gifts[servicePrice].map(( gift,idx) => {

        return (
          <Grid item key={`${gift}-${idx}`} >
            <GiftCard gift={gift} giftValue={servicePrice} service={props} />
          </Grid>)
        })
        }
      </RadioGroup>
      </Grid>
    </Card>
  );
};

export default ServiceCard;
