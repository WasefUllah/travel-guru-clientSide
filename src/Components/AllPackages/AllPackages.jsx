import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { format } from "date-fns";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/allPackages`)
      .then((res) => setPackages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="p-4 overflow-x-auto min-h-screen">
        <h2 className="text-2xl font-bold mb-4">All Approved Packages</h2>

        {packages.length === 0 ? (
          <p className="text-gray-500">No packages available.</p>
        ) : (
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th>#</th>
                <th>Title</th>
                <th>Destination</th>
                <th>Price</th>
                <th>Slot</th>
                <th>Booked</th>
                <th>Duration</th>
                <th>Offer Dates</th>

                <th>Approved</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={pkg._id}>
                  <td>{index + 1}</td>

                  <td>{pkg.title}</td>
                  <td>{pkg.destinationTitle}</td>
                  <td>৳ {pkg.price}</td>
                  <td>{pkg.slot}</td>
                  <td>{pkg.booked}</td>
                  <td>{pkg.duration}</td>
                  <td>
                    {format(new Date(pkg.offerStartDate), "dd MMM yyyy")} -{" "}
                    {format(new Date(pkg.offerEndDate), "dd MMM yyyy")}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        pkg.approved ? "badge-success" : "badge-error"
                      }`}
                    >
                      {pkg.approved ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllPackages;
