import { Autocomplete, Button, Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeState, themeContext } from '../Context_theme';
import "./BookTable.css";

const BookTable = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);


    const theme = ThemeState();
    const darkMode = theme.state.darkMode;

    const navigate = useNavigate();

    const fetchBooks = async () => {
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=startIndex=0&maxResults=40&key=AIzaSyAxpVQAhff-6pBJavdZ7-Wr0LlWJWb3yJw`)
        .then(res => setBooks(res.data.items)).catch(err => console.log(err));

        setLoading(false);
    }

    const handleScroll = (e) => {
        const container = e.target;
        if (container.scrollHeight - container.scrollTop === container.clientHeight) {
            // User has scrolled to the bottom, fetch the next page of data
            setPage((prevPage) => prevPage + 1);
        }
    };
    console.log(books);

    const handleSearchChange = (event, value) => {
        setSearch(value); // Update the search term when the user selects a suggestion
      };

    const handleSearch = () => {
        if (search && search.trim() === "") {
          // If the search field is empty, return all books
          return books;
        } else {
          // Filter books based on the search term (title or author)
          return books.filter((book) =>
            book.volumeInfo.title.includes(search) ||
            (book.volumeInfo.authors && book.volumeInfo.authors.includes(search))
          );
        }
      };

      useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        console.log("Search term changed:", search);
      }, [search]);

      const sortByTitle = () => {
        const sortedBooks = [...books];
        sortedBooks.sort((a, b) =>
          a.volumeInfo.title.localeCompare(b.volumeInfo.title)
        );
        setBooks(sortedBooks);
      };

    const searchInput = (
        <Autocomplete sx={{bgcolor: darkMode? "white": "",}}
          options={books.map((book) => book.volumeInfo.title)} // Provide suggestions based on book titles
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="🔍 Search using TITLE OF BOOK..."
              variant="filled"
            />
          )}
        />
      );

      const searchInput2 = (
        <Autocomplete sx={{bgcolor: darkMode? "white": "",}}
          options={books.map((book) => book.volumeInfo.authors[0])} // Provide suggestions based on book titles
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="🔍  Search using AUTHOR OF BOOK.."
              variant="filled"
            />
          )}
        />
      );

      const searchInput3 = (
        <Autocomplete sx={{bgcolor: darkMode? "white": "",}}
          options={books.map((book) => book.volumeInfo.publishedDate)} // Provide suggestions based on book titles
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="🔍  Search using PUBLISH DATE(EX:YYYY-MM-DD) OR PUBLISHER"
              variant="filled"
            />
          )}
        />
      );

      const searchInput4 = (
        <Autocomplete sx={{bgcolor: darkMode? "white": "",}}
          options={books.map((book) => book.volumeInfo.categories)} // Provide suggestions based on book titles
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="🔍  Search using CATEGORY/GENRE"
              variant="filled"
            />
          )}
        />
      );


  return (
    <div>    
        <Container className = "table-head-container" style={{textAlign:"center"}}>
            <Typography
                variant='h4'
                style={{margin: 18, 
                    fontFamily: "Montserrat",
                    color: darkMode ? "white" : ""
                }}
            >
                Behold, a treasury of invaluable books awaits
            </Typography>

            {searchInput}
            <div style={{height: 20}}></div>
            {searchInput2}
            <div style={{height: 20}}></div>
            {searchInput3}
            <div style={{height: 20}}></div>
            {searchInput4}
            <div style={{height: 20}}></div>

            <div>
          <Button sx={{bgcolor: "var(--purple)", color: "white"}} onClick={sortByTitle}>Sort by Title</Button>
          {/* <button onClick={sortByAuthor}>Sort by Author</button> */}
        </div>
        <div style={{height: 20}}></div>
            <TableContainer onScroll={handleScroll}>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor: "#d13bff"}} />
                    ): ( 
                        <Table>
                            <TableHead style={{backgroundColor: "#d13bff"}} >
                                <TableRow>
                                    {["Book", "Author", "Price", "Availability"].map((head) =>(
                                        <TableCell
                                           className=''
                                            style={{
                                                color: "white",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Book" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    handleSearch().slice((page-1)*10, (page-1)*10+10).map(row =>{
                                        const title = row.volumeInfo.title;
                                        const publisher = row?.volumeInfo.publisher;
                                        const thumbnail = row?.volumeInfo.imageLinks && row?.volumeInfo.imageLinks.thumbnail;
                                        const bookPrice = row?.saleInfo.saleability === "NOT_FOR_SALE" ? "NOT_FOR_SALE" : (row?.saleInfo.retailPrice&& row?.saleInfo.retailPrice.amount);
                                        return (
                                            <TableRow
                                            onClick = {() => navigate(`/book/${row.id}`)}
                                            className= "table-rows"
                                            key= {row.volumeInfo.title}
                                            style={{
                                                backgroundColor: darkMode ? 'black': ""
                                            }}
                                            >
                                                <TableCell 
                                                    component='th'
                                                    
                                                    scope='row'
                                                    style={{
                                                        display:"flex",
                                                        gap: 15,
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <img
                                                        src={thumbnail}
                                                        alt = "image"
                                                        height="70"
                                                        style={{marginBottom: 10}} />
                                                    
                                                    <div style={{
                                                        display: "flex", flexDirection: "column"}}
                                                    >
                                                        <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 11,
                                                            fontWeight: "bold",
                                                            color: darkMode ? "white": ""
                                                        }}>
                                                            {title}
                                                        </span>

                                                        <span
                                                            style={{color: "darkgrey"}}> {publisher}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell align='right'>
                                                    <span style={{fontSize: 12, color: darkMode ? "white": ""}}>{row?.volumeInfo.authors[0]}</span>
                                                </TableCell>

                                                <TableCell align='right'>
                                                    <span style={{fontSize: 12, color: darkMode ? "white": ""
                                                    }}>{bookPrice === "NOT_FOR_SALE" ? bookPrice: "₹"+bookPrice}</span>
                                                </TableCell>

                                                <TableCell align='right'>
                                                    <span style={{fontSize: 12,
                                                    color: "green",
                                                    }}>Available</span>
                                                </TableCell>


                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <div style={{height: 20,}}></div>
            <Container style={{width: "300px", display: "flex", flexDirection: "row", padding: 10, borderRadius: 30, backgroundColor: "#d260f7"}}>
            <Pagination 
                theme= 'primary'
                sx={{
                    padding: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "var(--purple)"
                }}
                variant='outlined'
                count={(handleSearch()?.length/10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />

            </Container>
            <div style={{height: 30,}}></div>
        </Container>
    </div>
  )
}

export default BookTable