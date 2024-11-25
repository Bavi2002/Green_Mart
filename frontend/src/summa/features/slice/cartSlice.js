import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                if (state.cartItems[itemIndex].cartQuantity < state.cartItems[itemIndex].countInStock) {
                    state.cartItems[itemIndex].cartQuantity += 1;
                }
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            state.cartTotalQuantity = state.cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
            state.cartTotalAmount = state.cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            state.cartTotalQuantity = state.cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
            state.cartTotalAmount = state.cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            state.cartTotalQuantity = state.cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
            state.cartTotalAmount = state.cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
        },
        getTotals: (state) => {
            state.cartTotalQuantity = state.cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
            state.cartTotalAmount = state.cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
        },
    },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, decreaseCart, getTotals } = cartSlice.actions;

export const getCartItems = (state) => state.carts.cartItems;
export const getCartTotalQuantity = (state) => state.carts.cartTotalQuantity;
export const getCartTotal = (state) => state.carts.cartTotalAmount;
export const getCartItemQuantity = (state, productId) => {
    const item = state.carts.cartItems.find((item) => item._id === productId);
    return item ? item.cartQuantity : 0;
};

  
