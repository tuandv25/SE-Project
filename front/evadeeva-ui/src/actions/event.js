export const startSetEvent = (event) => {
    return {
        type: 'START-SET-EVENT',
        data: event,
    }
}

export const setEvent = (data) => {
    return {
        type: 'SET-EVENT',
        data,
    }
}

export const addEvent = (event) => {
    return {
        type: 'ADD-EVENT',
        data: event,
    }
}

export const removeEvent = (id) => {
    return {
        type: 'REMOVE-EVENT',
        id,
    }
}

export const updateEvent = (id, data) => {
    return {
        type: 'UPDATE-EVENT',
        id,
        data,
    }
}