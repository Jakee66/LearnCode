import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '@/api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // The session lives in localStorage, so it can be read synchronously.
  const [user, setUser] = useState(() => api.auth.current());

  const checkUserAuth = useCallback(async () => {
    setUser(api.auth.current());
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    api.auth.logout('/login');
  }, []);

  const navigateToLogin = useCallback(() => {
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingAuth: false,
        isLoadingPublicSettings: false,
        authError: null,
        appPublicSettings: null,
        authChecked: true,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState: checkUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
