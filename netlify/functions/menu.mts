import { proxySwiggy } from "../lib/swiggy-shared.mts";

const SWIGGY_MENU_URL =
  "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.374638644228302&lng=78.4300148114562&restaurantId=";

export default async (req: Request) => {
  const restaurantId = new URL(req.url).searchParams.get("restaurantId") || "";
  if (!/^\d+$/.test(restaurantId)) {
    return Response.json({ error: "A valid restaurantId is required" }, { status: 400 });
  }
  return proxySwiggy(SWIGGY_MENU_URL + restaurantId);
};

export const config = { path: "/api/menu" };
