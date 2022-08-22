export const startSetVoucherBirthday = (voucher) => {
    return {
        type: 'START-SET-VOUCHER-BIRTHDAY',
        data: voucher,
    }
}

export const addVoucherBirthday = (voucher) => {
    return {
        type: 'ADD-VOUCHER-BIRTHDAY',
        data: voucher,
    }
}

export const removeVoucherBirthday = (id) => {
    return {
        type: 'REMOVE-VOUCHER-BIRTHDAY',
        id,
    }
}

export const updateVoucherBirthday = (id, voucher) => {
    return {
        type: 'UPDATE-VOUCHER-BIRTHDAY',
        id,
        voucher,
    }
}