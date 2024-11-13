
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
       
        state.items[existingItemIndex].quantity += 1;
      } else {
        
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        if (state.items[existingItemIndex].quantity > 1) {
         
          state.items[existingItemIndex].quantity -= 1;
        } else {
          
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

