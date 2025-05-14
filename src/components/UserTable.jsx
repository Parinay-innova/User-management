import React, { useContext, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  CircularProgress,
  Typography,
  Paper,
  Container,
  Stack
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import UserFormModal from './UserFormModal';
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
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEditClick(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteUser(params.row)}
          >
            Delete
          </Button>
        </Stack>
      )
    }
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          User Management
        </Typography>

        <Stack direction="row" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddModal(true)}
          >
            Add User
          </Button>
        </Stack>

        {loading ? (
          <Stack alignItems="center" mt={4}>
            <CircularProgress />
          </Stack>
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
            autoHeight
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        )}

        {/* Unified Add/Edit User Modal */}
        <UserFormModal
          open={openAddModal || openEditModal}
          handleClose={() => {
            setOpenAddModal(false);
            setOpenEditModal(false);
            setSelectedUser(null);
          }}
          isEditMode={openEditModal}
          existingUser={selectedUser}
        />
      </Paper>
    </Container>
  );
};

export default UserTable;
