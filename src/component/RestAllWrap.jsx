import { useEffect, useMemo, useState } from "react";
import { swiggyURL } from "../utils/constants";
import Shimmer from "./Shimmer";
import Restaurantcard from "./Restaurantcard";
import { Link, useSearchParams } from "react-router-dom";

const extractRestaurants = (root) => {
    const found = [];
    const seen = new Set();

    const visit = (value) => {
        if (!value || typeof value !== "object" || seen.has(value)) return;
        seen.add(value);

        if (Array.isArray(value)) {
            value.forEach(visit);
            return;
        }

        if (value.info?.id && value.info?.name) found.push(value.info);
        if (value.id && value.name && Array.isArray(value.cuisines)) found.push(value);
        Object.values(value).forEach(visit);
    };

    visit(root);

    const unique = new Map();
    found.forEach((restaurant) => {
        if (restaurant?.id) unique.set(String(restaurant.id), restaurant);
    });
    return [...unique.values()];
};

export const RestAllWrap = () => {
    const [hotelList, setHotelList] = useState(null);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [filter, setFilter] = useState("all");
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const nextQuery = searchParams.get("q") || "";
        setQuery(nextQuery);
    }, [searchParams]);

    useEffect(() => {
        const controller = new AbortController();

        const getData = async () => {
            try {
                const response = await fetch(swiggyURL, { signal: controller.signal });
                if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
                const data = await response.json();
                setHotelList(extractRestaurants(data));
                setError(null);
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    setError(requestError.message || "Unable to load restaurants");
                    setHotelList([]);
                }
            }
        };

        getData();
        return () => controller.abort();
    }, [reloadKey]);

    const filteredRestaurants = useMemo(() => {
        const search = query.trim().toLowerCase();
        let result = [...(hotelList || [])];

        if (search) {
            result = result.filter((restaurant) =>
                restaurant.name?.toLowerCase().includes(search) ||
                restaurant.cuisines?.join(" ").toLowerCase().includes(search) ||
                restaurant.areaName?.toLowerCase().includes(search)
            );
        }

        if (filter === "top-rated") result = result.filter((restaurant) => Number(restaurant.avgRating) >= 4.2);
        if (filter === "fast") {
            result = result.filter((restaurant) => (restaurant.sla?.deliveryTime || restaurant.sla?.delieveryTime || 30) <= 30);
        }
        return result;
    }, [hotelList, query, filter]);

    return (
        <main className="restaurants-page">
            <section className="restaurants-heading">
                <div>
                    <span className="section-kicker">Discover nearby</span>
                    <h1>Restaurants around you</h1>
                    <p>Fresh flavours, quick delivery, and restaurants worth revisiting.</p>
                </div>
                <div className="restaurant-search">
                    <span aria-hidden="true">⌕</span>
                    <input
                        value={query}
                        onChange={(event) => { setQuery(event.target.value); const params = new URLSearchParams(searchParams); if (event.target.value) params.set("q", event.target.value); else params.delete("q"); setSearchParams(params, { replace: true }); }}
                        placeholder="Search restaurant, cuisine or area"
                        aria-label="Search restaurants"
                    />
                </div>
            </section>

            <div className="restaurant-filter-row" aria-label="Restaurant filters">
                {[{ id: "all", label: "All" }, { id: "top-rated", label: "Top rated" }, { id: "fast", label: "Within 30 min" }].map((option) => (
                    <button
                        type="button"
                        key={option.id}
                        className={`filter-chip${filter === option.id ? " active" : ""}`}
                        onClick={() => setFilter(option.id)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {hotelList === null ? <Shimmer /> : error ? (
                <div className="restaurant-status-card" role="alert">
                    <h2>Couldn’t load restaurants</h2>
                    <p>{error}</p>
                    <button className="restaurant-retry-button" type="button" onClick={() => { setHotelList(null); setError(null); setReloadKey((key) => key + 1); }}>Try again</button>
                </div>
            ) : filteredRestaurants.length === 0 ? (
                <div className="restaurant-status-card">
                    <h2>No restaurants found</h2>
                    <p>Try another name, cuisine, area, or restaurant filter.</p>
                </div>
            ) : (
                <>
                    <div className="restaurant-results-count">{filteredRestaurants.length} restaurants available</div>
                    <div className="restaurants-grid items-container">
                        {filteredRestaurants.map((restaurant) => (
                            <Link className="restaurant-link" to={`/restaurantsMenu/${restaurant.id}`} key={restaurant.id}>
                                <Restaurantcard resData={restaurant} />
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
};

export default RestAllWrap;