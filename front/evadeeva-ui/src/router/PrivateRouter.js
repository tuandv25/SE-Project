import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <div>
            <Route {...rest} component={(props) => (
                isAuthenticated ? <div><Component {...props}/></div> : <div><Redirect to="/"/></div>
            )}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.User.admin || state.User.staff
});

export default connect(mapStateToProps)(PrivateRoute);
