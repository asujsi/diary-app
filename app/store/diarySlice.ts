// diarySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface DiaryEntry {
  id: string;
  text: string;
}

interface DiaryState {
  entries: DiaryEntry[];
}

const initialState: DiaryState = {
  entries: [],
};

// Helper function to load entries from AsyncStorage
const loadEntriesFromStorage = async () => {
  const jsonValue = await AsyncStorage.getItem('diaryEntries');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<string>) {
      const newEntry: DiaryEntry = {
        id: uuid.v4() as string,
        text: action.payload,
      };
      state.entries.push(newEntry);
      saveEntriesToStorage(state.entries); // Save to AsyncStorage
    },
    editEntry(state, action: PayloadAction<{ id: string; newText: string }>) {
      const entry = state.entries.find(entry => entry.id === action.payload.id);
      if (entry) {
        entry.text = action.payload.newText;
        saveEntriesToStorage(state.entries); // Save to AsyncStorage
      }
    },
    deleteEntry(state, action: PayloadAction<string>) {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
      saveEntriesToStorage(state.entries); // Save to AsyncStorage
    },
  },
});

// Helper function to save entries to AsyncStorage
const saveEntriesToStorage = async (entries: DiaryEntry[]) => {
  await AsyncStorage.setItem('diaryEntries', JSON.stringify(entries));
};

export const { addEntry, editEntry, deleteEntry } = diarySlice.actions;
export default diarySlice.reducer;

// Load entries on app start
export const loadEntries = () => async (dispatch: any) => {
  const entries = await loadEntriesFromStorage();
  entries.forEach((entry: DiaryEntry) => {
    dispatch(addEntry(entry.text)); // Dispatch adding each entry to Redux
  });
};
