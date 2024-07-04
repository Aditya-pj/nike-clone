import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, removeAll } from "./cartSlice";
import Navbar from "../../components/navbar";
const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector(state => state.auth.user);
    const userEmail = user.email;
    
    const itemList = cart.itemList;
    const dispatch = useDispatch();
    return ( 
        <div className="cart">
            <Navbar/>
            <h1 className="cart-h1">Cart</h1>
            <div className="cart-details">
                
                <div><b>{cart.noOfItems[userEmail] ?? 0}</b> items in cart</div>
                <div>Total:  <b>${cart.totalPrice[userEmail] ?? 0}</b></div>
            </div>
            <div className="cards-list">
            { itemList.filter(item => item.userEmail == userEmail).map((prod) => (
                    <div className="card" key={prod.id}>
                        <img src={prod.imageUrl} alt="product" className="prod-img"/>
                        <div className="card-content">
                            <div className="brand-name">{prod.productName}</div>
                            <div className="product-name">{prod.category}</div>
                            <div className="price">${prod.listPrice}</div>
                        </div>
                        <div className="price">Total: ${prod.totalPriceItem}</div>
                        <button className="add-or-remove-btn">
                            <button className="in-btn-cart" onClick={() => dispatch(addToCart({id: prod.id, listPrice: prod.listPrice, category: prod.category, productName: prod.productName, imageUrl: prod.imageUrl, userEmail}))}>+</button>
                            {prod.quantity}
                            <button className="in-btn-cart" onClick={() => dispatch(removeFromCart({id: prod.id, productName: prod.productName, category: prod.category, quantity: prod.quantity, listPrice: prod.listPrice, imageUrl: prod.imageUrl, userEmail }))}>-</button>
                        </button>
                        <button className="catchy-btn" onClick={() => dispatch(removeAll({id: prod.id, productName: prod.productName, category: prod.category, quantity: prod.quantity, listPrice: prod.listPrice, imageUrl: prod.imageUrl, userEmail  }))}>Remove from Cart</button>
                    </div>
                
            ))}
            </div>
        </div>
     );
}
 
export default Cart;