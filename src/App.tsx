import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './common/auth/AuthContext';
import { NotificationProvider } from './components/Notification/NotificationContext';
import Notification from './components/Notification/Notification';
import RoutesConfig from './config/routesConfig';
import theme from './config/theme';
import { ThemeProvider } from '@mui/material/styles';

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <RoutesConfig />
          </BrowserRouter>
          <Notification />
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
