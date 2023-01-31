import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartItems = removeItem;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setCart: (state, action) => {
      state.cartItems = action.payload.items
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  setCart,
  orders
} = cartSlice.actions;