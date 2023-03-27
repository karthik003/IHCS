import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoaderPrimary from "../layout/Loader/LoaderPrimary";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, userLoading }, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userLoading ? <LoaderPrimary /> : isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);
