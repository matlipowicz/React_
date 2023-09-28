import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import moneyReducer from '../slices/MoneySlice';
import orderReducer from '../slices/OrderSlice';

const reducer = combineReducers({
  money: moneyReducer,
  order: orderReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export const useAppDispatch: () => DispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
