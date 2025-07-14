import React from "react";
import { Link } from "react-router";

const DestinationCard = ({ destination }) => {
  return (
    <Link to={`/viewPackages/${destination._id}`}>
      <div className="card bg-base-100 shadow-xl rounded-xl overflow-hidden h-96">
        <figure>
          <img
            src={destination.destinationPhoto}
            alt={destination.destinationName}
            className="w-full h-52 object-cover"
          />
        </figure>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">
            {destination.destinationName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            {destination.destinationDescription}
          </p>
          <p className="text-xs text-gray-400">Posted by: {destination.name}</p>
          <p>Click to view related packages</p>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
