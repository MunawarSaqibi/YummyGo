import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./src/Applayout";
import Home from "./src/component/Home";
import Restaurantlisting from "./src/component/Restaurantlisting";
import Cart from "./src/component/Cart";
import Error from "./src/component/Eroor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuRestaurant from "./src/component/MenuRestaurant";
import Offers from "./src/component/Offers";
import Help from "./src/component/Help";

const Grocery = lazy(() => import("./src/component/Grocery"));
const DineOut = lazy(() => import("./src/component/DineOut"));

const routerApp = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/restaurants",
                element: <Restaurantlisting />
            },
            {
                path: "/restaurantsMenu/:resId",
                element: <MenuRestaurant />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/offers",
                element: <Offers />
            },
            {
                path: "/help",
                element: <Help />
            },
            {
                path: "/groceryGo",
                element: <Suspense fallback={<div className="page-loading">Loading groceries...</div>}><Grocery /></Suspense>
            },
            {
                path: "/GoDineOut",
                element: <Suspense fallback={<div className="page-loading">Loading restaurants...</div>}><DineOut /></Suspense>
            },
            {
                path: "*",
                element: <Error />
            }
        ],
        errorElement: <Error />
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routerApp} />);

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    window.__yummygoInstallPrompt = event;
    window.dispatchEvent(new CustomEvent("yummygo-installable", { detail: event }));
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register(new URL("./sw.js", import.meta.url), { scope: "/" })
            .then((registration) => registration.update())
            .catch((error) => console.error("YummyGo service worker registration failed:", error));
    });
}