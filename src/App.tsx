import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import MainNavigation from './MainNavigation';
import { BrowserRouter } from 'react-router-dom';
import './index.css';



function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProvider>
        <MainNavigation/>
      </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
