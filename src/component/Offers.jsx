import { Link } from "react-router-dom";

const offers = [
    { code: "WELCOME50", title: "50% off your first order", description: "Get up to ₹150 off on orders above ₹299.", accent: "#ed3151", icon: "🎉" },
    { code: "FREEDEL", title: "Free delivery", description: "Enjoy free delivery on selected nearby restaurants.", accent: "#ff9f43", icon: "🛵" },
    { code: "YUMMY20", title: "20% off on dinners", description: "Save up to ₹200 on orders after 7 PM.", accent: "#168f4a", icon: "🌙" }
];

const Offers = () => (
    <main className="support-page">
        <section className="support-hero offers-hero">
            <div>
                <span className="section-kicker">Exclusive deals</span>
                <h1>Offers made for every craving</h1>
                <p>Discover handpicked discounts from your favourite restaurants.</p>
            </div>
            <div className="offers-hero-icon" aria-hidden="true">%</div>
        </section>

        <section className="offers-section">
            <div className="support-section-heading">
                <div><span className="section-kicker">Best savings</span><h2>Available offers</h2></div>
                <span>{offers.length} coupons</span>
            </div>
            <div className="offers-grid">
                {offers.map((offer) => (
                    <article className="offer-card" key={offer.code} style={{ "--offer-accent": offer.accent }}>
                        <div className="offer-icon">{offer.icon}</div>
                        <div className="offer-content">
                            <h3>{offer.title}</h3>
                            <p>{offer.description}</p>
                            <div className="coupon-row"><span>{offer.code}</span><button type="button" onClick={() => navigator.clipboard?.writeText(offer.code)}>Copy</button></div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    </main>
);

export default Offers;
