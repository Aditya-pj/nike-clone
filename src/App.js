import './App.css';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './features/auth/auth';
import MainPage from './mainPage';
import Cart from './features/cart/cart';
import Favourites from './features/favourites/favourites';
import SignIn from './features/auth/signIn';
import Account from './features/auth/account';
import SearchResults from './searchResults';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="app-content">
      <Routes>
        <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/favourites" element={isLoggedIn ? <Favourites /> : <Navigate to="/login" />} />
        <Route path="/signin" element={!isLoggedIn ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/login" />} />
        <Route path="/search/:searchValue" element={isLoggedIn ? <SearchResults /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
