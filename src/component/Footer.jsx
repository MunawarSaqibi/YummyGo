import { useState } from "react";
import { Link } from "react-router-dom";
import { Applogo, twitterIcon, instaIcon, facebookIcon } from "../utils/constants";

const Footer = () => {
    const [feedback, setFeedback] = useState("");
    const [posted, setPosted] = useState(false);

    const submitFeedback = () => {
        if (!feedback.trim()) return;
        try {
            const saved = JSON.parse(localStorage.getItem("yummygo-feedback") || "[]");
            localStorage.setItem("yummygo-feedback", JSON.stringify([...saved, { message: feedback.trim(), date: new Date().toISOString() }]));
        } catch { }
        setPosted(true);
        setFeedback("");
        window.setTimeout(() => setPosted(false), 1800);
    };

    return (
        <footer className="footer-conatiner">
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
                        <li><Link to="/groceryGo">Fresh grocery</Link></li>
                        <li><Link to="/offers">Offers</Link></li>
                        <li><Link to="/restaurants">What's new</Link></li>
                        <li><Link to="/restaurants?q=popular">Popular</Link></li>
                    </ul>
                </div>
                <div className="detail-list">
                     <ul>
                        <li className="head-list">Explore</li>
                         <li><Link to="/restaurants">Restaurants</Link></li>
                         <li><Link to="/GoDineOut">Dine out</Link></li>
                         <li><Link to="/groceryGo">Grocery</Link></li>
                         <li><Link to="/offers">Collections</Link></li>
                    </ul>
                </div>
                <div className="detail-list">
                     <ul>
                        <li className="head-list">Support</li>
                         <li><Link to="/help">Help center</Link></li>
                         <li><a href="mailto:support@yummygo.example">Contact us</a></li>
                         <li><Link to="/help">Guidelines</Link></li>
                         <li><Link to="/help">FAQ</Link></li>
                    </ul>
                </div>
                <div className="detail-list">
                     <ul>
                        <li className="head-list">Company</li>
                         <li><Link to="/">About us</Link></li>
                         <li><Link to="/offers">Latest deals</Link></li>
                         <li><a href="mailto:careers@yummygo.example">Careers</a></li>
                         <li><Link to="/help">Privacy policy</Link></li>
                    </ul>
                </div>
                <div>
                    <div className="head-list">Order Now</div>
                    <div className="update-caption">Order with certified Restaurant</div>
                    <form onSubmit={(event) => { event.preventDefault(); submitFeedback(); }}>
                        <input value={feedback} onChange={(event) => setFeedback(event.target.value)} placeholder="Leave your feedback" aria-label="Feedback" />
                        <button className="send-btn" type="submit" disabled={!feedback.trim()}>{posted ? "Posted" : "Post"}</button>
                    </form>
                    
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
        </footer>
    );
};

export default Footer;