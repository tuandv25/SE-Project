const stateDefault = JSON.parse(window.localStorage.getItem('cartItems')) || [];
const cartReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'RESET-CART':
            window.localStorage.setItem('cartItems', JSON.stringify([]));
            return [];
        case 'ADD-CART':
            const isProductExist = state.findIndex((item) => item.id === action.data.id && item.size === action.data.size);
            if (isProductExist !== -1) {
                if(state[isProductExist].size!==action.data.size) {
                    window.localStorage.setItem('cartItems', JSON.stringify([
                        ...state,
                        action.data,
                    ]));
                    return [
                        ...state,
                        action.data,
                    ];
                } else {
                    action.data.count+=state[isProductExist].count;
                    const product1 = state.slice(0, isProductExist);
                    const product2 = state.slice(isProductExist + 1, state.length);
                    window.localStorage.setItem('cartItems', JSON.stringify([
                        ...product1,
                        action.data,
                        ...product2,
                    ]))
                    return [
                        ...product1,
                        action.data,
                        ...product2,
                    ];
                }
            } else {
                window.localStorage.setItem('cartItems', JSON.stringify([
                    ...state,
                    action.data,
                ]));
                return [
                    ...state,
                    action.data,
                ];
            }
        case "CHANGE-QUANTITY":
            const index = state.findIndex((item) => item.id === action.id && item.size === action.size);
            state[index].count = action.quantity;
            return [...state];
        case 'REMOVE-CART':
            const newState = state.filter(product => product.id !== action.id || product.size !== action.size);
            window.localStorage.setItem('cartItems', JSON.stringify(newState));
            return newState;
        default: return state;
    }
}

export default cartReducer;