import React from "react";
import { Link } from "react-router";

const PackageCard = ({ pack }) => {
  console.log(pack);
  return (
    <Link to={`/packageDetails/${pack._id}`}>
      <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 rounded-xl overflow-hidden h-96">
        <figure>
          <img
            src={pack.imageURL}
            alt={pack.title}
            className="w-full h-52 object-cover"
          />
        </figure>
        <div className="p-4 space-y-1">
          <h2 className="text-lg font-semibold">{pack.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {pack.description}
          </p>
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="text-primary font-semibold">৳{pack.price}</span>
            <span className="text-gray-500">{pack.duration}</span>
          </div>
          <p>Posted by: {pack.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
