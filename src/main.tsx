import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './pages/App';
import { ConfigProvider, App as AntApp } from 'antd';
import { AntdTheme } from './utils/theme';
import AuthGuard from './pages/AuthGuard';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './i18n'; // Ensure i18n is initialized
import 'react-tabulator/lib/styles.css';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={AntdTheme}>
      <AuthGuard>
        <AntApp>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AntApp>
      </AuthGuard>
    </ConfigProvider>
  </StrictMode>
);
