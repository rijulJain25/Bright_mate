import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ThemeState } from '../Context_theme';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [book, setBook] = React.useState({});

    const navigate = useNavigate();

    const {state, user} = ThemeState();
    const darkMode = state.darkMode;
  
    const fetchBook = async () => {
      await axios.get(`https://www.googleapis.com/books/v1/volumes/hCtnEAAAQBAJ?key=AIzaSyAxpVQAhff-6pBJavdZ7-Wr0LlWJWb3yJw`)
        .then(res => setBook(res.data)).catch(err => console.log(err));
    };
  
    useEffect(() => {
      fetchBook();
    }, []);

    console.log(book.volumeInfo?.imageLinks);

  return (
    <div style={{padding: 70, color: darkMode ? "white" : ''}} >
      <h1>YOUR CART</h1>
      {
        user ? (
        <div > 
             <div style={{height: 40}}> </div>
    <Card sx={{ maxWidth: 345, backgroundColor: darkMode ? "#363636": "", color: darkMode ? "white" : ''}} onClick = {() => navigate(`/book/hCtnEAAAQBAJ`)}>
      <CardMedia
        sx={{ height: 180 }}
        image={book.volumeInfo?.imageLinks && book.volumeInfo.imageLinks?.thumbnail }
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.volumeInfo?.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{backgroundColor: "green", color: "white"}} size="small">Available</Button>
      </CardActions>
    </Card></div>
        ): ""
      }
      
    </div>
  );
};

export default CartPage;
