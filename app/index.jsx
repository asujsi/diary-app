// index.jsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store, { loadEntries } from './store/store';
import AppContainer from './components/AppContainer';
import DiaryApp from './components/DiaryApp';

export default function App() {
  useEffect(() => {
    store.dispatch(loadEntries()); // Load entries on app start
  }, []);

  return (
    <Provider store={store}>
      <AppContainer>
        <DiaryApp />
      </AppContainer>
    </Provider>
  );
}
