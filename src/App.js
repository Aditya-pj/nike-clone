import './App.css';
import { useSelector } from 'react-redux';
import AuthPage from './features/auth/auth';
import MainPage from './mainPage';
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Cart from './features/cart/cart';
import Favourites from './features/favourites/favourites';
import SignIn from './features/auth/signIn';
import Account from './features/auth/account';
import SearchResults from './searchResults';
import Navbar from './components/navbar';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="app-content">
      <Switch>
        <Route exact path="/">
          { isLoggedIn ? <MainPage/> : <Redirect to="/login"/>}
        </Route>
        <Route exact path="/login">
          { !isLoggedIn ? <AuthPage/> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/cart">
          { isLoggedIn ? <Cart/> : <Redirect to="/login"/>}
        </Route>
        <Route exact path="/favourites">
        { isLoggedIn ? <Favourites/> : <Redirect to="/login"/>}
        </Route>
        <Route exact path="/signin">
        { !isLoggedIn ? <SignIn/> : <Redirect to="/"/>}
        </Route>
        <Route exact path="/account">
        { isLoggedIn ? <Account/> : <Redirect to="/login"/>}
        </Route>
        <Route path="/search/:searchValue">
        {({match}) => 
          (
          isLoggedIn ? (<SearchResults searchValue={match.params.searchValue}/>) : (<Redirect to="/login"/>))}
        </Route>
      </Switch>
    </div>
  );
  }

export default App;


