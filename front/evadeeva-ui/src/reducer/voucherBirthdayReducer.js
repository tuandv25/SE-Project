const voucherBirthdayReducer = (state=[], action) => {
    switch (action.type) {
        case 'START-SET-VOUCHER-BIRTHDAY':
            return [
                ...action.data,
            ]
        case 'ADD-VOUCHER-BIRTHDAY':
            return [
                ...state,
                action.data,
            ]
        case 'REMOVE-VOUCHER-BIRTHDAY':
            return state.filter((item) => item.id !== action.id);
        case 'UPDATE-VOUCHER-BIRTHDAY':
            return state.map((item) => {
                if(item.id === action.id) {
                    return {
                        ...item,
                        ...action.voucher,
                    }
                } else {
                    return item;
                }
            })
        default: return state;
    }
}

export default voucherBirthdayReducer;
