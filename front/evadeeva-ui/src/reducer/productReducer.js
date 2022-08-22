const productReducer = (state=[], action) => {
    switch (action.type) {
        case 'START-SET-PRODUCT':
            return [
                ...action.data,
            ]
        case 'ADD-PRODUCT':
            return [
                ...state,
                action.data,
            ]
        case 'REMOVE-PRODUCT':
            return state.filter((item) => item.id !== action.id);
        case 'UPDATE-PRODUCT':
            return state.map((item) => {
                if(item.id === action.id) {
                    return {
                        ...item,
                        ...action.product,
                    }
                } else {
                    return item;
                }
            })
        default: return state;
    }
}

export default productReducer;
