import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToFavourites } from "../features/favourites/favouriteSlice";

const Card = () => {
    const user = useSelector(state => state.auth.user);
    const filterDict = {
        'Sale & Offers':['Extra 20% Off Select Styles','Sale'],
        'Gender':['Men','Women','Unisex'],
        'Kids':['Boys','Girls'],
        'Shop By Price':['$0 - $25','$25 - $50','$50 - $100','$100 - $150','Over $150'],
        'Brand':['Nike Sportswear','Jordan','Nike By You','Converse','NikeLab','ACG','Nike Pro'],
        'Sports & Activities':['Lifestyle','Running','Training & Gym','Basketball','Football',
        'Soccer','Yoga','Baseball','Golf','Skateboarding','Tennis','Track & Field','Lacrosse','Walking',
        'Outdoor','Volleyball','Swimming','Gymnastics','Hiking','Hockey','Dance','Cheerleading','Cycling',
        'High-Intensity Interval Training','Softball','Surfing'],
        'Best For':['Warm Weather','Wet Weather Conditions','Off-Field','Cold Weather','Dry Weather Conditions',
        'Low-Impact Activities']
    };
    const userEmail = user.email;
    const [isSortOn, setSortOn] = useState(false);
    const [IsColorOn, setColorOn] = useState(false);
    const dispatch = useDispatch();
    const falseList = [false, false, false, false, false, false, false];
    const [IsFilterOn, setFilterOn] = useState(falseList);
    const [prodList, setProdList] = useState([]);
    const [isSidebarOn, setSidebarOn] = useState(false);
    const toggleSidebar = () => {
        setSidebarOn(!isSidebarOn);
    };
    const toggleCriteria = (index) => {
        IsFilterOn[index] = !IsFilterOn[index];
    };
    const toggleColor = () => {
        setColorOn(!IsColorOn);
    };
    const toggleSort = () => {
        setSortOn(!isSortOn);
    };
    useEffect(() => {
        fetch('http://localhost:8000/products')
        .then(res => res.json())
        .then(data => {
            setProdList(data);
            console.log(prodList);
        })},[prodList])
    return ( 
        <div className="wrapper">
            <div className="headings">
                <div className="h1class">All Products ({prodList.length})</div>
                <div className="right-opt">
                    <div className="option-btn" onClick={toggleSidebar}>
                        {isSidebarOn ? <span>Hide Filters</span> : <span>Show Filters</span>}
                        &nbsp;&nbsp;<i class="fa fa-filter"></i>
                    </div>
                    <div className="option-btn" onClick={toggleSort}>
                        Sort By&nbsp;&nbsp;
                        {isSortOn ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                        {isSortOn && (
                            <div className="pop-down-sort">
                                <a href="/" className="sort-values">Featured</a>
                                <a href="/" className="sort-values">Newest</a>
                                <a href="/" className="sort-values">Price : High-Low</a>
                                <a href="/" className="sort-values">Price : Low-High</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="containerfilter">
                {isSidebarOn && (
                    <div className="sidebar">
                    <hr/>
                    <a href="/" className="filter-criteria">Shoes</a>
                    <a href="/" className="filter-criteria">Hoodies & Pullovers</a>
                    <a href="/" className="filter-criteria">Jackets & Vests</a>
                    <a href="/" className="filter-criteria">Pants & Tights</a>
                    <a href="/" className="filter-criteria">Tops & T-Shirts</a>
                    <a href="/" className="filter-criteria">Jerseys</a>
                    <a href="/" className="filter-criteria">Shorts</a>
                    <a href="/" className="filter-criteria">Tights & Leggings</a>
                    <a href="/" className="filter-criteria">Sports Bras</a>
                    <a href="/" className="filter-criteria">Compression & Baselayer</a>
                    <a href="/" className="filter-criteria">Tracksuits</a>
                    <a href="/" className="filter-criteria">Swimwear</a>
                    <a href="/" className="filter-criteria">Socks</a>
                    <a href="/" className="filter-criteria">Accessories & Equipments</a>
                    {/* Adding filters */}
                    <div className="filter-section">
                        <hr/>
                        <div className="criteria filter-criteria">
                            <span onClick={toggleColor}>Color
                                <span className="float-right">
                                    {IsColorOn ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                                </span>
                            </span>
                            {IsColorOn && (
                                <div className="inner color-container">
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"black",marginBottom:'2px'}}></div>
                                        <div className="color-label">Black</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"#3498eb",marginBottom:'2px'}}></div>
                                        <div className="color-label">Blue</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"#825324",marginBottom:'2px'}}></div>
                                        <div className="color-label">Brown</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"#67db79",marginBottom:'2px'}}></div>
                                        <div className="color-label">Green</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"grey",marginBottom:'2px'}}></div>
                                        <div className="color-label">Grey</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"black",marginBottom:'2px'}}><img className="multi" src="multicolor.png"/></div>
                                        <div className="color-label">Multi-</div>
                                        <div className="color-label" style={{paddingBottom:'0px'}}>color</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"#ed7a0e",marginBottom:'2px'}}></div>
                                        <div className="color-label">Orange</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"#e0488c",marginBottom:'2px'}}></div>
                                        <div className="color-label">Pink</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"purple",marginBottom:'2px'}}></div>
                                        <div className="color-label">Purple</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"#b31532",marginBottom:'2px'}}></div>
                                        <div className="color-label">Red</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"white",marginBottom:'2px'}}></div>
                                        <div className="color-label">White</div>
                                    </div>
                                    <div className="one-color">
                                        <div className="color-circle" style={{backgroundColor:"yellow",marginBottom:'2px'}}></div>
                                        <div className="color-label">Yellow</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {Object.entries(filterDict).map(([category,filters], index) => (
                        <div className="filter-section" key={index}>
                            <hr/>
                            <div className="criteria filter-criteria">
                                <span onClick={() => {toggleCriteria(index)}}>{category}
                                    <span className="float-right">
                                        {IsFilterOn[index] ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                                    </span>
                                </span>
                                {IsFilterOn[index] && (
                                    <div className="inner">
                                        {filters.map((filteritems, ind) => (
                                            <label className="filter-criteria-inner" key={ind}><input type="checkbox"/>&nbsp;&nbsp;{filteritems}</label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <hr/>
                </div>
                )}
                {/* Adding cards */}
                <div className="cards-list">
                { prodList.slice(0,100).map((prod) => (
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
        </div>
     );
}
 
export default Card;