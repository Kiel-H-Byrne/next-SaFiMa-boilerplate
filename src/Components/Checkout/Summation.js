import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";

import * as ACTIONS from "../../Actions/actionConstants";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const calculateTotal = (cart, updateTotal) => {
  let total = 0;
  Object.values(cart).forEach(item => {
    total += Number(item.servicePrice) * item.quantity;
  });
  updateTotal(total);
  return total;
};

const Summation = props => {
  const { classes, cart, updateTotal } = props;

  if (!Object.values(cart).length) return null;

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography variant="h6" className={classes.title}>
          Your Order
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.divider} />

      <Grid container className={classes.cartContainer}>
        <Grid item xs={4}>
          <Typography variant="body1" className={classNames(classes.cartItem, classes.alignLeft)}>
            Service Name
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classNames(classes.cartItem, classes.alignCenter)}>
            Tickets
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classNames(classes.cartItem, classes.alignRight)}>
            Subtotal
          </Typography>
        </Grid>
      </Grid>

      {Object.values(cart).map((item, idx) => {
        return (
          <Grid container key={`${item.serviceName}_${idx}_`} className={classes.cartContainer}>
            <Grid item xs={4}>
              <Typography
                variant="body1"
                className={classNames(classes.cartItem, classes.alignLeft)}>
                {item.serviceName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="body1"
                className={classNames(classes.cartItem, classes.alignCenter)}>
                x{Number(item.quantity)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="body1"
                className={classNames(classes.cartItem, classes.alignRight)}>
                ${Number(item.servicePrice) * item.quantity}
              </Typography>
            </Grid>
          </Grid>
        );
      })}

      <Grid container className={classes.totalContainer}>
        <Grid item xs={4}>
          <Typography variant="body1" className={classNames(classes.cartItem, classes.alignCenter)}>
            Total:
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" className={classNames(classes.cartItem, classes.alignRight)}>
            ${calculateTotal(cart, updateTotal)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = theme => ({
  container: {
    padding: ".25em 1em",
    justifyContent: "center"
  },
  divider: {
    height: 1,
    margin: "0 25%",
    borderBottom: `1px solid ${theme.palette.text.secondary}`
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: 800
  },
  cartContainer: {
    justifyContent: "space-between",
    padding: "1em"
  },
  alignLeft: {
    textAlign: "left"
  },
  alignCenter: {
    textAlign: "center"
  },
  alignRight: {
    textAlign: "right"
  },
  cartItem: {
    // padding: "0 1em"
  },
  totalContainer: {
    padding: "2em 0",
    display: "flex",
    justifyContent: "flex-end",
    margin: "1em"
  }
});

const mapDispatchToProps = dispatch => ({
  updateTotal: total =>
    dispatch({
      type: ACTIONS.UPDATE_USERS_ASPECT,
      aspect: "appointmentTotal",
      payload: total
    })
});

Summation.propTypes = {
  classes: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Summation);
