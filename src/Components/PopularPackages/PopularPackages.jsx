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
     <div className="my-10">
      <h1 className="text-primary text-2xl md:text-4xl lg:text-6xl font-bold my-4">
        Popular Packages
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-4">
        {popular.map((pkg) => (
          <PackageCard pack={pkg}></PackageCard>
        ))}
      </div>
    </div>
   </div>
  );
};

export default PopularPackages;
