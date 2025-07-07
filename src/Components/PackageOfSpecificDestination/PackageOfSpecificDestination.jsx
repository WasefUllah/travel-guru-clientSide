import React from "react";
import { useLoaderData } from "react-router";
import PackageCard from "../PackageCard/PackageCard";

const PackageOfSpecificDestination = () => {
  // const [packages, setPackages] = useState([]);
  const packages = useLoaderData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
      {packages.map((pack, index) => (
        <PackageCard key={index} pack={pack}></PackageCard>
      ))}
    </div>
  );
};

export default PackageOfSpecificDestination;
