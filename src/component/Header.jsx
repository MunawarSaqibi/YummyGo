import { useEffect, useState } from "react";
import { Applogo, cartIcon } from "../utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useCart } from "../context/CartContext";

const InstallAppButton = ({ compact = false }) => {
    const [promptEvent, setPromptEvent] = useState(() => window.__yummygoInstallPrompt || null);
    const [showInstructions, setShowInstructions] = useState(false);
    const [isInstalled, setIsInstalled] = useState(() => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            window.__yummygoInstallPrompt = event;
            setPromptEvent(event);
            setShowInstructions(false);
        };
        const handleInstallable = (event) => {
            if (event.detail) {
                setPromptEvent(event.detail);
                setShowInstructions(false);
            }
        };
        const handleAppInstalled = () => {
            window.__yummygoInstallPrompt = null;
            setPromptEvent(null);
            setShowInstructions(false);
            setIsInstalled(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("yummygo-installable", handleInstallable);
        window.addEventListener("appinstalled", handleAppInstalled);
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("yummygo-installable", handleInstallable);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstall = async () => {
        const availablePrompt = promptEvent || window.__yummygoInstallPrompt;
        if (availablePrompt) {
            try {
                await availablePrompt.prompt();
                await availablePrompt.userChoice;
            } catch {}
            window.__yummygoInstallPrompt = null;
            setPromptEvent(null);
            return;
        }
        setShowInstructions(true);
    };

    if (isInstalled) return null;

    const isiOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;

    return (
        <>
            <button className={`install-app-button${compact ? " is-compact" : ""}`} type="button" onClick={handleInstall} aria-haspopup="dialog">
                <span aria-hidden="true">↓</span>{!compact && <strong>Install App</strong>}
            </button>
            {showInstructions && (
                <div className="install-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowInstructions(false); }}>
                    <div className="install-modal" role="dialog" aria-modal="true" aria-labelledby="install-app-title">
                        <button className="install-modal-close" type="button" aria-label="Close install instructions" onClick={() => setShowInstructions(false)}>×</button>
                        <div className="install-modal-icon" aria-hidden="true">↓</div>
                        <h2 id="install-app-title">Install YummyGo</h2>
                        {isiOS ? (
                            <div className="ios-install-steps">
                                <p>Add YummyGo to your Home Screen for quick, app-like access.</p>
                                <ol>
                                    <li>Tap the <strong>Share</strong> button in Safari.</li>
                                    <li>Scroll down and choose <strong>Add to Home Screen</strong>.</li>
                                    <li>Tap <strong>Add</strong> to finish.</li>
                                </ol>
                            </div>
                        ) : (
                            <div className="ios-install-steps">
                                <p>Open YummyGo in Chrome or Edge on Android.</p>
                                <ol>
                                    <li>Tap the browser <strong>menu</strong> button.</li>
                                    <li>Choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
                                    <li>Confirm the installation.</li>
                                </ol>
                            </div>
                        )}
                        <button className="install-modal-action" type="button" onClick={() => setShowInstructions(false)}>Got it</button>
                    </div>
                </div>
            )}
        </>
    );
};

const MobileBottomNav = ({ mode = "home", itemCount = 0 }) => {
    const labels = mode === "grocery"
        ? [["/", "Home", "⌂"], ["/groceryGo", "Grocery", "🛒"], ["/offers", "Offers", "%"], ["/cart", "Cart", "🛍"]]
        : mode === "dineout"
            ? [["/", "Home", "⌂"], ["/GoDineOut", "Dine Out", "🍽"], ["/offers", "Offers", "%"], ["/help", "Help", "?"]]
            : [["/", "Home", "⌂"], ["/restaurants", "Restaurants", "🍽"], ["/offers", "Offers", "%"], ["/cart", "Cart", "🛍"]];

    return (
        <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
            {labels.map(([to, label, icon]) => (
                <Link to={to} key={label}>
                    <span aria-hidden="true">{icon}</span>
                    <small>{label}</small>
                    {label === "Cart" && itemCount > 0 && <b>{itemCount}</b>}
                </Link>
            ))}
        </nav>
    );
};

const MobileMenu = ({ itemCount = 0 }) => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, []);

    const menuItems = [
        ["/", "Home", "⌂"],
        ["/restaurants", "Restaurants", "🍽"],
        ["/groceryGo", "Grocery", "🛒"],
        ["/GoDineOut", "Dine Out", "🥂"],
        ["/offers", "Offers", "%"],
        ["/help", "Help & Support", "?"],
        ["/cart", `Cart (${itemCount})`, "🛍"]
    ];

    return (
        <div className="mobile-menu-wrap">
            <InstallAppButton compact />
            <button
                className={`hamburger-button${open ? " is-open" : ""}`}
                type="button"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={open}
                aria-controls="mobile-navigation-menu"
                onClick={() => setOpen((current) => !current)}
            >
                <span /><span /><span />
            </button>
            {open && (
                <>
                    <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setOpen(false)} />
                    <nav className="mobile-dropdown-menu" id="mobile-navigation-menu" aria-label="All navigation options">
                        <div className="mobile-menu-heading"><strong>Explore YummyGo</strong><button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>×</button></div>
                        {menuItems.map(([to, label, icon]) => (
                            <Link to={to} key={to} className={pathname === to ? "active" : ""} onClick={() => setOpen(false)}>
                                <span aria-hidden="true">{icon}</span><strong>{label}</strong><b aria-hidden="true">›</b>
                            </Link>
                        ))}
                    </nav>
                </>
            )}
        </div>
    );
};

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
                        <li className="install-nav-item"><InstallAppButton /></li>
                        <li><Link className="account-button" to="/cart"><span>👤</span> Account</Link></li>
                        <li><Link className="nav-option cart-link grocery-cart" to="/cart" aria-label="Grocery cart"><img className="cartIcon" src={cartIcon} alt="" /><b>{itemCount}</b></Link></li>
                    </ul>
                </nav>
                <MobileMenu itemCount={itemCount} />
                <MobileBottomNav mode="grocery" itemCount={itemCount} />
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
                        <li className="install-nav-item"><InstallAppButton /></li>
                        <li><button className="reserve-button" type="button" onClick={() => window.dispatchEvent(new CustomEvent("yummygo-show-reservations"))}>My reservations</button></li>
                    </ul>
                </nav>
                <MobileMenu itemCount={itemCount} />
                <MobileBottomNav mode="dineout" />
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
                    <li className="install-nav-item"><InstallAppButton /></li>
                    <li><Link className="nav-option cart-link" to="/cart" aria-label="Cart"><img className="cartIcon" src={cartIcon} alt="" />{itemCount > 0 && <b className="header-cart-count">{itemCount}</b>}</Link></li>
                </ul>
            </nav>
            <MobileMenu itemCount={itemCount} />
            <MobileBottomNav itemCount={itemCount} />
        </header>
    );
};

export default Header;