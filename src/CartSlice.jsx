import { createSlice } from '@reduxjs/toolkit';

// normalize cost to a number even if it comes like "$15"
const toNumber = (val) => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const n = parseFloat(val.replace(/[^0-9.]+/g, ''));
    return isNaN(n) ? 0 : n;
  }
  return 0;
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    // each item: { name, image, description, cost:number, quantity:number }
    items: [],
  },
  reducers: {
    // Add a plant; if it exists, increase quantity by 1
    addItem: (state, action) => {
      const p = action.payload || {};
      const name = p.name;
      if (!name) return;
      const existing = state.items.find((it) => it.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          name,
          image: p.image || '',
          description: p.description || '',
          cost: toNumber(p.cost),
          quantity: 1,
        });
      }
    },

    // Remove item entirely by name
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((it) => it.name !== name);
    },

    // payload: { name, amount }
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload || {};
      const item = state.items.find((it) => it.name === name);
      if (item && typeof amount === 'number' && !Number.isNaN(amount)) {
        item.quantity = Math.max(1, amount); // keep at least 1
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
