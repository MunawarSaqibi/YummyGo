import { ImageBasicUrl } from "../utils/constants";

const Restaurantcard = ({ resData = {} }) => {
    const {
        name = "Restaurant",
        cuisines = [],
        avgRating,
        avgRatingString,
        sla = {},
        costForTwo = "",
        costForTwoMessage = "",
        cloudinaryImageId,
        areaName = "Nearby"
    } = resData;

    const deliveryTime = sla?.deliveryTime || sla?.delieveryTime || 30;

    return (
        <article className="item-card">
            <div className="img-div">
                {cloudinaryImageId ? (
                    <img className="item-img" src={`${ImageBasicUrl}${cloudinaryImageId}`} alt={name} loading="lazy" />
                ) : <div className="item-img-placeholder">🍽️</div>}
                {(avgRating || avgRatingString) && <span className="rating-badge">★ {avgRating || avgRatingString}</span>}
            </div>
            <div className="item-res">{name}</div>
            <div className="item-cuisine">{cuisines.length ? cuisines.join(", ") : "Popular dishes"}</div>
            <div className="item-loc"><span>📍 {areaName}</span><span>⏱️ {deliveryTime} min</span></div>
            {(costForTwo || costForTwoMessage) && <div className="item-rp"><span>Cost for two</span><strong>{costForTwoMessage || `₹${costForTwo}`}</strong></div>}
        </article>
    );
};


export default Restaurantcard