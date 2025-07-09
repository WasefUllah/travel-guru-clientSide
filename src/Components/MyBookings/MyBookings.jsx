import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import { AuthContext } from "../../Provider/AuthProvider";
import { format } from "date-fns";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const role = user?.role;
  console.log(role);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");

  // Fetch packages created by this manager
  useEffect(() => {
    if (!email) return;

    axios
      .get(`${baseUrl}/packages?email=${email}`)
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => console.error(err));
  }, [email]);
  console.log(packages, "----------------");
  // Fetch bookings whenever selectedPackageId or email changes
  useEffect(() => {
    if (!email) return;

    axios
      .get(
        `${baseUrl}/bookings?email=${email}&role=${role}&filter=${selectedPackageId}`
      )
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, [email, selectedPackageId]);

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen">
      {
        !packages ? (<p>No booking available</p>) : (<div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Filter by Package:</label>
          <select
            className="select select-bordered w-full max-w-sm"
            value={selectedPackageId}
            onChange={(e) => setSelectedPackageId(e.target.value)}
          >
            <option value="">-- All Packages --</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.title}
              </option>
            ))}
          </select>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Travel Date</th>
                <th>Package</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking._id}>
                  <td>{idx + 1}</td>
                  <td>
                    {booking.firstName} {booking.lastName}
                  </td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.phone}</td>
                  <td>
                    {format(new Date(booking.travelDate), "do MMMM, yyyy")}
                  </td>
                  <td>{booking.packageTitle}</td>
                  <td>{`${booking.fee} ৳`}</td>
                  <td>
                    <span className="badge badge-success">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <p className="mt-4 text-center text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>)
      }
      
    </div>
  );
};

export default MyBookings;
