

// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Modal,
//   Box,
//   TextField,
//   Button,
//   Typography
// } from '@mui/material';
// import { UserContext } from '../context/UserContext';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'white',
//   borderRadius: '8px',
//   boxShadow: 24,
//   p: 4
// };

// const EditUserForm = ({ open, handleClose, userData }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');

//   const { updateUser } = useContext(UserContext);

//   useEffect(() => {
//     if (userData) {
//       setName(userData.name);
//       setEmail(userData.email);
//       setRole(userData.role);
//     }
//   }, [userData]);

//   const handleSubmit = () => {
//     if (!name || !email || !role) {
//       alert('All fields are required.');
//       return;
//     }

//     const updatedUser = {
//       ...userData,
//       name,
//       email,
//       role
//     };

//     updateUser(updatedUser);
//     handleClose();
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" mb={2}>Edit User</Typography>

//         <TextField
//           fullWidth
//           label="Name"
//           variant="outlined"
//           margin="normal"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <TextField
//           fullWidth
//           label="Email"
//           variant="outlined"
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <TextField
//           fullWidth
//           label="Role"
//           variant="outlined"
//           margin="normal"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         />

//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           onClick={handleSubmit}
//         >
//           Save Changes
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default EditUserForm;
