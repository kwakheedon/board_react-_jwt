import React, { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import { useAuthStore } from './stores/useAuthStore';


function App() {

   useEffect(() => {
    useAuthStore.getState().initializeAuth();
  }, []);


  return (

      <AppRouter />
  
  );
}

export default App;
