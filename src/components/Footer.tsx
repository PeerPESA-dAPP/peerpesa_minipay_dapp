import React from 'react';
import '../style/components/Footer.css';
import logoIcon   from "../assets/large-logo.png";
import linkedInIcon   from "../assets/other/linkedIn.svg";
import facebookIcon   from "../assets/other/facebook.svg";
import tiktokIcon   from "../assets/other/tiktok.svg";
import instagramIcon   from "../assets/other/instagram.svg";
import xIcon   from "../assets/other/x.svg";

const Footer: React.FC = () => {
  return (

    <div className="footer group clearfix">
      <div className="column_100 flexing_content flex_container group clearfix">
           
        <div className="column_25 margin-bottom-30">
          <div className="column_100 footer_content">
            <div className="footer-logo">
              <img src={logoIcon} alt="peerpesa" className="footer-snap" />   
            </div>
          </div>  
        </div>

        <div className="column_25 margin-bottom-30">
          <div className="column_100 footer_content">
            <h3> Services </h3>
            <ul>
              <li><a href="#">Group Savings </a></li>
              <li><a href="#">Lending &  Borrowing</a></li>
              <li><a href="#">Cross Border Money Transfer</a></li>
            </ul>
          </div> 
          <div className="column_100 footer_content">
            <h3> About </h3>
            <ul>
              <li><a href="#"> About Mel Savings</a></li>
              <li><a href="#"> How it works</a></li>
              <li><a href="#"> WP </a></li>
            </ul>
          </div>   
        </div>

        <div className="column_25 margin-bottom-30">
          <div className="column_100 footer_content">
          <h3> Help & Support </h3>
            <ul>
                <li><a href="#">FAQ </a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Customer Protection Policy </a></li>
                <li><a href="#">AML Policy </a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
            </ul>

          </div> 
        </div>

        <div className="column_25 margin-bottom-30">
          <div className="column_100 footer_content">
            <h3> Our Community </h3>
            <ol  className="text-center flexing_content flex_container community_collection">
                <li> <img src={linkedInIcon} alt="linked" className="footer-social-snap" /> </li>
                <li> <img src={facebookIcon} alt="facebook" className="footer-social-snap" /> </li>
                <li> <img src={tiktokIcon} alt="tiktok" className="footer-social-snap" /> </li>
                <li> <img src={instagramIcon} alt="instagram" className="footer-social-snap" /> </li>
                <li> <img src={xIcon} alt="x" className="footer-social-snap" /> </li>
            </ol>

          </div>   
        </div>

      </div>

      <div className="column_100">
        <div className="column_100 footer_content">
          <p  className="text-center"> &copy; 2024 Mel Savings. All rights reserved. </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;




