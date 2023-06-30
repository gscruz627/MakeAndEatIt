import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    orders: [],
}

export const appSlice = createSlice({
    initialState,
    name: "app",
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setOrders: (state, action) => {
            state.orders = action.payload.orders;
        },
        setOrder: (state, action) => {
            const updatedOrders = state.orders.map( (order) => {
                if(order._id === action.payload.order._id){
                    return action.payload.order;
                } else {
                    return order;
                }
            });
            state.orders = updatedOrders;
        }
    }
})

export const { setLogin, setLogout, setOrders, setOrder } = appSlice.actions;
export default appSlice.reducer;