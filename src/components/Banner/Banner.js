import React, { useContext } from 'react'
import './Banner.css'
import { Container, Typography } from '@mui/material'
import { ThemeState, themeContext } from '../../Context_theme';
import Carousel from './Carousel';

const Banner = () => {
    const theme = ThemeState();
    const darkMode = theme.state.darkMode;
  return (
    <div className='banner-head'>
        <Container className='banner-content'>
            <div className='banner-tagline'>
                <Typography
                variant='h2'
                className='banner-heading'
                style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "'Montserrat', sans-serif",
                }}>
                    BRIGHT MATE
                </Typography>

                <Typography
                variant='subtitle2'
                style={{
                    color: 'darkgrey',
                    textTransform: "capitalize",
                    fontFamily: "'Montserrat', sans-serif",
                }}>
                    A digital platform designed to efficiently catalog, track, and manage a library's collection of books and resources. We simplifies tasks such as book lending, returns, and reservations, while also providing users with a convenient way to search for and access library materials.
                </Typography>

            </div>

            <Carousel />

        </Container>
    </div>
  )
}

export default Banner