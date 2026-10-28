import { ImageBasicUrl } from "../utils/constants";

const findRestaurantInfo = (root) => {
    let result = null;
    const seen = new Set();

    const visit = (value) => {
        if (result || !value || typeof value !== "object" || seen.has(value)) return;
        seen.add(value);

        if (value.name && (value.cuisines || value.cloudinaryImageId || value.avgRatingString)) {
            result = value;
            return;
        }
        if (value.info?.name) {
            result = value.info;
            return;
        }
        Object.values(value).forEach(visit);
    };

    visit(root);
    return result;
};

const RestaurantInfoCard = ({ menu }) => {
    const info = findRestaurantInfo(menu);
    if (!info) return null;

    const {
        name,
        avgRatingString,
        totalRatingsString,
        cuisines = [],
        cloudinaryImageId,
        costForTwoMessage,
        sla,
        areaName
    } = info;
    const deliveryTime = sla?.deliveryTime || sla?.delieveryTime;

    return (
        <section className="menu-hero">
            <div className="menu-hero-details">
                <span className="menu-eyebrow">Restaurant menu</span>
                <h1>{name}</h1>
                {cuisines.length > 0 && <p className="menu-hero-cuisines">{cuisines.join(", ")}</p>}
                <div className="menu-meta-row">
                    {avgRatingString && (
                        <span className="menu-rating-chip">★ {avgRatingString}<small>{totalRatingsString ? ` ${totalRatingsString}` : ""}</small></span>
                    )}
                    {deliveryTime && <span>⏱️ {deliveryTime} min</span>}
                    {costForTwoMessage && <span>{costForTwoMessage}</span>}
                    {areaName && <span>📍 {areaName}</span>}
                </div>
            </div>
            <div className="menu-hero-image">
                {cloudinaryImageId ? (
                    <img src={`${ImageBasicUrl}${cloudinaryImageId}`} alt={name} />
                ) : <div className="menu-image-placeholder">🍽️</div>}
            </div>
        </section>
    );
};

export default RestaurantInfoCard;