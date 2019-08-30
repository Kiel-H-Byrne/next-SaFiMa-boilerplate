import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";

import * as ACTIONS from "./../../Actions/actionConstants";
//Components
import classNames from "classnames";

//MUI
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";

import { withStyles } from "@material-ui/core/styles";

//Icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

class EnhancedSnackbar extends Component {
  constructor(props) {
    super();
    this.state = {
      open: props.open
    };
  }

  render() {
    const { classes, message, variant } = this.props;
    const { open } = this.state;

    //Icon
    const Icon = variantIcon[variant];

    if (!variant) {
      return null;
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={open}
          autoHideDuration={3000}
          onClose={this.handleClose}>
          <SnackbarContent
            className={classNames(classes[variant], classes.margin)}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon
                  className={classNames(classes.icon, classes.iconVariant)}
                />
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}>
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    this.props.closeSnackbar();
    this.setState({ open: false });
  };
}

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  success: {
    backgroundColor: theme.palette.primary.main
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  icon: {
    color: "#333"
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing()
  },
  message: {
    display: "flex",
    alignItems: "center",
    color: "#333"
  },
  margin: {
    margin: theme.spacing()
  }
});

EnhancedSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["", "success", "warning", "error", "info"])
    .isRequired
};

const mapStateToProps = state => ({
  message: state.app.message,
  variant: state.app.variant
});

const mapDispatchToProps = dispatch => ({
  closeSnackbar: () =>
    dispatch({
      type: ACTIONS.UPDATE_APP_REDUCER,
      payload: {
        snackbarOpen: false,
        message: "",
        variant: ""
      }
    })
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(EnhancedSnackbar);
