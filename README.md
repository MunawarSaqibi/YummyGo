<div align="center">
  <img src="https://ik.imagekit.io/marSaQ/YummyGoLogo.png" alt="YummyGo logo" width="220">
</div>

# YummyGo Food Delivery Website

YummyGo is a responsive React food-delivery website with restaurant discovery, menu browsing, grocery shopping, dine-out reservations, offers, help, and a persistent shopping cart.

## Features

- Professional food-delivery home page
- Route-aware headers for food delivery, grocery, and dine-out
- Searchable restaurant listings with rating and delivery-time filters
- Flexible restaurant-menu loading for changing Swiggy API response shapes
- Menu category accordions and vegetarian/non-vegetarian item indicators
- Persistent cart with quantity controls, totals, and checkout confirmation
- Grocery categories, search, location selection, and product cart controls
- Dine-out search, location selection, reservations, and reservation history
- Copyable offer coupons and searchable help/FAQ content
- Responsive desktop, mobile, and Android layouts
- Installable PWA experience with standalone display and offline app-shell caching
- Fixed Android-style mobile bottom navigation with safe-area support
- Touch-friendly controls and adaptive single/two-column mobile grids

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/restaurants` | Restaurant listing |
| `/restaurantsMenu/:resId` | Restaurant menu |
| `/groceryGo` | Grocery store |
| `/GoDineOut` | Dine-out discovery |
| `/offers` | Offers and coupons |
| `/help` | Help and FAQ |
| `/cart` | Shopping cart |

## Tech Stack

- React 19
- React Router DOM
- Parcel 2
- JavaScript / JSX
- CSS
- Swiggy public API endpoints for live restaurant data

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Open the local URL printed by Parcel, usually `http://localhost:1234`.

### Production Build

```bash
npm run build
```

The production output is generated in the `dist` directory.

## Project Structure

```text
assets/                  Local brand and application assets
src/component/           Pages and reusable UI components
src/context/             Shared application state and cart provider
src/utils/               API constants and custom React hooks
main.js                  Application routes and root rendering
main.css                 Shared responsive styles
```

## Data and Storage

- Restaurant and menu data are loaded dynamically from Swiggy APIs.
- The cart is saved in browser local storage as `yummygo-cart`.
- Dine-out reservations are saved in browser local storage as `yummygo-reservations`.
- API/menu loading, error, and empty states are handled gracefully.

## Assets

Brand assets are referenced through `assets/` and `src/utils/constants.jsx`. The YummyGo logo is loaded from the configured logo URL, and external category and restaurant images are loaded where required.

## Notes

This project is a frontend prototype. Checkout, account, support, and reservation actions demonstrate UI interactions but are not connected to a production payment or booking backend.