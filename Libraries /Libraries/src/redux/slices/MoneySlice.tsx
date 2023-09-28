import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  amount: number;
};

const initialState: InitialState = { amount: 0 };
const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {
    withdraw: (state, action: PayloadAction<number>) => {
      state.amount -= action.payload;
    },
    deposit: (state, action: PayloadAction<number>) => {
      state.amount += action.payload;
    },
  },
});

export default moneySlice.reducer;
export const { withdraw, deposit } = moneySlice.actions;
