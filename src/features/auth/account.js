import { useSelector } from "react-redux";
import Navbar from "../../components/navbar";

const Account = () => {
    const user = useSelector(state => state.auth.user);
    return ( 
        <div className="account-page">
            <div className="nav-div"><Navbar/></div>
            <div className="account-div">
            <h1>User Details</h1>
            
            <div className="user-detail"><b>Name:  </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ user.name }</div>
            <div className="user-detail"><b>Email: </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}</div>
            </div>
            
            
        </div>
     );
}
 
export default Account;