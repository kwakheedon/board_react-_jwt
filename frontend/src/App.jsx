import React, { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import { useAuthStore } from './stores/useAuthStore';
import { BrowserRouter } from 'react-router-dom'; 

function App() {

   useEffect(() => {
    useAuthStore.getState().initializeAuth();
  }, []);


  return (
    
    
     <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
