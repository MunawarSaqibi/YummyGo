import { useEffect, useState } from "react";
import { MenuAPI } from "./constants";

const useMenuRestaurant = (resId) => {
    const [state, setState] = useState({ menu: null, isLoading: true, error: null });

    useEffect(() => {
        if (!resId) {
            setState({ menu: null, isLoading: false, error: "Restaurant ID is missing" });
            return;
        }

        const controller = new AbortController();

        const getRestaurantMenu = async () => {
            setState({ menu: null, isLoading: true, error: null });

            try {
                const rawData = await fetch(MenuAPI + resId, { signal: controller.signal });
                if (!rawData.ok) throw new Error(`Menu request failed with status ${rawData.status}`);

                const json = await rawData.json();
                setState({ menu: json, isLoading: false, error: null });
            } catch (error) {
                if (error.name === "AbortError") return;
                console.error("Failed to fetch restaurant menu:", error);
                setState({ menu: null, isLoading: false, error: error.message || "Unable to load this menu" });
            }
        };

        getRestaurantMenu();
        return () => controller.abort();
    }, [resId]);

    return state;
};

export default useMenuRestaurant;

