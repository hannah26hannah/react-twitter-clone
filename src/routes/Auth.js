import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fBase';
import AuthForm from 'components/AuthForm';

const Auth = () => {
    const [error, setError] = useState('');
    const onSocialClick = async (e) => {
        const {target: {name}} = e;
        try {
            let provider;
            if (name === 'google') {
                provider = new firebaseInstance.auth.GoogleAuthProvider();
            } else if (name === 'github') {
                provider = new firebaseInstance.auth.GithubAuthProvider();
            }
            await authService.signInWithPopup(provider);
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <AuthForm error={error} setError={setError} />
            <div>
                <button name='google' onClick={onSocialClick}>Continue With Google</button>
                <button name='github' onClick={onSocialClick}>Continue With Github</button>
            </div>
        </div>
    )
}

export default Auth;
