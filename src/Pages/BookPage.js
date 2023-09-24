import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material';
import './BookPage.css';
import { ThemeState } from '../Context_theme';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';


const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = React.useState({});

  const {state, user, userCart, setAlert} = ThemeState();
  const darkMode = state.darkMode;

  const fetchBook = async () => {
    await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyAxpVQAhff-6pBJavdZ7-Wr0LlWJWb3yJw`)
      .then(res => setBook(res.data)).catch(err => console.log(err));
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const inUserCart = userCart.includes(book?.id);


  const addToCart = async () => {
    const bookRef = doc(db, "userCart", user.uid);

    try{
      await setDoc(bookRef,
          {
            books:userCart?[...userCart, book?.id]: [book?.id],
          }
        );

        setAlert({
          open: true,
          message: "Book added to your cart!",
          type: "success",
        });
    }catch(error){
      setAlert({
        open: true,
        message: "Oops! Something went wrong",
        type: "error",
      });
    }
  }


  const removeFromCart = async () => {
    const bookRef = doc(db, "userCart", user.uid);
    try {
      await setDoc(
        bookRef,
        { books: userCart.filter((wish) => wish !== book?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `Item Removed from the cart !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };



  const navigate = useNavigate();

  console.log(book);

  return (
    <div className='book-detail-head' style={{color: darkMode ? "white": ""}}>
     
      <div className='book-sidebar' >
        <span><img 
          src={book.volumeInfo?.imageLinks&&book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo?.title}
          height="200"
          style={{ marginBottom: 20}}
        /></span>

        <Typography
          variant='h3'
          className='typography-detail'
          style={{
            textAlign: "center",
            margin: "20px 0px 20px 0px",
            fontWeight: "bold",
            color: "var(--purple)"
          }}
        >
          {book.volumeInfo?.title}
        </Typography>

        <span style={{
          textTransform: "uppercase",
          fontSize: 15,
          fontWeight: "bold",
          color: darkMode ? "white" : "",
          margin: "20px 0px 20px 0px"
        }}>
          Autors:
          {book.volumeInfo?.authors}
        </span>

        <span
          style={{ 
            color: "darkgrey" ,
            margin: "1px 0px 20px 0px"  
          }}> Publishers: {book.volumeInfo?.publisher}
        </span>

        {user && 
        ( <Button 
          variant="outlined"
          style={{
          width: "70%",
          height: 40,
          backgroundColor: inUserCart? "#B33737": "var(--purple)",
          color: "white",
          fontWeight: "bold",
          border: "none"
        }}
        onClick={inUserCart ? removeFromCart : addToCart}
      >
        {!inUserCart ? <AddShoppingCartIcon />: <RemoveShoppingCartIcon />}{inUserCart ? "REMOVE FROM CART" : "ADD TO CART"}
      </Button>
          )}
        
      </div>

      <Container className='bookdetail-desc-head'>
        <div className='detail-desc'>
        <span className='detail-decs-span'
          style={{
            fontWeight: "bold",
            fontSize: 22
          }}
        >
            DESCRIPTION:
          </span>
          <span className='detail-decs-span'
          >
            {book.volumeInfo?.description}
          </span>

          <span className='detail-decs-other'>
            Page count: {book.volumeInfo?.pageCount}
          </span>
          <span className='detail-decs-other'>
            LANGUAGE: English
          </span>
          <span
          style={{ 
            color: "darkgrey" ,
            margin: "1px 0px 20px 0px"  
          }}> Published Date: {book.volumeInfo?.publishedDate}
        </span>
        </div>
        <div className='detail-dec-button'>
        <button onClick={() => window.open(book.volumeInfo?.infoLink, '_blank')} style={{border: "none", backgroundColor: book.accessInfo?.pdf.isAvailable === true ? "GREEN" : "RED", color:"white", padding: "10px 40px 10px 40px"}}> {book.accessInfo?.pdf.isAvailable === true ? "AVAILABLE " : "NOT- AVAILABLE"} </button>
        <button style={{border: "none", backgroundColor: "BLUE", color:"white", padding: "10px 40px 10px 40px"}}> {book.volumeInfo?.saleInfo?.saleability || "ONLY RENT"} </button>
        <button onClick={() => window.open(book.volumeInfo?.previewLink, '_blank')} style={{border: "none", backgroundColor: "var(--purple)", color:"white", padding: "10px 40px 10px 40px"}}> PREVIEW </button>
        
        </div>

        
      </Container>
      
    </div>
  )
}

export default BookPage





// https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyAxpVQAhff-6pBJavdZ7-Wr0LlWJWb3yJw`