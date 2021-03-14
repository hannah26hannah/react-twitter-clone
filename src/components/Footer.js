import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlogger, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faBookReader, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

const Footer = () => (
    <footer className='footer'>
        <h6>&copy; Hannah26Hannah {new Date().getFullYear()}</h6>
        <ul>
            <a href="https://github.com/hannah26hannah">
                <li><FontAwesomeIcon icon={faGithub} /></li>
            </a>
            <a href="mailto: guaranteed.by.prismo@gmail.com">
                <li><FontAwesomeIcon icon={faEnvelopeOpen} /></li>
            </a>
            <a href="https://hannah26hannah.github.io/">
                <li><FontAwesomeIcon icon={faBookReader}/></li>
            </a>
            <a href="https://www.linkedin.com/in/jeongwon-yoo/">
                <li><FontAwesomeIcon icon={faLinkedinIn}/></li>
            </a>
            <a href="https://uiyoji-journal.tistory.com/">
                <li><FontAwesomeIcon icon={faBlogger} /></li>
            </a>
        </ul>

    </footer>
)

export default Footer;