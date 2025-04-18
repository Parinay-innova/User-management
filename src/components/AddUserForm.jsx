

import React, { useState, useContext } from 'react';
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

const AddUserForm = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const { users, addUser } = useContext(UserContext);

  const handleSubmit = () => {
    if (!name || !email || !role) {
      setError('All fields are required.');
      return;
    }

    const emailExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (emailExists) {
      setError('A user with this email already exists.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role
    };

    addUser(newUser);
    setName('');
    setEmail('');
    setRole('');
    setError('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Add New User</Typography>

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Role"
          variant="outlined"
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
          Add User
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserForm;
