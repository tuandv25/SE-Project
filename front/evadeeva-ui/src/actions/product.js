export const startSetProduct = (product) => {
    return {
        type: 'START-SET-PRODUCT',
        data: product,
    }
}

export const addProduct = (product) => {
    return {
        type: 'ADD-PRODUCT',
        data: product,
    }
}

export const removeProduct = (id) => {
    return {
        type: 'REMOVE-PRODUCT',
        id,
    }
}

export const updateProduct = (id, product) => {
    return {
        type: 'UPDATE-PRODUCT',
        id,
        product,
    }
}