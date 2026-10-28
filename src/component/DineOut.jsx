import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const restaurants = [
    { name: "The Copper Spoon", cuisine: "Continental · Cafe", cuisines: ["Continental", "Cafe"], area: "Banjara Hills", distance: "2.4 km", rating: "4.6", offer: "20% off on bill", open: true, availability: "Tables available today", emoji: "🍽️", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=82" },
    { name: "Olive Garden Kitchen", cuisine: "Italian · Mediterranean", cuisines: ["Italian", "Mediterranean"], area: "Jubilee Hills", distance: "4.1 km", rating: "4.4", offer: "Complimentary dessert", open: true, availability: "Next table at 8:30 PM", emoji: "🍝", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=82" },
    { name: "Royal Courtyard", cuisine: "North Indian · Mughlai", cuisines: ["North Indian", "Mughlai"], area: "Charminar", distance: "6.8 km", rating: "4.7", offer: "Flat ₹300 off", open: false, availability: "Opens at 6:00 PM", emoji: "🥘", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=82" }
];

const DineOut = () => {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("Current location");
    const [reservations, setReservations] = useState(() => { try { return JSON.parse(localStorage.getItem("yummygo-reservations") || "[]"); } catch { return []; } });
    const [modalRestaurant, setModalRestaurant] = useState(null);
    const [reservationDate, setReservationDate] = useState(new Date().toISOString().split("T")[0]);
    const [reservationGuests, setReservationGuests] = useState("2 guests");

    useEffect(() => {
        const handleSearch = (event) => setSearch(event.detail || "");
        const showReservations = () => setModalRestaurant({ reservations: true });
        window.addEventListener("yummygo-dine-search", handleSearch);
        window.addEventListener("yummygo-show-reservations", showReservations);
        return () => { window.removeEventListener("yummygo-dine-search", handleSearch); window.removeEventListener("yummygo-show-reservations", showReservations); };
    }, []);

    const filtered = restaurants.filter((restaurant) => `${restaurant.name} ${restaurant.cuisine} ${restaurant.area}`.toLowerCase().includes(search.toLowerCase()));

    const cancelReservation = (reservationId) => {
        const next = reservations.filter((reservation) => reservation.id !== reservationId);
        setReservations(next);
        localStorage.setItem("yummygo-reservations", JSON.stringify(next));
    };

    const reserve = (restaurant) => {
        const reservation = { ...restaurant, date: reservationDate, guests: reservationGuests, id: Date.now() };
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
                        <div className="dineout-card-image">
                            <img src={restaurant.image} alt={`${restaurant.name} restaurant interior`} />
                            <span className={`dineout-open-status${restaurant.open ? " is-open" : ""}`}>{restaurant.open ? "Open now" : "Closed now"}</span>
                            <strong>{restaurant.offer}</strong>
                        </div>
                        <div className="dineout-card-info">
                            <div><h3>{restaurant.name}</h3><span>★ {restaurant.rating}</span></div>
                            <div className="dineout-cuisine-chips">{restaurant.cuisines.map((item) => <small key={item}>{item}</small>)}</div>
                            <p className="dineout-location-meta">📍 {restaurant.area} <b>•</b> {restaurant.distance}</p>
                            <p className={`dineout-availability${restaurant.open ? " is-open" : ""}`}><span aria-hidden="true">●</span>{restaurant.availability}</p>
                            <button type="button" onClick={() => setModalRestaurant(restaurant)}>Reserve a table</button>
                        </div>
                    </article>
                ))}</div> : <div className="restaurant-status-card"><h2>No dine-out places found</h2><p>Try a restaurant, cuisine, or area name.</p></div>}
            </section>

            {modalRestaurant && <div className="reservation-overlay" role="dialog" aria-modal="true" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalRestaurant(null); }}><div className="reservation-modal"><button className="reservation-close" type="button" onClick={() => setModalRestaurant(null)} aria-label="Close reservation dialog">×</button>{modalRestaurant.reservations ? <><h2>My reservations</h2>{reservations.length ? reservations.map((item) => <div className="reservation-row" key={item.id}><div><strong>{item.name}</strong><p>{item.date} · {item.guests}</p></div><button type="button" onClick={() => cancelReservation(item.id)}>Cancel</button></div>) : <p>No reservations yet.</p>}</> : <><span className="reservation-icon">{modalRestaurant.emoji}</span><h2>{modalRestaurant.name}</h2><p>{modalRestaurant.cuisine}</p><div className="reservation-details"><label>Date<input value={reservationDate} onChange={(event) => setReservationDate(event.target.value)} type="date" min={new Date().toISOString().split("T")[0]} /></label><label>Guests<select value={reservationGuests} onChange={(event) => setReservationGuests(event.target.value)}><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label></div><button className="reserve-confirm" type="button" disabled={!reservationDate} onClick={() => reserve(modalRestaurant)}>Confirm reservation</button></>}</div></div>}
        </main>
    );
};

export default DineOut;