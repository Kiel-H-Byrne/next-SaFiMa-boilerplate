import React, { Component } from "react";
import { connect } from "react-redux";

import { push } from "react-router-redux";
import * as ROUTES from "./../../Routes";

import AuthUserContext from "./context";
import { auth } from "./../../DB/firebase";

const withAuthorization = condition => AuthenticatedComponent => {
  class WithAuthorization extends Component {
    componentDidMount() {
      this.listener = auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.route(ROUTES.LANDING);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (condition(authUser) ? <AuthenticatedComponent {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  const mapDispatchToProps = dispatch => ({
    route: route => dispatch(push(route))
  });

  return connect(
    null,
    mapDispatchToProps
  )(WithAuthorization);
};

export default withAuthorization;
