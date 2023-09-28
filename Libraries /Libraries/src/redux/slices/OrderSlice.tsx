import { createSlice } from '@reduxjs/toolkit';

export type StoreOrderItemsType = {
  id: number | string;
  title: string;
};

const initialState: StoreOrderItemsType[] = [];
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    add: (state, action) => {
      const findOrder = state.find((order) => order.id === action.payload.id);
      console.log(findOrder);
      if (!findOrder) {
        state.push({
          id: action.payload.id,
          title: action.payload.title,
        });
      }
      return state;
    },
    remove: (state, action) => {
      const findOrderIndex = state.findIndex((order) => order.id === action.payload.id);
      //   const modifiedCart = [...state];

      state.splice(findOrderIndex, 1);
    },
    reset: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { add, remove, reset } = orderSlice.actions;
export default orderSlice.reducer;
