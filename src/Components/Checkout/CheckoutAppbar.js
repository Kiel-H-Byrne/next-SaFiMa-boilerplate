import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const CheckoutAppbar = props => {
  const { classes, cart, handleNext } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color={!cart.length ? "inherit" : "primary"}
        className={classes.appBar}>
        <Button
          onClick={() => handleNext()}
          className={classes.button}
          disabled={cart.length === 0}
          color="primary">
          <Typography className={classes.type}>Next</Typography>
        </Button>
      </AppBar>
    </React.Fragment>
  );
};

const styles = theme => ({
  appBar: {
    top: "auto",
    bottom: 0,
    height: 50
  },
  button: {
    height: "100%"
  },
  type: {
    fontSize: "1.1em",
    padding: "0 .25em"
  }
});

CheckoutAppbar.propTypes = {
  classes: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default withStyles(styles)(CheckoutAppbar);
