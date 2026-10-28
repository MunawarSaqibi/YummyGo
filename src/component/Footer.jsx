import { Applogo } from "../utils/constants"
import { twitterIcon } from "../utils/constants"
import { instaIcon } from "../utils/constants"
import { facebookIcon } from "../utils/constants"
const Footer=()=>{
    return(
        <div className="footer-conatiner">
            <div className="footer-top">
                <div className="logo-title-footer">
                   
                        <img className="footer-logo" src={Applogo} alt="Food App logo" />
                    
                     <div className="title-caption-div">
                    <div className="title-footer">Yummy<span  className="go-span">Go</span></div>
                    <div className="caption">Instant Delivery, Top Restaurants</div>
                    </div>
                </div>
                <div className="detail-list">
                    <ul>
                        <li className="head-list">Food items</li>
                        <li>Fresh</li>
                        <li>Offers</li>
                        <li>what's New</li>
                        <li>Discounts</li>
                    </ul>
                </div>
                <div className="detail-list">
                     <ul>
                        <li className="head-list">Explore</li>
                        <li>Categories</li>
                        <li>Collections</li>
                        <li>Popular</li>
                        <li>Recent</li>
                    </ul>
                </div>
                <div className="detail-list">
                     <ul>
                        <li className="head-list">Support</li>
                        <li>Help's Center</li>
                        <li>Contact us</li>
                        <li>Guidelines</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div className="detail-list">
                     <ul>
                        <li className="head-list">Company</li>
                        <li>About us</li>
                        <li>Blog</li>
                        <li>careers</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <div className="head-list">Order Now</div>
                    <div className="update-caption">Order with certified Restaurant</div>
                    <div>
                        <input placeholder="Leave your Feedback"/>
                        <button className="send-btn">post</button>
                    </div>
                    
                    <div>
                        <img className="contact-icon" src={twitterIcon} alt="Twitter Icon" />
                        <img className="contact-icon" src={instaIcon} alt="Instagram Icon" />
                        <img className="contact-icon" src={facebookIcon} alt="faceBook Icon" />
                    </div>
                </div>
            </div>
            <div className="footer-copy">
                &copy; 2026 YummyGo. All rights are reserved
            </div>
        </div>
        
    )

}




export default Footer