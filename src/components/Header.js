import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { ThemeState } from '../Context_theme';
import Toggle from './Toggle.js';
import logo from '../assets/logo.png'
import AuthModal from './Authentication/AuthModal';
import UserSideBar from './Authentication/UserSideBar';

const Header = () => {

    const navigate = useNavigate();

    const {state, user }= ThemeState();
    const darkMode = state.darkMode;

    return (
        <AppBar position='static' style={{
            backgroundColor: darkMode ? 'black' : 'white',
          }}>
            <Container>
                <Toolbar>
                    <img src={logo} className='logo-nav'></img>
                    <Typography variant='h5' onClick={() => navigate('/')} className='nav-header' style={{fontWeight: "bold"}}>
                        BrightMate
                    </Typography>
                    <Toggle />
                    <div style={{width: 10}}></div>
                    {user? <UserSideBar /> : <AuthModal />}
                </Toolbar>
            </Container>

        </AppBar>
    )
}

export default Header