import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";

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
  return <div>
    {destinations.length}
  </div>;
};

export default Destinations;
