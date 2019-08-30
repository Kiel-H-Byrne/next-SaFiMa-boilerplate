import React, { Component } from "react";
import PropTypes from "prop-types";

//Actions
import * as ACTIONS from "./../../actions/actionConstants";

//MUI
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import blue from "@material-ui/core/colors/blue";

import { withStyles } from "@material-ui/core/styles";

//Icons
import FacebookIcon from "./../../static/icons/SVG/facebook";
import googleIcon from "./../../static/icons/PNG/google.png";

class SimpleDialog extends Component {
  //Update
  render() {
    const { classes, open } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}>
        <DialogTitle id="simple-dialog-title" style={{ textAlign: "center" }}>
          SIGN IN
        </DialogTitle>
        <div>
          <List>
            <ListItem button onClick={() => this.facebookSignIn()}>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>

              <ListItemText primary="facebook" style={styles.itemTextStyles} />
            </ListItem>
            <ListItem button onClick={() => this.googleSignIn()}>
              <ListItemIcon className={classes.iconContainer}>
                <img src={googleIcon} alt="google" style={{ height: "100%" }} />
              </ListItemIcon>

              <ListItemText primary="google" style={styles.itemTextStyles} />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }

  //Event Handlers
  facebookSignIn = () => {
    const { dispatch } = this.props;
    this.handleClose();
    this.props.signInFacebook(dispatch);
  };

  googleSignIn = () => {
    const { dispatch } = this.props;
    this.handleClose();
    this.props.signInGoogle(dispatch);
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };
}

//Styles
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  signInItem: {
    display: "flex",
    justifyContent: "center"
  },
  iconContainer: {
    height: "2em",
    width: "2em"
  },
  itemContainerStyle: {
    width: "100%",
    textAlign: "center"
  },
  itemTextStyles: {
    textAlign: "center",
    paddingRight: "0",
    fontVariant: "small-caps"
  }
};


SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const SimpleDialogWrapped = connect(
  
)(withStyles(styles)(SimpleDialog));

//Wrapper
class SignIn extends Component {
  state = {
    open: false
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} disableFocusRipple disableRipple>
          Sign In
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };
}

export default SignIn;
