import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";

import * as ACTIONS from "./../../Actions/actionConstants";
import { push } from "connected-react-router";
import Router, {useRouter} from "next/router";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import { withStyles } from "@material-ui/core/styles";

import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { CHECKOUT } from "./../../Routes";

const styles = theme => ({
  menuList: {
    fontVariant: "all-small-caps"
  },
  badge: {
    top: "50%",
    right: -3,
    // The border color match the background color.
    border: `2px solid ${theme.palette.type === "light" ? "black" : "white"}`,
    fontWeight: "bolder"
  },
  iconRoot: {
    color: theme.palette.type === "light" ? "black" : "white"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const Cart = (props) => {
  const {classes} = props;
  const [isOpen, setOpen] = useState(false)
  let cart = useSelector( state => state.users.cart )
  const authUser = useSelector( state => state.session.authUser )
  const location = useSelector( state => state.router.location )
  let appointmentTotal = useSelector( state => state.users.appointmentTotal)

  const router = useRouter()
  const dispatch = useDispatch();
  
  const addItemToCart = service => dispatch({
    type: ACTIONS.UPDATE_CART,
    payload: service
  })
  
  const handleReroute = () => {
    setOpen(false)
    
    Router.push(`${CHECKOUT}?total=${appointmentTotal}`);
  };
  const cartTotal = () => {
    let total;
    Object.values(cart).forEach(item => {
      total += Number(item.servicePrice) * item.quantity;
    });
    return total
  }

  const toggleDrawer = open => () => {
    setOpen(open)
  };
  const handleCartRemoval = item => {
    let updatedCart = cart.length ? [...cart] : [];
    updatedCart = updatedCart.filter(a => a !== item);
    if (updatedCart.length === 0) {
    }
    setOpen(false)
    addItemToCart(updatedCart);
  };

  useEffect(() => {
    Object.values(cart).forEach(item => {
      appointmentTotal += Number(item.servicePrice) * item.quantity;
    });
    dispatch({
      type: ACTIONS.UPDATE_USERS_ASPECT,
      aspect: "appointmentTotal",
      payload: appointmentTotal
    })
  }, [cart])

  cart = Object.values(cart)
  return (
    <div>
        <IconButton
          classes={{ root: classes.iconRoot }}
          onClick={cart.length ? toggleDrawer(true) : null}
          aria-label="Cart"
          className={classes.margin}>
          <Badge
            badgeContent={cart ? cart.length : 0}
            classes={{ badge: classes.badge }}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Drawer
          anchor="top"
          open={isOpen}
          onClose={toggleDrawer(false)}>
          <div tabIndex={0}>
            <List
              subheader={<ListSubheader>Cart</ListSubheader>}
              style={{ padding: "0" }}>
              {cart.map((item, idx) => {
                return (
                  <div className={classes.menuListWrapper} key={`${item._id}-${idx}`}>
                    <ListItem
                      button
                      key={`${item.serviceName}_${idx}`}
                      style={{ padding: "1em" }}>
                      <ListItemIcon
                        onClick={() => handleCartRemoval(item)}>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.serviceName}
                        secondary={`$${item.servicePrice}`}
                      />
                    </ListItem>
                  </div>
                );
              })}
              {router.route !== CHECKOUT ? (
                <Link href={CHECKOUT} as={CHECKOUT}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: 0,
                    padding: ".5em"
                  }}>
                  Schedule Your Appointment
                </Button>
                </Link>
              ) : null}
            </List>
          </div>
        </Drawer>
      </div>
    )
}

export default withStyles(styles)(Cart)