import { proxySwiggy } from "../lib/swiggy-shared.mts";

const SWIGGY_LIST_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.374638644228302&lng=78.4300148114562&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

export default async () => proxySwiggy(SWIGGY_LIST_URL);

export const config = { path: "/api/restaurants" };
