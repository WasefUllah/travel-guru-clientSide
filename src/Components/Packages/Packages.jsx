import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import PackageCard from "../PackageCard/PackageCard";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/packages`)
      .then((res) => {

        setPackages(res.data);
      })
      .catch();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen md:gap-4">
      {packages.map((pack, index) => (
        <PackageCard key={index} pack={pack}></PackageCard>
      ))}
    </div>
  );
};

export default Packages;
