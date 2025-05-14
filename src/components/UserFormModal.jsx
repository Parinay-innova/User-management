import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { UserContext } from '../context/UserContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4
};

const UserFormModal = ({ open, handleClose, isEditMode, existingUser = null }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const { users, addUser, updateUser } = useContext(UserContext);

  useEffect(() => {
    if (isEditMode && existingUser) {
      setName(existingUser.name);
      setEmail(existingUser.email);
      setRole(existingUser.role);
    } else {
      setName('');
      setEmail('');
      setRole('');
    }
    setError('');
  }, [isEditMode, existingUser, open]);

  const handleSubmit = () => {
    if (!name || !email || !role) {
      setError('All fields are required.');
      return;
    }

    const emailExists = users.some(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        (!isEditMode || u.id !== existingUser.id)
    );

    if (emailExists) {
      setError('A user with this email already exists.');
      return;
    }

    const userPayload = {
      id: isEditMode ? existingUser.id : Date.now(),
      name,
      email,
      role
    };

    if (isEditMode) {
      updateUser(userPayload);
    } else {
      addUser(userPayload);
    }

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {isEditMode ? 'Edit User' : 'Add New User'}
        </Typography>

        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          disabled={isEditMode}
        />
        <TextField
          fullWidth
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
        />

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {isEditMode ? 'Save Changes' : 'Add User'}
        </Button>
      </Box>
    </Modal>
  );
};

export default UserFormModal;
