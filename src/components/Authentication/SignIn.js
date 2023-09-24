import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase'
import { ThemeState } from '../../Context_theme';

const SignIn = ({ handleClose }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPass, setConfirmPass] = useState("");

   const { setAlert } = ThemeState();

   const handleSubmit = async () => {
    if(password !== confirmPass){
        setAlert({
            open: true,
            message: "Passwords do not match",
            type: "error",
        });
        return;
    }

    try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
          type: "success",
        });
  
        handleClose();
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      }
   }

    return (
    <Box 
    p={3}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
    >
        <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        fullWidth
      />

    <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "var(--purple)" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  )
}

export default SignIn