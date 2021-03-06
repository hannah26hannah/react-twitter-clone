import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fBase';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

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
        <main className='authWrapper wrapper'>
            <div className='iconWrapper'>
                <FontAwesomeIcon icon={faTwitter} size='3x' className='twitterIcon'/>
            </div>
            <AuthForm error={error} setError={setError} />
            <div className='authBtns'>
                <button className='authBtn' name='google' onClick={onSocialClick}>
                    <FontAwesomeIcon icon={faGoogle} size='lg'/>
                    Continue With Google</button>
                <button className='authBtn' name='github' onClick={onSocialClick}>
                    <FontAwesomeIcon icon={faGithub} size='lg' />
                    Continue With Github</button>
            </div>
        </main>
    )
}

export default Auth;


