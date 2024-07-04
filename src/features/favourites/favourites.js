import { useDispatch, useSelector } from "react-redux";
import { addToFavourites, removeFromFavourites } from "./favouriteSlice";
import Navbar from "../../components/navbar";

const Favourites = () => {
    const favourites = useSelector((state) => state.favourites);
    const itemList = favourites.itemList;
    const user = useSelector(state => state.auth.user);
    const userEmail = user.email;
    const dispatch = useDispatch();
    return ( 
        <div className="favourites">
            <Navbar/>
            <h1 className="cart-h1">Favourites</h1>
            <div className="cards-list">
            { itemList.filter(item => item.userEmail == userEmail).map((prod) => (
                    <div className="card" key={prod.id}>
                        <img src={prod.imageUrl} alt="product" class="prod-img"/>
                        <div className="card-content">
                            <div className="brand-name">{prod.productName}</div>
                            <div className="product-name">{prod.category}</div>
                            <div className="price">${prod.listPrice}</div>
                        </div>
                        <button class="catchy-btn" onClick={() => dispatch(removeFromFavourites({id: prod.id, productName: prod.productName, category: prod.category, listPrice: prod.listPrice, imageUrl: prod.imageUrl, userEmail }))}>Remove from Favourites</button>
                    </div>
            ))}
            </div>
        </div>
     );
}
 
export default Favourites;