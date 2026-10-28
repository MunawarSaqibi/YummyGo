import { useState } from "react";
import { Applogo, cartIcon } from "../utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useCart } from "../context/CartContext";

const Header = () => {
    const isOnline = useOnlineStatus();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { itemCount } = useCart();
    const [standardQuery, setStandardQuery] = useState("");
    const [groceryQuery, setGroceryQuery] = useState("");
    const [dineQuery, setDineQuery] = useState("");
    const [groceryLocation, setGroceryLocation] = useState("Home · 500001");
    const [dineLocation, setDineLocation] = useState("Hyderabad");

    const changeLocation = (current, setter, label) => {
        const next = window.prompt(label, current);
        if (next?.trim()) setter(next.trim());
    };

    if (pathname === "/groceryGo") {
        return (
            <header className="header-container grocery-header">
                <Link className="brand-link grocery-brand" to="/">
                    <img className="img-logo" src={Applogo} alt="YummyGo Grocery" />
                    <span>Grocery</span>
                </Link>
                <button className="header-location grocery-location" type="button" onClick={() => changeLocation(groceryLocation, setGroceryLocation, "Enter grocery delivery location")}>
                    <span className="location-icon" aria-hidden="true">⌖</span>
                    <span><small>Delivering to</small><strong>{groceryLocation}</strong></span>
                    <b aria-hidden="true">⌄</b>
                </button>
                <div className="special-header-search grocery-header-search">
                    <span aria-hidden="true">⌕</span>
                    <input value={groceryQuery} onChange={(event) => { setGroceryQuery(event.target.value); window.dispatchEvent(new CustomEvent("yummygo-grocery-search", { detail: event.target.value })); }} placeholder="Search for fruits, milk, snacks..." aria-label="Search groceries" />
                </div>
                <nav className="nav-bar special-nav" aria-label="Grocery navigation">
                    <ul>
                        <li><Link className="nav-option" to="/offers">Offers</Link></li>
                        <li><Link className="account-button" to="/cart"><span>👤</span> Account</Link></li>
                        <li><Link className="nav-option cart-link grocery-cart" to="/cart" aria-label="Grocery cart"><img className="cartIcon" src={cartIcon} alt="" /><b>{itemCount}</b></Link></li>
                    </ul>
                </nav>
            </header>
        );
    }

    if (pathname === "/GoDineOut") {
        return (
            <header className="header-container dineout-header">
                <Link className="brand-link dineout-brand" to="/">
                    <img className="img-logo" src={Applogo} alt="YummyGo Dine Out" />
                    <span>Dine Out</span>
                </Link>
                <button className="header-location dineout-location" type="button" onClick={() => changeLocation(dineLocation, setDineLocation, "Enter dine-out location")}>
                    <span className="location-icon" aria-hidden="true">⌖</span>
                    <span><small>Your location</small><strong>{dineLocation}</strong></span>
                    <b aria-hidden="true">⌄</b>
                </button>
                <div className="special-header-search dineout-header-search">
                    <span aria-hidden="true">⌕</span>
                    <input value={dineQuery} onChange={(event) => { setDineQuery(event.target.value); window.dispatchEvent(new CustomEvent("yummygo-dine-search", { detail: event.target.value })); }} placeholder="Search restaurants or cuisines" aria-label="Search dine-out restaurants" />
                </div>
                <nav className="nav-bar special-nav" aria-label="Dine-out navigation">
                    <ul>
                        <li><Link className="nav-option" to="/offers">Offers</Link></li>
                        <li><Link className="nav-option" to="/help">Help</Link></li>
                        <li><button className="reserve-button" type="button" onClick={() => window.dispatchEvent(new CustomEvent("yummygo-show-reservations"))}>My reservations</button></li>
                    </ul>
                </nav>
            </header>
        );
    }

    return (
        <header className="header-container">
            <Link className="brand-link" to="/">
                <img className="img-logo" src={Applogo} alt="YummyGo" />
            </Link>
            <div className="search-bar">
                <span className="search-icon" aria-hidden="true">⌕</span>
                <input className="searchBar" value={standardQuery} onChange={(event) => setStandardQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") navigate(`/restaurants?q=${encodeURIComponent(standardQuery.trim())}`); }} placeholder="Search food or restaurants" aria-label="Search food or restaurants" />
            </div>
            <nav className="nav-bar" aria-label="Main navigation">
                <ul>
                    <li className={`online-status${isOnline ? " is-online" : ""}`} title={isOnline ? "Online" : "Offline"}><span aria-hidden="true">{isOnline ? "●" : "○"}</span></li>
                    <li><Link className="nav-option" to="/">Home</Link></li>
                    <li><Link className="nav-option" to="/restaurants">Restaurants</Link></li>
                    <li><Link className="nav-option" to="/offers">Offers</Link></li>
                    <li><Link className="nav-option" to="/help">Help</Link></li>
                    <li><Link className="nav-option cart-link" to="/cart" aria-label="Cart"><img className="cartIcon" src={cartIcon} alt="" />{itemCount > 0 && <b className="header-cart-count">{itemCount}</b>}</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;