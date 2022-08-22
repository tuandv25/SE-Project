const eventReducer = (state=0, action) => {
    switch (action.type) {
        case 'SET-EVENT': return action.data
        default: return state;
    }
}
export default eventReducer;