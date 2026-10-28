import { Link } from "react-router-dom";

const restaurants = [
    { name: "The Copper Spoon", cuisine: "Continental · Cafe", area: "Banjara Hills", rating: "4.6", offer: "20% off on bill", emoji: "🍽️" },
    { name: "Olive Garden Kitchen", cuisine: "Italian · Mediterranean", area: "Jubilee Hills", rating: "4.4", offer: "Complimentary dessert", emoji: "🍝" },
    { name: "Royal Courtyard", cuisine: "North Indian · Mughlai", area: "Charminar", rating: "4.7", offer: "Flat ₹300 off", emoji: "🥘" }
];

const DineOut = () => (
    <main className="dineout-page">
        <section className="dineout-hero">
            <div>
                <span className="section-kicker">Eat out & save</span>
                <h1>Discover tables worth reserving</h1>
                <p>Explore nearby restaurants, exclusive dining offers, and memorable experiences.</p>
            </div>
            <div className="dineout-search">
                <div><span aria-hidden="true">⌕</span><input aria-label="Search restaurants or cuisines" placeholder="Search restaurant or cuisine" /></div>
                <div><span aria-hidden="true">📍</span><button type="button">Current location</button></div>
            </div>
        </section>

        <section className="dineout-content">
            <div className="support-section-heading"><div><span className="section-kicker">Curated near you</span><h2>Popular dine-out destinations</h2></div><Link className="section-link" to="/restaurants">View all restaurants</Link></div>
            <div className="dineout-card-grid">
                {restaurants.map((restaurant) => (
                    <article className="dineout-card" key={restaurant.name}>
                        <div className={`dineout-card-image dineout-image-${restaurant.name.length % 3}`}><span>{restaurant.emoji}</span><strong>{restaurant.offer}</strong></div>
                        <div className="dineout-card-info">
                            <div><h3>{restaurant.name}</h3><span>★ {restaurant.rating}</span></div>
                            <p>{restaurant.cuisine}</p>
                            <p>📍 {restaurant.area}</p>
                            <button type="button">View restaurant</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    </main>
);

export default DineOut;