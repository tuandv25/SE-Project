import { firebase, provider } from "../firebase/firebase";
import { resetCart } from "./cart";
import loginUser from '../mutation/loginUser';

export const login = (user) => {
    return {
        type: 'LOGIN',
        user,
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}

export const startSetLogin = ({name, email}) => {
    return (dispatch) => {
        return loginUser({name, email}, dispatch);
    }
}

export const startLogin = (email,pass) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        })
    }
}

export const stopLogin = () => {
    return (dispatch) => {
        return firebase.auth().signOut();
    }
}

export const order = (data) => {
    return {
        type: 'ORDER',
        data,
    }
}

export const cancelOrder = (id) => {
    return {
        type: 'CANCEL',
        id,
    }
}