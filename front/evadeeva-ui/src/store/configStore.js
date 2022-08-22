import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import accessoryReducer from '../reducer/accessoryReducer';
import adminReducer from '../reducer/adminReducer';
import cartReducer from '../reducer/cartReducer';
import eventReducer from '../reducer/eventReducer';
import eventsReducer from '../reducer/eventsReducer';
import orderReducer from '../reducer/orderReducer';
import productReducer from '../reducer/productReducer';
import userReducer from '../reducer/userReducer';
import voucherBirthdayReducer from '../reducer/voucherBirthdayReducer';
import voucherPremiumReducer from '../reducer/voucherPremiumReducer';
import voucherReducer from '../reducer/voucherReducer';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const configStore = () => {
    return createStore (
        combineReducers (
            {
                Accessory: accessoryReducer,
                UserList: adminReducer,
                Cart: cartReducer,
                Event: eventReducer,
                Events: eventsReducer,
                Order: orderReducer,
                Product: productReducer,
                User: userReducer,
                VoucherPremium: voucherPremiumReducer,
                Voucher: voucherReducer,
                VoucherBirthday: voucherBirthdayReducer,
            }
        ),
        composeEnhancers(applyMiddleware(thunk)),
    )
}

export default configStore;
