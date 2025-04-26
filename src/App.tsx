import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { ApiProvider } from './context/ApiContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ProfileSelection from './components/ProfileSelection';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ApiProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/select-profile" element={<ProfileSelection />} />
          </Routes>
        </Router>
      </ApiProvider>
    </ThemeProvider>
  );
};

export default App;