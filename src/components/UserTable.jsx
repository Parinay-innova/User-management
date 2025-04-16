// src/components/UserTable.jsx

import React, { useContext, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Typography } from '@mui/material';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import { UserContext } from '../context/UserContext';

const UserTable = () => {
    const {
      users,
      deleteUser,
      loading,
      error
    } = useContext(UserContext);
  
  

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (user) => {
    const confirm = window.confirm(`Are you sure you want to delete ${user.name}?`);
    if (confirm) {
      deleteUser(user.id);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEditClick(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteUser(params.row)}
          >
            Delete
          </Button>
        </>
      )
    }
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ marginBottom: 16 }}>
        <Button variant="contained" onClick={() => setOpenAddModal(true)}>
          + Add User
        </Button>
      </div>

      {/* Spinner or Error */}
      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: 50 }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      ) : (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      )}

      {/* Add User Modal */}
      <AddUserForm
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
      />

      {/* Edit User Modal */}
      <EditUserForm
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        userData={selectedUser}
      />
    </div>
  );
};

export default UserTable;
