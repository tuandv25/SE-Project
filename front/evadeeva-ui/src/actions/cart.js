export const resetCart = () => {
    return {
        type: 'RESET-CART',
    }
}

export const addCart = ({id, name, img_1, color, codePro, price, size, categoryId, count}) => {
    return {
        type: 'ADD-CART',
        data: {
            id,
            name,
            img_1,
            color,
            price,
            size,
            count,
            codePro,
            categoryId,
        }
    }
}

export const removeCart = (id, size) => {
    return {
        type: 'REMOVE-CART',
        id,
        size,
    }
}

export const changeQuantity = (id, size, quantity) => {
    return {
        type: "CHANGE-QUANTITY",
        id,
        size,
        quantity,
    }
}