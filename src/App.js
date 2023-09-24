
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/BookPage';
import { ThemeState } from './Context_theme';
import Alert from './components/Alert.js';
import CartPage from './Pages/CartPage';
import { useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';

function App() {

  const {state, user} = ThemeState();
  const darkMode = state.darkMode;
  const [isLoading, setIsLoading] = useState(true);

  // Let create async method to fetch fake data
  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    };

    fakeDataFetch();
  }, []);


  return isLoading ? (
    <div style={{
      display: "flex",
      marginLeft: "40%",
      marginTop: 200
    }}><Dna
    visible={true}
    height="150"
    width="150"
    ariaLabel="dna-loading"
    wrapperStyle={{
    }}
    wrapperClass="dna-wrapper"
    className= "loader-pre"
  /></div>
    ) :(
    <div className='App' style={{backgroundColor: darkMode? '#1C1C1C	' : 'white'}}>
    <BrowserRouter>
      <div className="app-body">
        <Header />
        <Routes>
          <Route path = '/' element = {<HomePage />} />
          <Route path = '/book/:id' element = {<CoinPage />} />
          <Route path = '/cart' element = {<CartPage />} />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
    </div> );
}

export default App;
