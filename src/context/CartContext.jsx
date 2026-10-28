import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "yummygo-cart";

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (item) => {
        if (!item?.id) return;
        setItems((current) => {
            const existing = current.find((cartItem) => cartItem.id === item.id);
            if (existing) return current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
            return [...current, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));
    const updateQuantity = (id, quantity) => setItems((current) => quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item));
    const clearCart = () => setItems([]);

    const value = useMemo(() => {
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { items, itemCount, itemTotal, addItem, removeItem, updateQuantity, clearCart };
    }, [items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
};
