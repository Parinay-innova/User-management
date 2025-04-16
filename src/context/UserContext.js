// src/context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get('https://reqres.in/api/users')
      .then(response => {
        const data = response.data.data.map(user => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: 'User'
        }));
        setUsers(data);
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        setError('Failed to load users. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Add user
  const addUser = (user) => {
    setUsers(prev => [...prev, user]);
  };

  // Update user
  const updateUser = (updatedUser) => {
    setUsers(prev => prev.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  // Delete user
  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <UserContext.Provider value={{
      users,
      loading,
      error,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
