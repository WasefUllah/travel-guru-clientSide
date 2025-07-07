import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import DestinationCard from "../DestinationCard/DestinationCard";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/destinations`)
      .then((res) => {
        setDestinations(res.data);
      })
      .catch();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
      {destinations.map((destination, index) => (
        <DestinationCard
          key={index}
          destination={destination}
        ></DestinationCard>
      ))}
    </div>
  );
};

export default Destinations;
