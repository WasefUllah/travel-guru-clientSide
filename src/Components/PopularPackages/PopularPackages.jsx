import React, { useState } from "react";
import PackageCard from "../PackageCard/PackageCard";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";

const PopularPackages = () => {
  const [popular, setPopular] = useState([]);
  axios
    .get(`${baseUrl}/popularPackage`)
    .then((res) => {
      setPopular(res.data);
    })
    .catch();
  return (
   <div>
    
   </div>
  );
};

export default PopularPackages;
