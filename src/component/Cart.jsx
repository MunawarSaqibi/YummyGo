import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ImageBasicUrl } from "../utils/constants";

const Cart = () => {
    const { items, itemCount, itemTotal, updateQuantity, removeItem, clearCart } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const deliveryFee = items.length ? 40 : 0;
    const taxes = Math.round(itemTotal * 0.05);
    const total = itemTotal + deliveryFee + taxes;

    const checkout = () => {
        clearCart();
        setOrderPlaced(true);
    };

    return (
        <main className="cart-page">
            <section className="cart-heading">
                <div><span className="section-kicker">Your order</span><h1>Shopping cart</h1></div>
                <span className="cart-count">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
            </section>

            {orderPlaced && <div className="cart-success" role="status"><span>✓</span><div><strong>Order placed successfully!</strong><p>Your delicious order is on the way.</p></div><button type="button" onClick={() => setOrderPlaced(false)}>×</button></div>}

            <section className="cart-layout">
                {items.length === 0 ? (
                    <div className="cart-empty-card">
                        <div className="cart-empty-art" aria-hidden="true"><span>🛒</span><i>✓</i></div>
                        <h2>Your cart is empty</h2>
                        <p>Add delicious dishes from your favourite restaurant to get started.</p>
                        <Link to="/restaurants">Explore restaurants</Link>
                    </div>
                ) : (
                    <div className="cart-items-card">
                        <h2>Order items</h2>
                        {items.map((item) => (
                            <article className="cart-item" key={item.id}>
                                {item.imageId ? <img src={ImageBasicUrl + item.imageId} alt={item.name} /> : <div className="cart-item-placeholder">🍽️</div>}
                                <div className="cart-item-info"><h3>{item.name}</h3><strong>₹{item.price.toFixed(0)}</strong></div>
                                <div className="cart-item-actions">
                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>−</button>
                                    <span>{item.quantity}</span>
                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name}`}>+</button>
                                </div>
                                <button className="cart-remove" type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
                            </article>
                        ))}
                    </div>
                )}

                <aside className="bill-card">
                    <h2>Bill details</h2>
                    <div><span>Item total</span><strong>₹{itemTotal.toFixed(0)}</strong></div>
                    <div><span>Delivery fee</span><strong>{deliveryFee ? `₹${deliveryFee}` : "—"}</strong></div>
                    <div><span>Taxes & charges</span><strong>{taxes ? `₹${taxes}` : "—"}</strong></div>
                    <div className="bill-total"><span>To pay</span><strong>₹{items.length ? total : 0}</strong></div>
                    <button type="button" disabled={!items.length} onClick={checkout}>Proceed to checkout</button>
                </aside>
            </section>
        </main>
    );
};

export default Cart;