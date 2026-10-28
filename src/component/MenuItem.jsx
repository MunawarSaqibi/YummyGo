import { ImageBasicUrl } from "../utils/constants";
import { useCart } from "../context/CartContext";

const MenuItem = ({ details = {} }) => {
    const { addItem, items, updateQuantity } = useCart();
    const {
        name = "Menu item",
        price,
        description = "",
        imageId,
        ratings,
        finalPrice,
        defaultPrice,
        isVeg,
        ribbon
    } = details;

    const amountInPaise = price || finalPrice || defaultPrice;
    const displayPrice = amountInPaise ? `₹${amountInPaise / 100}` : "Price unavailable";
    const rating = ratings?.aggregatedRating?.rating;
    const priceInRupees = amountInPaise ? amountInPaise / 100 : 0;
    const cartItem = items.find((item) => item.id === String(details.id || name));

    return (
        <article className="menu-item-card">
            <div className="menu-item-details">
                <div className="menu-item-type-row">
                    {typeof isVeg === "boolean" && <span className={`food-type-mark${isVeg ? " veg" : " non-veg"}`} aria-label={isVeg ? "Vegetarian" : "Non vegetarian"} />}
                    {ribbon?.text && <span className="menu-best-seller">{ribbon.text}</span>}
                </div>
                <h3>{name}</h3>
                <strong className="menu-item-price">{displayPrice}</strong>
                {rating && <span className="menu-item-rating">★ {rating}</span>}
                {description && <p>{description}</p>}
            </div>

            <div className="menu-item-image-wrap">
                {imageId ? (
                    <img className="menu-item-img" src={ImageBasicUrl + imageId} alt={name} loading="lazy" />
                ) : <div className="menu-item-placeholder">🍽️</div>}
                {cartItem ? (
                    <div className="menu-cart-quantity" aria-label={`${name} quantity`}>
                        <button type="button" onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} aria-label={`Remove one ${name}`}>−</button>
                        <strong>{cartItem.quantity}</strong>
                        <button type="button" onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} aria-label={`Add one ${name}`}>+</button>
                    </div>
                ) : (
                    <button className="add-item-button" type="button" aria-label={`Add ${name} to cart`} disabled={!amountInPaise} onClick={() => addItem({ id: String(details.id || name), name, price: priceInRupees, imageId })}>ADD</button>
                )}
            </div>
        </article>
    );
};

export default MenuItem;