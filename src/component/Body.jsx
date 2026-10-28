import Shimmer from "./Shimmer";
import { useCallback, useEffect, useState } from "react";
import Restaurantcard from "./Restaurantcard";
import { swiggyURL } from "../utils/constants";
import { Link } from "react-router-dom";

const extractRestaurants = (root) => {
    const found = [];
    const seen = new Set();
    const visit = (value) => {
        if (!value || typeof value !== "object" || seen.has(value)) return;
        seen.add(value);
        if (Array.isArray(value)) { value.forEach(visit); return; }
        if (value.info?.id && value.info?.name) found.push(value.info);
        if (value.id && value.name && Array.isArray(value.cuisines)) found.push(value);
        Object.values(value).forEach(visit);
    };
    visit(root);
    return [...new Map(found.filter((item) => item?.id).map((item) => [String(item.id), item])).values()].slice(0, 8);
};

const Body = () => {
    const [hotelList, setHotelList] = useState(null);
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);

    const getData = useCallback(async () => {
        const controller = new AbortController();
        setHotelList(null);
        setError("");
        try {
            const response = await fetch(swiggyURL, { signal: controller.signal });
            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            const data = await response.json();
            setHotelList(extractRestaurants(data));
        } catch (requestError) {
            if (requestError.name !== "AbortError") setError(requestError.message || "Unable to load featured restaurants");
        }
        return () => controller.abort();
    }, []);

    useEffect(() => { let abort; getData().then((cleanup) => { abort = cleanup; }); return () => abort?.(); }, [getData, attempt]);

    if (hotelList === null && !error) return <Shimmer />;

    return (
        <section className="featured-section">
            <div className="section-heading"><div><span className="section-kicker">Curated for you</span><h2>Featured restaurants</h2></div><Link to="/restaurants">See all restaurants</Link></div>
            {error ? <div className="restaurant-status-card" role="alert"><h2>Featured restaurants unavailable</h2><p>{error}</p><button className="filter-chip active" type="button" onClick={() => setAttempt((value) => value + 1)}>Try again</button></div> : hotelList?.length ? (
                <div className="home-items-container items-container">
                    {hotelList.map((restaurant) => <Link className="restaurant-link" to={`/restaurantsMenu/${restaurant.id}`} key={restaurant.id}><Restaurantcard resData={restaurant} /></Link>)}
                </div>
            ) : <div className="restaurant-status-card"><h2>No featured restaurants found</h2><p>Browse all restaurants to discover nearby options.</p></div>}
        </section>
    );
};

export default Body;