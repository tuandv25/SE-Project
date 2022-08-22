import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";

// Main Page: Home, Cart, User, Checkout, Products, Detail Product
import Home from "../pages/Home";
import Products from "../pages/Products";
import PageError from "../pages/PageError";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductDetailBody from "../components/ProductComponents/ProductDetailBody";
import ProductDetailAccessory from "../components/ProductComponents/ProductDetailAccessory";
import ProductFilterAccessory from "../components/ProductComponents/ProductFilterAccessory";
import ProductFilterBody from "../components/ProductComponents/ProductFilterBody";
import User from "../pages/User";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UpdateUserPage from "../pages/UpdateUserPage";

import Order from "../admin/components/Order";
import ManagerUser from "../admin/components/ManagerUser";
import Voucher from "../admin/components/Voucher";
import Event from "../admin/components/Event";
import ProductOffline from "../admin/ProductOffline";
import Product_Admin from "../admin/components/Product_Admin";

export const history = createBrowserHistory();
const AppRouter = ({ user }) => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path='/' component={Home} exact={true} />
          <Route path='/products' component={Products} />
          <Route path='/cart' component={Cart} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/detail/:code' component={ProductDetailBody} />
          <Route
            path='/detailaccessory/:code'
            component={ProductDetailAccessory}
          />
          <Route path='/accessory' component={ProductFilterAccessory} />
          <Route path='/dress' component={ProductFilterBody.FilterDress} />
          <Route path='/t_shirt' component={ProductFilterBody.FilterT_Shirt} />
          <Route
            path='/jumpsuit'
            component={ProductFilterBody.FilterJumpSuit}
          />
          <Route path='/shirt' component={ProductFilterBody.FilterShirt} />
          <Route path='/skirt' component={ProductFilterBody.FilterSkirt} />
          <Route
            path='/trousers'
            component={ProductFilterBody.FilterTrousers}
          />
          <Route path='/account' component={User} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/update-information' component={UpdateUserPage} />

          <PrivateRouter
            path='/admin-offline-product'
            component={ProductOffline}
          />
          <PrivateRouter path='/admin-order' component={Order} />
          <PrivateRouter path='/admin-voucher' component={Voucher} />
          <PrivateRouter path='/admin-event' component={Event} />
          {user.admin && (
            <PrivateRouter path='/admin-user' component={ManagerUser} />
          )}
          {user.admin && (
            <PrivateRouter path='/admin-product' component={Product_Admin} />
          )}

          <Route component={PageError} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};

export default connect(mapStateToProps)(AppRouter);
