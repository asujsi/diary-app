// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import diaryReducer, { loadEntries } from './diarySlice';

const store = configureStore({
  reducer: {
    diary: diaryReducer,
  },
});

export default store;

export { loadEntries };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

