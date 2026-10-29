import { useEffect, useState } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Applogo } from "./utils/constants";

const IntroIllustration = ({ type }) => {
    if (type === "grocery") return (
        <svg viewBox="0 0 64 64" role="img" aria-label="Grocery basket">
            <path d="M14 27h36l-4 23H18l-4-23Z" fill="currentColor" opacity=".18"/>
            <path d="M13 27h38l-4 24H17l-4-24Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M22 27 29 14M42 27l-7-13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M21 35h22M20 42h24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".75"/>
            <circle cx="25" cy="23" r="5" fill="#087a55"/><circle cx="39" cy="22" r="5" fill="#9ebd48"/>
            <path d="M25 18c1-3 4-4 6-3-1 3-3 4-6 3ZM39 17c0-3 2-5 5-5 0 3-2 5-5 5Z" fill="#087a55"/>
        </svg>
    );
    if (type === "dineout") return (
        <svg viewBox="0 0 64 64" role="img" aria-label="Wine glass">
            <path d="M20 9h24l-3 17c-1 7-5 11-9 11s-8-4-9-11l-3-17Z" fill="currentColor" opacity=".12"/>
            <path d="M20 9h24l-3 17c-1 7-5 11-9 11s-8-4-9-11l-3-17ZM32 37v13M23 51h18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.8 13h22.4l-1 6H21.8l-1-6Z" fill="#c9a96a" opacity=".9"/><path d="M24 25c2 8 14 8 16 0" fill="none" stroke="#c9a96a" strokeWidth="2.5"/>
        </svg>
    );
    return (
        <svg viewBox="0 0 64 64" role="img" aria-label="Dining plate">
            <circle cx="32" cy="32" r="23" fill="none" stroke="currentColor" strokeWidth="3"/>
            <circle cx="32" cy="32" r="15" fill="currentColor" opacity=".10"/>
            <path d="M13 24v16M10 24v16M16 24v16M13 32v15M51 24v24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M48 24c4 3 4 9 0 12V24Z" fill="currentColor"/>
        </svg>
    );
};

const getIntroTheme = (pathname) => {
    if (pathname === "/groceryGo") return {
        key: "grocery",
        className: "app-intro--grocery",
        label: "Grocery",
        tagline: "Fresh essentials, delivered",
        illustration: "grocery"
    };
    if (pathname === "/GoDineOut") return {
        key: "dineout",
        className: "app-intro--dineout",
        label: "Dine Out",
        tagline: "Find a table worth reserving",
        illustration: "dineout"
    };
    if (pathname === "/restaurants" || pathname.startsWith("/restaurantsMenu/")) return {
        key: "restaurants",
        className: "app-intro--standard",
        label: "Restaurants",
        tagline: "Good food, delivered",
        illustration: "standard"
    };
    return null;
};

const RouteIntro = () => {
    const { pathname } = useLocation();
    const theme = getIntroTheme(pathname);
    const [visible, setVisible] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [logoReady, setLogoReady] = useState(false);

    useEffect(() => {
        const logo = new Image();
        const markReady = () => setLogoReady(true);
        logo.addEventListener("load", markReady, { once: true });
        logo.addEventListener("error", markReady, { once: true });
        logo.src = Applogo;
        if (logo.complete) markReady();
        return () => {
            logo.removeEventListener("load", markReady);
            logo.removeEventListener("error", markReady);
        };
    }, []);

    useEffect(() => {
        if (!theme) {
            setVisible(false);
            setLeaving(false);
            return;
        }

        const storageKey = `yummygo-intro-${theme.key}-seen`;
        let seen = false;
        try { seen = sessionStorage.getItem(storageKey) === "true"; }
        catch {}

        if (seen) {
            setVisible(false);
            setLeaving(false);
            return;
        }

        try { sessionStorage.setItem(storageKey, "true"); }
        catch {}

        setVisible(true);
        setLeaving(false);

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const introDelay = reduceMotion ? 250 : 1350;
        const exitTimer = window.setTimeout(() => setLeaving(true), introDelay);
        const hideTimer = window.setTimeout(() => setVisible(false), introDelay + (reduceMotion ? 50 : 450));
        return () => {
            window.clearTimeout(exitTimer);
            window.clearTimeout(hideTimer);
        };
    }, [pathname]);

    if (!visible || !theme) return null;

    return (
        <div className={`app-intro ${theme.className}${leaving ? " is-leaving" : ""}`} role="status" aria-label={`Loading YummyGo ${theme.label}`}>
            <div className={`app-intro-content${logoReady ? " is-logo-ready" : ""}`}>
                <div className="intro-logo-orbit" aria-hidden="true"><span className="intro-food-icon"><IntroIllustration type={theme.illustration} /></span></div>
                <img className="intro-logo" src={Applogo} alt="YummyGo" />
                <div className="intro-route-name"><strong>{theme.label}</strong><span>{theme.tagline}</span></div>
                <div className="intro-progress" aria-hidden="true"><span /></div>
            </div>
        </div>
    );
};

const AppLayout = () => {
  return (
    <CartProvider>
      <RouteIntro />
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default AppLayout;