import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles'; 
import './index.css'; 
import App from './App.jsx';
import { createTheme } from '@mui/material/styles'; 
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Barlow, sans-serif', 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Barlow, sans-serif', 
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}> 
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </ThemeProvider>
  </StrictMode>
);
