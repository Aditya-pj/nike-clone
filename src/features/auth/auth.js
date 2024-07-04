import { useSelector } from "react-redux";
import { login } from "./authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { nanoid } from "@reduxjs/toolkit";

const AuthPage = () => {
    const isLoggedIn = useSelector((state) => {
        return state.auth.isLoggedIn;
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector(state => state.auth.error);
    const isLoading = useSelector(state => state.auth.isLoading);
    const dispatch = useDispatch();
    const allGood = Boolean(email) && Boolean(password);
    return ( 
        <div className="auth-part">
            <h1>Login</h1>
            <div>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} name="email" id="email" type="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={event => setPassword(event.target.value)} name="password" id="password" type="password"/>
            </div>
            <div>
            <button disabled={!allGood} className="catchy-btn" type="button" onClick={() => {
                if (allGood)
                {
                    dispatch(login({ email, password}));
                }
                
                }}>Submit</button>
            </div>
            
                <div className="sign-in-go">
                    <a className="sign-in-link" href="/signin">Don't have an account? Create a new one.</a>
                </div>
                {(allGood && error) && <div>{ error }</div>}
                {(allGood && isLoading) && <div>Loading...</div>}
        </div>
     );
}
 
export default AuthPage
