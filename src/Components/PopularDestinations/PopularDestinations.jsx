import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import DestinationCard from "../DestinationCard/DestinationCard";

const PopularDestinations = () => {
  const [popular, setPopular] = useState([]);
  axios
    .get(`${baseUrl}/popularDestination`)
    .then((res) => {
      setPopular(res.data);
    })
    .catch();
  return (
   <div>
    
   </div>
  );
};

export default PopularDestinations;
