import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantInfoCard from "./RestaurantInfoCard";
import RestaurantCategory from "./RestaurantCategory";
import MenuShimmer from "./MenuShimmer";
import useMenuRestaurant from "../utils/useMenuRestaurant";

const extractMenuCategories = (root) => {
    const categories = [];
    const seen = new Set();

    const visit = (value) => {
        if (!value || typeof value !== "object" || seen.has(value)) return;
        seen.add(value);

        if (Array.isArray(value)) {
            value.forEach(visit);
            return;
        }

        const possibleCategory = value.card?.card && typeof value.card.card === "object" ? value.card.card : value;
        if (possibleCategory?.title && Array.isArray(possibleCategory.itemCards)) {
            const key = possibleCategory.categoryId || `${possibleCategory.title}-${possibleCategory.itemCards.length}`;
            if (!categories.some((category) => category.key === key)) {
                categories.push({ key, info: possibleCategory });
            }
        }

        Object.values(value).forEach(visit);
    };

    visit(root);
    return categories.map((category) => category.info);
};

const MenuRestaurant = () => {
    const { resId } = useParams();
    const [showIndex, setShowIndex] = useState(0);
    const [categoryQuery, setCategoryQuery] = useState("");
    const { menu, isLoading, error } = useMenuRestaurant(resId);

    if (isLoading) return <div><MenuShimmer /></div>;

    if (error) {
        return (
            <div className="menu-status-card" role="alert">
                <h2>Couldn’t load this menu</h2>
                <p>{error}</p>
            </div>
        );
    }

    const categories = extractMenuCategories(menu);
    const visibleCategories = categories.filter((category) =>
        category.title?.toLowerCase().includes(categoryQuery.trim().toLowerCase())
    );

    return (
        <main className="menu-page">
            <RestaurantInfoCard menu={menu} />

            {categories.length === 0 ? (
                <div className="menu-status-card">
                    <h2>Menu items unavailable</h2>
                    <p>We couldn’t find menu categories for this restaurant right now.</p>
                </div>
            ) : (
                <section className="menu-content">
                    <div className="menu-toolbar">
                        <div>
                            <span className="section-kicker">Our menu</span>
                            <h2>Choose your favourites</h2>
                        </div>
                        <div className="menu-category-search">
                            <span aria-hidden="true">⌕</span>
                            <input
                                value={categoryQuery}
                                onChange={(event) => setCategoryQuery(event.target.value)}
                                placeholder="Search menu categories"
                                aria-label="Search menu categories"
                            />
                        </div>
                    </div>

                    {visibleCategories.length === 0 ? (
                        <div className="menu-status-card compact">
                            <h2>No matching categories</h2>
                            <p>Try a different category name.</p>
                        </div>
                    ) : visibleCategories.map((category, visibleIndex) => {
                        const originalIndex = categories.indexOf(category);
                        return (
                            <RestaurantCategory
                                key={category.categoryId || `${category.title}-${visibleIndex}`}
                                setIndex={() => setShowIndex(originalIndex === showIndex ? null : originalIndex)}
                                order={originalIndex === showIndex}
                                categoryInfo={category}
                            />
                        );
                    })}
                </section>
            )}
        </main>
    );
};

export default MenuRestaurant;