import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth, db } from "./firebase";
import axios from "axios";
import { doc, onSnapshot } from "firebase/firestore";

export const themeContext = createContext();

const initialState = { darkMode: false };

const themeReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
        return { darkMode: !state.darkMode };
      default:
        return state;
  }
};

export const ThemeProvider = ({children}) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [userCart, setUserCart] = useState([]);
  const [books, setBooks] = useState([]);
  const [Loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=startIndex=0&maxResults=40&key=AIzaSyAxpVQAhff-6pBJavdZ7-Wr0LlWJWb3yJw`)
    .then(res => setBooks(res.data.items)).catch(err => console.log(err));

    setLoading(false);
}

  useEffect(() => {
    if (user) {
      const bookRef = doc(db, "userCart", user?.uid);
      var unsubscribe = onSnapshot(bookRef, (book) => {
        if (book.exists()) {
          console.log(book.data().books);
          setUserCart(book.data().books);
        } else {
          console.log("Cart is Empty");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (
    <themeContext.Provider value={{state, dispatch, alert, setAlert, user, userCart, books}}>{children}</themeContext.Provider>
  );
};


export const ThemeState = () => {
  return useContext(themeContext);
};