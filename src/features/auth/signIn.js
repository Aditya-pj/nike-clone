import { useDispatch, useSelector } from 'react-redux';
import { signInUser, login } from './authSlice';
import { useState } from 'react';
import MainPage from '../../mainPage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

const SignIn = () => {
    const error = useSelector((state) => state.error);
    const isLoading = useSelector(state => state.isLoading);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const allGood = Boolean(email) && Boolean(password) && Boolean(name);
    const dispatch = useDispatch();
    return ( 
            <div className="auth-part auth-part-signin">
                <h1>Sign Up</h1>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" value={email} onChange={(event) => setEmail(event.target.value)} id="email" type="email"/>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(event) => setName(event.target.value)} name="name" id="name" type="text"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} name="password" id="password" type="password"/>
                </div>
                <div>
                    <button disabled={!allGood} className='catchy-btn' type="button" onClick={() => {
                        if (allGood)
                        {
                            dispatch(signInUser({ email, name, password}))
                            dispatch(login({ email, password}))
                        }
                        
                    }}>Submit</button>
                </div>
                { (allGood && error) && <div>{ error }</div>}
                { (allGood && isLoading) && <div>Loading...</div>}
            </div>
         );
    
}
 
export default SignIn;