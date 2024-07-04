import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToFavourites } from "../features/favourites/favouriteSlice";

const Card = () => {
    const user = useSelector(state => state.auth.user);
    const userEmail = user.email;
    const dispatch = useDispatch();
    const [prodList, setProdList] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/products')
        .then(res => res.json())
        .then(data => {
            setProdList(data);
            console.log(prodList);
        })},[])
    return ( 
        <div className="wrapper">
            <h1>All Products</h1>
<div className="cards-list">
        {/* <div className="fixed-bar">
                {/* <div className="fixed-bar-content"> */}
        
                    {/* <div className="right-opt">
                        Hide Filters
                        <button className="nav-btn"><i className="fa-solid fa-filter"></i></button>
                        Sort 
                        <button className="nav-btn"><i className="fa fa-sort"></i></button>
                    </div> */}
                {/* </div> */}
            {/* </div>  */}
            { prodList.map((prod) => (
            <div className="card" key={prod.id}>
                <img src={prod.imageUrl} alt="product" className="prod-img"/>
                <div className="card-content">
                    <div className="brand-name">{prod.productName}</div>
                    <div className="product-name">{prod.category}</div>
                    <div className="price">${prod.listPrice}</div>
                </div>
                <button className="catchy-btn" onClick={() => dispatch(addToCart({id: prod.id, productName: prod.productName, category: prod.category, listPrice: prod.listPrice, imageUrl: prod.imageUrl, userEmail }))}>Add to Cart</button>
                <button className="catchy-btn" onClick={() => dispatch(addToFavourites({id: prod.id, productName: prod.productName, category: prod.category, listPrice: prod.listPrice, imageUrl: prod.imageUrl, userEmail }))}>Add to Favourites</button>
            </div>
        ))}
        </div>
        </div>
    
     );
}
 
export default Card;