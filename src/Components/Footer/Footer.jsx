/* eslint-disable no-unused-vars */
import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
    <div className="container">
        <div className="footer_sections">
            <div className="footer_section">
                <img src="./assets/footer_logo.png"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
            </div>
            <div className="footer_section">
                <h5>About</h5>
                <ul>
                    <li>About Us</li>
                    <li>News</li>
                    <li>Careers</li>
                    <li>FAQ</li>
                </ul>
            </div>
            <div className="footer_section">
                <h5>Support</h5>
                <ul>
                    <li>Contact Us</li>
                </ul>                    
            </div>
            <div className="footer_section">
                <h5>Réseaux sociaux</h5>
                <div className="footer_socials">
                    <img src="./assets/facebook.svg"/>
                    <img src="./assets/yy.svg"/>
                    <img src="./assets/tw.svg"/>
                    <img src="./assets/ig.svg"/>
                </div>
            </div>                
        </div>
    </div>
    </div>   
  )
}

export default Footer