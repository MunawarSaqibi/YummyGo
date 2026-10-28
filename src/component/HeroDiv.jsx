import { Bannerbg, BiryaniPNG, BurgerPNG, ChineesePNG, DessertsPNG, MandiPNG, PizzaPNG } from "../utils/constants";
import { Link } from "react-router-dom";

const categories = [
    { name: "Biryani", image: BiryaniPNG },
    { name: "Pizza", image: PizzaPNG },
    { name: "Burgers", image: BurgerPNG },
    { name: "Chinese", image: ChineesePNG },
    { name: "Desserts", image: DessertsPNG },
    { name: "Mandi", image: MandiPNG }
];

const HeroDiv = () => {
    return (
        <>
            <section className="hero-container" style={{ "--banner-bg": `url("${Bannerbg}")` }}>
                <div className="hero-content">
                    <span className="hero-eyebrow">Fast delivery in your city</span>
                    <h1>Craving something delicious?</h1>
                    <p>Discover top-rated restaurants and get your favourites delivered fresh and fast.</p>
                    <Link className="order-btn hero-order-btn" to="/restaurants">Explore restaurants</Link>
                </div>

                <div className="delivery-services">
                    <Link className="service-card" to="/restaurants">
                        <span className="service-icon">🍽️</span>
                        <span><strong>Food delivery</strong><small>Top local restaurants</small></span>
                        <b>›</b>
                    </Link>
                    <Link className="service-card" to="/groceryGo">
                        <span className="service-icon">🛒</span>
                        <span><strong>Groceries</strong><small>Daily essentials</small></span>
                        <b>›</b>
                    </Link>
                    <Link className="service-card" to="/GoDineOut">
                        <span className="service-icon">🥂</span>
                        <span><strong>Dine out</strong><small>Reserve nearby tables</small></span>
                        <b>›</b>
                    </Link>
                </div>
            </section>

            <section className="home-category-section">
                <div className="section-heading">
                    <div><span className="section-kicker">What are you hungry for?</span><h2>Explore popular categories</h2></div>
                    <Link to="/restaurants">View all</Link>
                </div>
                <div className="top-categories">
                    {categories.map((category) => (
                        <Link className="category-card" to={`/restaurants?q=${encodeURIComponent(category.name)}`} key={category.name}>
                            <span className="category-image-wrap"><img className="categoryImg" src={category.image} alt={category.name} /></span>
                            <strong>{category.name}</strong>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HeroDiv;