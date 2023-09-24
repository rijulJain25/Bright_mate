import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import './Carousel.css'
import { ThemeState, themeContext } from '../../Context_theme';

const Carousel = () => {

    const theme = ThemeState();
    const darkMode = theme.state.darkMode;

    const [paidbook, setpaidBook] = React.useState([]);

    const fetchpaidBooks = async () => {
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=flowers&filter=paid-ebooks&key=AIzaSyAxpVQAhff-6pBJavdZ7-Wr0LlWJWb3yJw`)
        .then(res => setpaidBook(res.data.items)).catch(err => console.log(err));
    };

    console.log(paidbook);

    useEffect(() => {
        fetchpaidBooks();
    }, []);

    const items = paidbook.map((book) => {
        let thumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
        let bookname = book.volumeInfo.title
        return(
            <div className = "carousel_item_div" style={{
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
            }}>
            <Link
            className='carousal_item'
            style={{
                flexDirection: "column",
                display: "flex",
                width: 110,
                padding: 7,
                height: 160,
                border: "1px solid",
                borderRadius: 10,
                backgroundColor: darkMode? "#343434" : "#E6E6E6",
                color: darkMode? "white" : '',
            }}
            to = {`/book/${book.id}`}
            >
                <img
                    src={thumbnail} alt={bookname} height="100" style={{marginBottom: 10}}
                />
                <span  style={{textAlign: "center"}}>
                    {bookname}
                </span>
                
            </Link>
            </div>
        )
    });

    const responsive = {
        0: {
            item: 2,
        },

        512: {
            items: 5,
        },
    }


  return (
    <div className='carousel-head'>

        <AliceCarousel 
            className= "alice-edit"
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            responsive={responsive}
            autoPlay
            items={items}
            disableButtonsControls
        />
    </div>
  )
}

export default Carousel