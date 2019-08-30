import React, { useState } from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from 'react-redux'
//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

//Icons
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";

//Colors
import { red } from "@material-ui/core/colors";

import * as ACTIONS from './../../Actions/actionConstants'
import { makeStyles, useTheme } from "@material-ui/styles";
import { Divider, Paper, Avatar } from "@material-ui/core";

const OrderItem = (props) => {
  
  //STATE
  const [capacity, setCapacity] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [ticketMessage, setTicketMessage] = useState("2 items more...");
  const [ticketStatus, setTicketStatus] = useState("3");
  const [ticketsLeft, setTicketsLeft] = useState(2);
  //PROPS
  const cart = useSelector(state => state.users.cart)
  const {service} = props

  let cartItems = Object.values(cart)

  const {
    // eslint-disable-next-line
    serviceDescription,
    serviceName,
    servicePrice,
    serviceDuration,
    serviceImageUrl,
    giftItem
  } = service;

  const dispatch = useDispatch();
  const updateCartItem = (id, item) => {
    cart[id] = {...cart[id], ...item}
    
    dispatch({
      type: ACTIONS.UPDATE_CART,
      payload: {[id]: cart[id]}
    })
  }
  const handleButton = type => {
    const { service } = props;
    let cartItems = Object.values(cart)

    //Increment / Decrement
    if (type === "dec") {
      setQuantity(quantity - 1);
      setTicketsLeft(ticketsLeft + 1);
    } else if (type === "inc") {
      setQuantity(quantity + 1);
      setTicketsLeft(ticketsLeft - 1);
    }

    //Accounting for Updated State, How many tickets are left
    let ticketStateValue =
      type === "dec" ? ticketsLeft + 1 : type === "inc" ? ticketsLeft - 1 : ticketsLeft;

    //Warn accordingly
    if (ticketStateValue > 10) {
      setTicketStatus(""),
      setTicketMessage("")
    }
    if (ticketStateValue <= 10 && ticketStateValue > 1) {
      setTicketMessage(`${ticketStateValue} items more...`)
      
    } else if (ticketStateValue === 1) {
      setTicketMessage(`1 more...`) 
    } else if (ticketStateValue === 0) {
      setTicketStatus("atCapacity"),
      setTicketMessage("Sold Out")
    }

      updateCartItem(service._id, {quantity: type === "dec" ? quantity - 1 : type === "inc" ? quantity + 1 : "ERROR"})
  };

  const handleDelete = () => {
    const { service } = props;
    // delete cart[service._id]
    const newCart = Object.keys(cart).reduce((o,k) => {
      if (k !== service._id) {
        o[k] = cart[k]
      }
      return o
    }, {})
    dispatch({
      type: ACTIONS.UPDATE_CART,
      payload: newCart
    })
  };

  const theme = useTheme();
  const classes = makeStyles({
    ticketMessage: {
      color: red[500],
      position: "absolute",
      bottom: 0
    },
    card: {
      position: "relative",
      display: "flex",
      padding: "1em",
      margin: "1em",
      boxShadow: "unset",
      border: "1px solid #eeeeee",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column"
      }
    },
    iconRoot: {
      backgroundColor: theme.palette.background.paper,
      "&:hover": {
        background: "transparent",
        backgroundColor: theme.palette.background.paper
      }
    },
    hover: {},
    container: {},
    delete: {},
    mediaContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
        alignItems: "center"
      },
      [theme.breakpoints.only("sm")]: {
        justifyContent: "center"
      }
    },
    cover: {
      width: 100,
      height: 100
    },
    avatar: {
      width: 30,
      height: 30,
    },
    content: {
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        textAlign: "center"
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "left"
      },
      // paddingBottom: 0
    },
    giftPaper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: "100%"
    },
    service: {
      display: "flex",
      flexDirection: "column"
    },
    serviceDescription: {
      maxHeight: 75,
      overflowX: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
      fontSize: ".8em"
    },
    details: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column"
    },
    servicePrice: {
      color: theme.palette.text.disabled
    },
    price: {
      display: "flex",
      textAlign: "center",
      fontWeight: "bolder",
      justifyContent: "center"
    },
    quantityContainer: {
      margin: "0 30%",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    icon: {
      fontSize: "1.5em"
    },
    quantityWrapper: {
      width: "100%",
      [theme.breakpoints.up("xs")]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    },
    quantity: {
      display: "flex",
      alignItems: "center",
      fontSize: "1.25em",
      fontWeight: "bolder"
    },
    subTotal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%"
    }
  })()

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12} md={3} className={classes.mediaContainer}>
          <CardMedia
            className={classes.cover}
            image={serviceImageUrl ? serviceImageUrl : ""}
            title={serviceDescription}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.service}>
          <CardContent className={classes.content}>
            <Typography
              variant="h6"
              style={{ fontSize: "1em", fontWeight: "bolder" }}>
              {serviceName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.serviceDescription}>
              {serviceDescription}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item container xs={12} md={3} >
          <Paper className={classes.giftPaper +' gradient-background'}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" style={{fontSize: "1em"}}>FREE GIFT:</Typography>
          </Grid>
          <Grid item xs={5}className={classes.mediaContainer}>
            <Avatar
              className={classes.avatar}
              src={giftItem.imageUrl ? giftItem.imageUrl : ""}
              alt={giftItem.name}
            />
          </Grid>
          <Grid item xs={7} className={classes.service}>
          <div className={classes.content}>
            <Typography variant="h6" style={{ fontSize: ".8em", fontWeight: "bolder" }} align="center">{giftItem.name}</Typography>
              <Typography
                variant="overline"
                color="textSecondary"
                alignt="center"
                className={classes.serviceDescription}>
                {giftItem.type}
              </Typography>
          </div>
          </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.subTotal}>
          <Typography variant="h6" className={classes.servicePrice}>
            ${servicePrice} ({serviceDuration}min)
          </Typography>
          <Grid item className={classes.quantityWrapper}>
            <IconButton
              disableRipple
              classes={{ root: classes.iconRoot }}
              aria-label="Decrement"
              className={classes.margin}
              onClick={() => handleButton("dec")}
              disabled={quantity === 0}>
              <ArrowLeftIcon className={classes.icon} />
            </IconButton>
            {quantity === 0 ? (
              <IconButton disableRipple className={classes.delete} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            ) : ticketsLeft === 0 ? (
              <Typography className={classes.quantity}>MAX</Typography>
            ) : (
              <Typography className={classes.quantity}>{quantity}</Typography>
            )}
            <IconButton
              disableRipple
              classes={{ root: classes.iconRoot }}
              aria-label="Increment"
              className={classes.margin}
              onClick={() => handleButton("inc")}
              disabled={ticketsLeft === 0}>
              <ArrowRightIcon className={classes.icon} />
            </IconButton>
            <Typography variant="overline" className={classes.ticketMessage}>
              {ticketMessage}
            </Typography>
          </Grid>
          <Typography variant="h6">${quantity > 0 ? quantity * servicePrice : null}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

OrderItem.propTypes = {
  service: PropTypes.object.isRequired
};

export default OrderItem;
