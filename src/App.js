// src/App.js

import React from 'react';
import UserTable from './components/UserTable';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App" style={{ padding: '20px' }}>
        <h1>User Management DataGrid</h1>
        <UserTable />
      </div>
    </UserProvider>
  );
}

export default App;
