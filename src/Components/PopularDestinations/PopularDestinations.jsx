import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import DestinationCard from "../DestinationCard/DestinationCard";

const PopularDestinations = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/popularDestination`)
      .then((res) => {
        setPopular(res.data);
      })
      .catch();
  },[]);
  return (
    <div>
      <div className="my-10">
        <h1 className="text-primary text-2xl md:text-4xl lg:text-6xl font-bold my-4">
          Popular Destinations
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {popular.map((dest) => (
            <DestinationCard destination={dest}></DestinationCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
