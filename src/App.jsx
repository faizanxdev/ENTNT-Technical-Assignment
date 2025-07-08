import React, { useEffect } from 'react';
import { initLocalStorage } from './data/mockData';
import AppRouter from './AppRouter';

function App() {
  useEffect(() => {
    initLocalStorage(); //  to load admin & patient user data
  }, []);

  return <AppRouter />;
}

export default App;
