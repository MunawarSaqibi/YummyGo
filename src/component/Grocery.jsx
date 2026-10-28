import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const groceryCategories = [
    { name: "Fresh fruits", icon: "🍎", color: "#fff0ed" },
    { name: "Vegetables", icon: "🥦", color: "#edf8e9" },
    { name: "Dairy & eggs", icon: "🥛", color: "#edf4ff" },
    { name: "Bakery", icon: "🥐", color: "#fff3dd" },
    { name: "Beverages", icon: "🧃", color: "#fff0f5" },
    { name: "Snacks", icon: "🍿", color: "#fff5db" }
];

const products = [
    { id: "grocery-apples", name: "Farm Fresh Apples", detail: "500 g", category: "Fresh fruits", price: 149, icon: "🍎", oldPrice: 180 },
    { id: "grocery-eggs", name: "Farm Eggs", detail: "Pack of 6", category: "Dairy & eggs", price: 78, icon: "🥚", oldPrice: 92 },
    { id: "grocery-bread", name: "Whole Wheat Bread", detail: "400 g", category: "Bakery", price: 45, icon: "🍞", oldPrice: 55 },
    { id: "grocery-milk", name: "Fresh Milk", detail: "1 litre", category: "Dairy & eggs", price: 68, icon: "🥛", oldPrice: 72 },
    { id: "grocery-carrots", name: "Fresh Carrots", detail: "500 g", category: "Vegetables", price: 52, icon: "🥕", oldPrice: 65 },
    { id: "grocery-juice", name: "Orange Juice", detail: "1 litre", category: "Beverages", price: 110, icon: "🧃", oldPrice: 130 }
];

const Grocery = () => {
    const { addItem, items, updateQuantity } = useCart();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("Home · 500001");

    useEffect(() => {
        const handleSearch = (event) => setSearch(event.detail || "");
        window.addEventListener("yummygo-grocery-search", handleSearch);
        return () => window.removeEventListener("yummygo-grocery-search", handleSearch);
    }, []);

    const visibleProducts = products.filter((product) => {
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesSearch = !search || `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const changeLocation = () => {
        const nextLocation = window.prompt("Enter delivery location", location);
        if (nextLocation?.trim()) setLocation(nextLocation.trim());
    };

    return (
        <main className="grocery-page">
            <section className="grocery-hero">
                <div className="grocery-hero-copy">
                    <span className="section-kicker">Freshly delivered</span>
                    <h1>Groceries at your doorstep</h1>
                    <p>Fresh produce, daily essentials, and pantry favourites—delivered in minutes.</p>
                    <div className="delivery-location"><span aria-hidden="true">📍</span><div><small>Delivering to</small><strong>{location}</strong></div><button type="button" onClick={changeLocation}>Change</button></div>
                </div>
                <div className="grocery-basket" aria-hidden="true"><span>🥬</span><span>🍎</span><span>🥖</span><span>🥛</span></div>
            </section>

            <section className="grocery-section">
                <div className="support-section-heading"><div><span className="section-kicker">Shop by aisle</span><h2>Popular categories</h2></div><button className="section-text-button" type="button" onClick={() => { setSelectedCategory(""); setSearch(""); }}>View all</button></div>
                <div className="grocery-category-grid">
                    {groceryCategories.map((category) => (
                        <button className={`grocery-category-card${selectedCategory === category.name ? " active" : ""}`} type="button" style={{ "--category-bg": category.color }} key={category.name} onClick={() => setSelectedCategory(selectedCategory === category.name ? "" : category.name)}><span>{category.icon}</span><strong>{category.name}</strong></button>
                    ))}
                </div>
            </section>

            <section className="grocery-section">
                <div className="support-section-heading"><div><span className="section-kicker">Everyday value</span><h2>{selectedCategory || (search ? `Results for “${search}”` : "Fresh picks for you")}</h2></div><Link className="section-link" to="/restaurants">Explore food</Link></div>
                {visibleProducts.length ? <div className="grocery-product-grid">
                    {visibleProducts.map((product) => {
                        const cartItem = items.find((item) => item.id === product.id);
                        return <article className="grocery-product-card" key={product.name}>
                            <div className="grocery-product-image"><span>{product.icon}</span><em>Save 15%</em></div>
                            <div className="grocery-product-info"><h3>{product.name}</h3><p>{product.detail}</p><div><strong>₹{product.price}</strong><del>₹{product.oldPrice}</del>{cartItem ? <div className="grocery-add-controls"><button type="button" onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}>−</button><span>{cartItem.quantity}</span><button type="button" onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}>+</button></div> : <button type="button" aria-label={`Add ${product.name}`} onClick={() => addItem(product)}>ADD</button>}</div></div>
                        </article>;
                    })}
                </div> : <div className="restaurant-status-card"><h2>No products found</h2><p>Try another category or search.</p></div>}
            </section>
        </main>
    );
};

export default Grocery;