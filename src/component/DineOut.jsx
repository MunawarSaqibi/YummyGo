import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const restaurants = [
    { name: "The Copper Spoon", cuisine: "Continental · Cafe", area: "Banjara Hills", rating: "4.6", offer: "20% off on bill", emoji: "🍽️" },
    { name: "Olive Garden Kitchen", cuisine: "Italian · Mediterranean", area: "Jubilee Hills", rating: "4.4", offer: "Complimentary dessert", emoji: "🍝" },
    { name: "Royal Courtyard", cuisine: "North Indian · Mughlai", area: "Charminar", rating: "4.7", offer: "Flat ₹300 off", emoji: "🥘" }
];

const DineOut = () => {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("Current location");
    const [reservations, setReservations] = useState(() => { try { return JSON.parse(localStorage.getItem("yummygo-reservations") || "[]"); } catch { return []; } });
    const [modalRestaurant, setModalRestaurant] = useState(null);

    useEffect(() => {
        const handleSearch = (event) => setSearch(event.detail || "");
        const showReservations = () => setModalRestaurant({ reservations: true });
        window.addEventListener("yummygo-dine-search", handleSearch);
        window.addEventListener("yummygo-show-reservations", showReservations);
        return () => { window.removeEventListener("yummygo-dine-search", handleSearch); window.removeEventListener("yummygo-show-reservations", showReservations); };
    }, []);

    const filtered = restaurants.filter((restaurant) => `${restaurant.name} ${restaurant.cuisine} ${restaurant.area}`.toLowerCase().includes(search.toLowerCase()));

    const reserve = (restaurant) => {
        const reservation = { ...restaurant, date: new Date().toLocaleDateString(), id: Date.now() };
        const next = [...reservations, reservation];
        setReservations(next);
        localStorage.setItem("yummygo-reservations", JSON.stringify(next));
        setModalRestaurant(null);
        window.alert(`Table request reserved at ${restaurant.name}`);
    };

    return (
        <main className="dineout-page">
            <section className="dineout-hero">
                <div><span className="section-kicker">Eat out & save</span><h1>Discover tables worth reserving</h1><p>Explore nearby restaurants, exclusive dining offers, and memorable experiences.</p></div>
                <div className="dineout-search">
                    <div><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search restaurants or cuisines" placeholder="Search restaurant or cuisine" /></div>
                    <div><span aria-hidden="true">📍</span><button type="button" onClick={() => { const next = window.prompt("Enter your city", location === "Current location" ? "Hyderabad" : location); if (next?.trim()) setLocation(next.trim()); }}>{location}</button></div>
                </div>
            </section>

            <section className="dineout-content">
                <div className="support-section-heading"><div><span className="section-kicker">Curated near you</span><h2>Popular dine-out destinations</h2></div><Link className="section-link" to="/restaurants">View all restaurants</Link></div>
                {filtered.length ? <div className="dineout-card-grid">{filtered.map((restaurant) => (
                    <article className="dineout-card" key={restaurant.name}>
                        <div className={`dineout-card-image dineout-image-${restaurant.name.length % 3}`}><span>{restaurant.emoji}</span><strong>{restaurant.offer}</strong></div>
                        <div className="dineout-card-info"><div><h3>{restaurant.name}</h3><span>★ {restaurant.rating}</span></div><p>{restaurant.cuisine}</p><p>📍 {restaurant.area}</p><button type="button" onClick={() => setModalRestaurant(restaurant)}>Reserve a table</button></div>
                    </article>
                ))}</div> : <div className="restaurant-status-card"><h2>No dine-out places found</h2><p>Try a restaurant, cuisine, or area name.</p></div>}
            </section>

            {modalRestaurant && <div className="reservation-overlay" role="dialog" aria-modal="true"><div className="reservation-modal"><button className="reservation-close" type="button" onClick={() => setModalRestaurant(null)}>×</button>{modalRestaurant.reservations ? <><h2>My reservations</h2>{reservations.length ? reservations.map((item) => <div className="reservation-row" key={item.id}><strong>{item.name}</strong><span>{item.date}</span></div>) : <p>No reservations yet.</p>}</> : <><span className="reservation-icon">{modalRestaurant.emoji}</span><h2>{modalRestaurant.name}</h2><p>{modalRestaurant.cuisine}</p><div className="reservation-details"><label>Date<input type="date" min={new Date().toISOString().split("T")[0]} /></label><label>Guests<select><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label></div><button className="reserve-confirm" type="button" onClick={() => reserve(modalRestaurant)}>Confirm reservation</button></>}</div></div>}
        </main>
    );
};

export default DineOut;