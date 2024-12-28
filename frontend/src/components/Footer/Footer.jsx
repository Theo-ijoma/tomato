import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt="" />
                <p>Delivering delicious meals right to your doorstep, Tomato is your go-to platform for the best food delivery experience. Whether you're craving something exotic or looking for comfort food, we've got you covered. Join us on our journey to bring quality and convenience together, one meal at a time.</p>
                <div className='footer-social-icons'>
                    <a href="https://www.instagram.com/theooijoma/"> <img src={assets.facebook_icon} target='__blank' alt="" /></a>
                   
                    <a href="https://x.com/theo_ijoma"><img src={assets.twitter_icon} target='__blank' alt="" /></a>
                    <a href="https://www.linkedin.com/in/theodore-ijoma/" target='__blank'><img src={assets.linkedin_icon} alt="" /></a>
                </div>
            </div>

            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+234-701-154-6101</li>
                    <li>ijomatheodore@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 &copy; Tomato.app - All Right Reserved </p>
    </div>
  )
}

export default Footer