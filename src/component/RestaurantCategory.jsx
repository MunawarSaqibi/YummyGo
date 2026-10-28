import React from "react";
import MenuItem from "./MenuItem";

const RestaurantCategory = ({ categoryInfo = {}, order = false, setIndex }) => {
    const { title = "Menu", itemCards = [] } = categoryInfo;

    const toggleBody = () => {
        if (setIndex) setIndex();
    };

    return (
        <section className={`category-accordian${order ? " is-open" : ""}`}>
            <button
                className="category-header"
                type="button"
                onClick={toggleBody}
                aria-expanded={order}
            >
                <span>{title} ({itemCards.length})</span>
                <span className="category-arrow" aria-hidden="true">⌄</span>
            </button>

            {order && (
                <div className="category-body">
                    {itemCards.map((singleMenu, index) => {
                        const details = singleMenu?.card?.info;
                        return details ? (
                            <MenuItem details={details} key={details.id || index} />
                        ) : null;
                    })}
                </div>
            )}
        </section>
    );
};

export default RestaurantCategory;