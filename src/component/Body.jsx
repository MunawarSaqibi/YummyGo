import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import Restaurantcard from "./Restaurantcard";
import { swiggyURL } from "../utils/constants";
import { Link } from "react-router-dom";

const Body = () => {
    const [hotelList, setHotelList]=useState(null)

    useEffect(()=>{
        getData();
    },[])

    const getData= async()=>{

        const response= await fetch(swiggyURL);
        const data= await response.json();
        console.log( 
             data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        setHotelList(
             data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        );
        // console.log("hotel list", hotelList)
    }

    if(hotelList == null){
        return <Shimmer/>
    }

    return (
        <section className="featured-section">
            <div className="section-heading">
                <div><span className="section-kicker">Curated for you</span><h2>Featured restaurants</h2></div>
                <Link to="/restaurants">See all restaurants</Link>
            </div>
            <div className="home-items-container items-container">
                {hotelList.slice(0, 8).map((resObj) => (
                    <Link className="restaurant-link" to={`/restaurantsMenu/${resObj?.info?.id}`} key={resObj?.info?.id}>
                        <Restaurantcard resData={resObj?.info} />
                    </Link>
                ))}
            </div>
        </section>
    );
   

}

export default Body