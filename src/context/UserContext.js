import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get('https://reqres.in/api/users?page=1', {
      headers: {} 
    })
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

        
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
          { id: 3, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' },
          { id: 4, name: 'Bob White', email: 'bob@example.com', role: 'User' },
          { id: 5, name: 'Tom Hanks', email: 'tom@example.com', role: 'Manager' },
          { id: 6, name: 'Emma Stone', email: 'emma@example.com', role: 'Viewer' }
        ]);

        
        setError(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addUser = (user) => {
    setUsers(prev => [...prev, user]);
  };

  const updateUser = (updatedUser) => {
    setUsers(prev =>
      prev.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

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
