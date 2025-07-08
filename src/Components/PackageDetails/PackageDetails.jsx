import React from "react";
import { Link, useLoaderData } from "react-router";

const PackageDetails = () => {

  const pack = useLoaderData();
  console.log(pack)

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="bg-base-100 rounded-xl shadow-lg flex flex-col lg:flex-row gap-6 p-6">
        <div className="lg:w-1/2">
          <img
            src={pack.imageURL}
            alt={pack.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{pack.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{pack.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <p>
                <span className="font-semibold">Price:</span> ৳{pack.price}
              </p>
              <p>
                <span className="font-semibold">Duration:</span> {pack.duration}
              </p>
              <p>
                <span className="font-semibold">Slots Left:</span> {pack.slot}
              </p>
              <p>
                <span className="font-semibold">Group Size:</span>{" "}
                {pack.memberCount} people
              </p>
              <p>
                <span className="font-semibold">Offer Starts:</span>{" "}
                {new Date(pack.offerStartDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Offer Ends:</span>{" "}
                {new Date(pack.offerEndDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Link to={`/addBookings/${pack._id}`} className="btn btn-primary w-full lg:w-auto px-6">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default PackageDetails;
