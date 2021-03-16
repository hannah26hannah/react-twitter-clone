import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Navigation = ({ userObj }) => {
    const [isDark, setIsDark] = useState(false);
    const toggleDarkMode = () => {
        setIsDark(prev => !prev);
        trans();
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    }
    const trans = () => {
        document.documentElement.classList.add('transition');
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition')
        }, 500)   
    }

    return (
        <nav className='Navigation'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li>
                    <Link to='/profile'>{userObj.displayName}'s Profile</Link>
                    <button className='darkModeBtn' value='DarkMode' onClick={toggleDarkMode}>
                        {isDark ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                    </button>
                </li>
            </ul>
        </nav>
    ) 
}


export default Navigation;