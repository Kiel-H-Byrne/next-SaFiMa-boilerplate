import React, { Component } from "react";
import PropTypes from "prop-types";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

class Billing extends Component {
  constructor(props) {
    super();
    this.state = {
      cart: props.cart
    };
  }

  render() {
    // eslint-disable-next-line
    const { classes, cart, users } = this.props;
    const { total } = users;

    if (!users.total) return null;

    if (!this.totalAccuracyCheck(cart, total)) return null;

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.wrapper}>
          <Typography variant="h6" className={classes.title}>
            Payment
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.divider} />
        <Grid item xs={12} className={classes.wrapper}>
          <Card className={classes.cardWrapper}>
            <CardContent className={classes.cardContent}>Stripe Goes Here</CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.wrapper}>
          <Card className={classes.cardWrapper}>
            <CardContent className={classes.cardContent}>Billing Information Goes Here</CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  totalAccuracyCheck = (cart, total) => {
    let cartTotal = 0;
    cart.forEach(item => {
      cartTotal += Number(item.meta.ticketPrice) * item.quantity;
    });
    return total === cartTotal;
  };
}

const styles = theme => ({
  container: {
    justifyContent: "center"
  },
  divider: {
    height: 1,
    margin: "0 25%",
    borderBottom: `1px solid ${theme.palette.text.secondary}`
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "1em"
  },
  title: {
    fontWeight: 800
  },
  cardWrapper: {
    padding: "1em",
    justifyContent: "center",
    width: "100%"
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

Billing.propTypes = {
  classes: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

export default withStyles(styles)(Billing);
