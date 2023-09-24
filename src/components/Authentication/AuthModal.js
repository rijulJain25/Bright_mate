import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AppBar, Box, Fade, Tab, Tabs } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Login from './Login';
import SignIn from './SignIn';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ThemeState } from '../../Context_theme';


const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 400,
      backgroundColor: "white",
      color: "white",
      borderRadius: 10,
    },
    google: {
      padding: 24,
      paddingTop: 0,
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      gap: 20,
      fontSize: 20,
    },
  }));
  

export default function BasicModal() {

    const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const { setAlert } = ThemeState();

  const googleProvider = new GoogleAuthProvider();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button 
        onClick={handleOpen}
        variant="contained"
        style={{
            width: 85,
            height: 40,
            marginLeft: 15,
            backgroundColor: "var(--purple)",
          }}
      >Log-In</Button>
      <Modal 
      className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
      >
         <Fade in={open}>
         <div className={classes.paper}>
            <AppBar
                position="static"
                style={{
                    backgroundColor: "transparent",
                    color: "white",
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    style={{ borderRadius: 10 }}
                >
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
              </Tabs>

            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignIn handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
         </div>
         </Fade>
      </Modal>
    </div>
  );
}