import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fBase';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {target: {name, value}} = e;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // Login
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        } catch(err) {
            setError(err.message);
        }
    }

    const toggleAccount = () => {
        setNewAccount((prev) => !prev)
    }
    const onSocialClick = async (e) => {
        const {target: {name}} = e;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data)        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='email' type='email' placeholder='Email' value={email} required onChange={handleChange} />
                <input name='password' type='password' placeholder='Password' value={password} required onChange={handleChange} />
                <input type='submit' value={newAccount ? 'Create Account' : 'Log In'} onClick={handleSubmit} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? 'Log In' : 'Create Account'}</span>
            <div>
                <button name='google' onClick={onSocialClick}>Continue With Google</button>
                <button name='github' onClick={onSocialClick}>Continue With Github</button>
            </div>
        </div>
    )
}

export default Auth;
