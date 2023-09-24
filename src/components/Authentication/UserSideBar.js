import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Avatar } from '@mui/material';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import profile from '../../assets/profile.png'
import { ThemeState } from '../../Context_theme';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function UserSideBar() {
    const [states, setState] = React.useState({
        right: false,
    });

    const {state, user, setAlert }= ThemeState();
    const darkMode = state.darkMode;

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...states, [anchor]: open });
    };

    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth);
        setAlert({
          open: true,
          type: "success",
          message: "Logout Successfull !",
        });
    
        toggleDrawer();
      };

    const list = (anchor) => (
        <Box
            sx={{ height: "800px", width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,  backgroundColor: darkMode? "#28282B": '', color: darkMode? 'white': '' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List sx={{alignItems: 'center', display: "flex", flexDirection: "column"}}>
                <Avatar
                    alt="Remy Sharp"
                    src={profile}
                    sx={{ width: 150, height: 150,}}
                />
                 <ListItemText primary={user.email} />
            </List>
            <Divider />
            <List sx={{padding: "20px"}}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartCheckoutIcon sx={{color: darkMode? 'white': '' }}/>
              </ListItemIcon>
              <ListItemText onClick = {() => navigate(`/cart`)} primary="My Cart" />
            </ListItemButton>                
            <ListItemButton>
              <ListItemIcon>
                <InventorySharpIcon sx={{color: darkMode? 'white': '' }}/>
              </ListItemIcon>
              <ListItemText primary="My Rents" />
            </ListItemButton>   

            <ListItemButton onClick={logOut}>
              <ListItemIcon>
                <LogoutSharpIcon sx={{color: darkMode? 'white': '' }}/>
              </ListItemIcon>
              <ListItemText primary="Log-Out" />
            </ListItemButton>   

            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key="right">
                <Avatar onClick={toggleDrawer("right", true)} alt="avatar" src={profile} />
                <Drawer
                    anchor="right"
                    open={states["right"]}
                    onClose={toggleDrawer("right", false)}
                >
                    {list("right")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}