import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    dicrementItem(state, action) {
      console.log(action.payload);
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem.count > 1) {
        findItem.count--;
        const priceOfDeletedItem = findItem.count * findItem.price;
        if (state.totalPrice - priceOfDeletedItem >= 0) {
          state.totalPrice = state.totalPrice - priceOfDeletedItem;
        }
      }
    },
    removeItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      const priceOfDeletedItem = findItem.count * findItem.price;
      if (state.totalPrice - priceOfDeletedItem >= 0) {
        state.totalPrice = state.totalPrice - priceOfDeletedItem;
      }
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItem, dicrementItem } = cartSlice.actions;

export default cartSlice.reducer;
