import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:5001/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSurvey, setHasSurvey] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const surveyData = localStorage.getItem('surveyData');

    if (token && userData) {
      setUser(JSON.parse(userData));
      setHasSurvey(!!surveyData);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('surveyData');
    setUser(null);
    setHasSurvey(false);
  };

  return { user, loading, hasSurvey, logout, checkAuth };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const hasSurveyData = () => {
  return !!localStorage.getItem('surveyData');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};