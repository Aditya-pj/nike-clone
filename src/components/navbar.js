import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Navigate } from 'react-router-dom';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const [isToBeRedirected, setIsToBeRedirected] = useState(false);
    const handleRedirect = (event) => {
        event.preventDefault();
        if (searchValue.trim() !== "")
        {
            setIsToBeRedirected(true);
           
        }
    };
    if (isToBeRedirected)
    {
        return <Navigate to={`/search/${encodeURIComponent(searchValue)}`}/>
    }
        
    return ( 
        <nav>
            <div className="top-nav">
                <a href="/"><img src="/Jumpman_logo_nike.png" alt="home" height="20"/></a>
                <div className="link-list">
                    <ul>
                        <li><a href="/">Find a Store</a></li>
                        <li>|</li>
                        <li><a href="/">Help</a></li>
                        <li>|</li>
                        <li><a href="/">Join Us</a></li>
                        <li>|</li>
                        <li><a href="/" onClick={() => {dispatch(logout())}}>Logout</a></li>
                    </ul>
                </div>
            </div>
            <div className="bottom-nav">
                <img className="logo" src="/nike_logo.jpg" height="60" alt="Nike logo"/>
                <div className="link-list-big">
                    <ul>
                        <li><a href="/">New & Featured</a></li>
                        <li><a href="/">Men</a></li>
                        <li><a href="/">Women</a></li>
                        <li><a href="/">Kids</a></li>
                        <li><a href="/">Sale</a></li>
                        <li><a href="/">Customise</a></li>
                        <li><a href="/">SNKRS</a></li>
                    </ul>
                </div>
                <div className="right-nav">
                    <form onSubmit={(event)=>{handleRedirect(event)}}>
                        <button><i className="fa fa-search icon"></i></button>
                        <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} type="text" name="search" placeholder="Search"/> 
                    </form>  
                    <a href="/favourites"><button id="heart-btn" className="nav-btn"><i className="far fa-heart icon" aria-hidden="true"></i></button></a>
                    <a href="/cart"><button id="bag-btn" className="nav-btn"><i className="fa fa-shopping-bag" aria-hidden="true"></i></button></a>
                    <a href="/account"><button id="user-btn" className="nav-btn"><i className="fa-solid fa-user"></i></button></a>
                    
                </div>
            </div>
            
        </nav>
     );
}
 
export default Navbar;