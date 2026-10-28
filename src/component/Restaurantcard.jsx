import { ImageBasicUrl } from "../utils/constants";

const Restaurantcard = ({ resData = {} }) => {
    const info = resData?.info || resData;
    const name = info.name || info.restaurantName || "Restaurant";
    const cuisines = Array.isArray(info.cuisines) ? info.cuisines : [];
    const avgRating = info.avgRating ?? info.avgRatingString ?? info.rating?.aggregate_rating;
    const deliveryTime = info.sla?.deliveryTime || info.sla?.delieveryTime || info.deliveryTime || info.sla?.slaString || 30;
    const costForTwo = info.costForTwoMessage || info.costForTwo || info.cost_for_two || "";
    const cloudinaryImageId = info.cloudinaryImageId || info.featuredImage || info.image?.[0];
    const areaName = info.areaName || info.locality || info.area || "Nearby";

    return (
        <article className="item-card">
            <div className="img-div">
                {cloudinaryImageId ? (
                    <img className="item-img" src={/^https?:\/\//i.test(cloudinaryImageId) ? cloudinaryImageId : `${ImageBasicUrl}${cloudinaryImageId}`} alt={name} loading="lazy" />
                ) : <div className="item-img-placeholder">🍽️</div>}
                {avgRating && <span className="rating-badge">★ {avgRating}</span>}
            </div>
            <div className="item-res">{name}</div>
            <div className="item-cuisine">{cuisines.length ? cuisines.join(", ") : "Popular dishes"}</div>
            <div className="item-loc"><span>📍 {areaName}</span><span>⏱️ {deliveryTime} min</span></div>
            {costForTwo && <div className="item-rp"><span>Cost for two</span><strong>{costForTwo}</strong></div>}
        </article>
    );
};


export default Restaurantcard