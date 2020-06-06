import React from 'react';
import { AiFillCopyrightCircle, AiFillGithub, AiFillLinkedin } from "react-icons/ai"
import './style.css'



function Footer() {
    return (
        <div id = 'footer-main'>
            <span>Este  projeto foi criado no intuito de apresentar meus conhecimentos em NodeJs e ReactJS</span>
            <p>Ubatuba/SP - 2020</p>
            <p><AiFillCopyrightCircle /> Brayan Quirino</p>
            <p><AiFillGithub />
                <a href='https://github.com/braydevkin'>  braydevkin</a>   
                <AiFillLinkedin/>   
                 <a href='https://www.linkedin.com/in/brayan-quirino-valdevino-65492b13b/' >  My Linkedin</a>
            </p>
        </div>
    );
}

export default Footer;