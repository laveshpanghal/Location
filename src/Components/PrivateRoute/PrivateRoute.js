import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector((state) => state.firebase.auth);
    if (!isLoaded(auth) && isEmpty(auth)) return <Redirect to="/login" />;
    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);