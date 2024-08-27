import Navbar from "./components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "./features/cart/cartSlice";
import { addToFavourites } from "./features/favourites/favouriteSlice";
import axios from "axios";


const SearchResults = ({searchValue}) => {
    
    const user = useSelector(state => state.auth.user);
    const userEmail = user.email;
    const dispatch = useDispatch();
    const [searchproducts, setSearchproducts] = useState([]);
    const [prodList, setProdList] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        
        axios.get('http://localhost:8000/products')
        .then(response => {
            setProdList(response.data);
            setisLoading(false);
            setError(null);
           
        })
        .catch(error => {
            setError(error);
            setisLoading(false);
})},[]);

useEffect(() => {
    if (prodList.length > 0)
    {
        setSearchproducts(prodList.slice(0,100).filter((prod) => 
        (prod.productName.toLowerCase().includes(searchValue.toLowerCase()) || prod.category.toLowerCase().includes(searchValue.toLowerCase()))));
        console.log(prodList, searchproducts);

        
    }
    
},[prodList, searchValue])

    return ( 
        <div className="search-div">
            <Navbar/>
            <h1>Search Results for: {searchValue}</h1>
            <div className="cards-list search-cards">
                {(searchproducts.length>0) ?
                    (searchproducts.map(prod => (
                        <div className="card" key={prod.id}>
                    <img src={prod.imageUrl} alt="product" className="prod-img"/>
                    <div className="card-content">
                    <div className="brand-name">{prod.productName}</div>
                    <div className="product-name">{prod.category}</div>
                    <div className="price">${prod.listPrice}</div>
                    </div>
                    <button className="catchy-btn" onClick={() => dispatch(addToCart({id: prod.id, productName: prod.productName, category: prod.category, listPrice: prod.listPrice, imageUrl: prod.imageUrl, userEmail }))}>Add to Cart</button>
                    <button className="catchy-btn" onClick={() => dispatch(addToFavourites({id: prod.id, productName: prod.productName, category: prod.category, listPrice: prod.listPrice, imageUrl: prod.imageUrl, userEmail }))}>Add to Favourites</button>
                    </div>))) : (<div></div>)}
                    {(searchproducts.length == 0 && isLoading == false) ? <div>No search results found.</div> : <div></div>}
                    {isLoading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                
            </div>       
        </div>
                    
     );
}
 
export default SearchResults;