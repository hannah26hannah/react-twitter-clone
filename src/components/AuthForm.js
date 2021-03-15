import { authService } from 'fBase';
import React, { useState } from 'react';

const AuthForm = ({ error, setError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    

    const toggleAccount = () => {
        setNewAccount((prev) => !prev)
    }

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
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                await authService.signInWithEmailAndPassword(email, password)
            }
        } catch(err) {
            setError(err.message);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='authForm'>
                <input name='email' type='email' placeholder='Email' value={email} required onChange={handleChange} className='factoryInput'/>
                <input name='password' type='password' placeholder='Password' value={password} required onChange={handleChange} className='factoryInput' />
                <input type='submit' value={newAccount ? 'Create Account' : 'Log In'} onClick={handleSubmit} className='factoryInput submitBtn' />
                <span className='error'>{error}</span>
            </form>
            <span className='authSwitch' onClick={toggleAccount}>Switch to {newAccount ? 'Log In' : 'Create Account'}</span>
        </>
    )
    
}

export default AuthForm;