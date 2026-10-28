const RestAllCard=()=>{
const {
     id,
        name,
        cuisines,
        avgRating,
        sla,
        costForTwo,
        cloudinaryImageId,
        areaName,
    }= resAllData ;
    return 
    <div>
        <div className="allRestaurants-Wrapper">
            <div className="img-div">
                                 <img className="item-img" src={`${ImageBasicUrl}${cloudinaryImageId}`}/>
                             </div>
                             <div className="item-res">{name}</div>
                             <div className="item-cuisine">{cuisines.join(", ")}</div>
                             <div className="item-loc"> 📍{areaName} | ⏱️Delivery within {sla.delieveryTime}min </div>
                             <div className="item-rp"> ⭐{avgRating} |  {costForTwo}</div>
                         </div>
        </div>
    
}
export default RestAllCard