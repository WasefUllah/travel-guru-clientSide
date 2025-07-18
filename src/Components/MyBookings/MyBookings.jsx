import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import { AuthContext } from "../../Provider/AuthProvider";
import { format } from "date-fns";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const role = user?.role;
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const handleDelete = (id) => {
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't get refund!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseUrl}/bookings/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              setBookings(bookings.filter((rem) => rem._id != id));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch();
      }
    });
  };

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
      {!packages ? (
        <p>No booking available</p>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Filter by Package:
            </label>
            <select
              className="select select-bordered w-full max-w-sm"
              value={selectedPackageId}
              onChange={(e) => setSelectedPackageId(e.target.value)}
            >
              <option value="">-- All Packages --</option>
              {packages.map((pkg) => (
                <option key={pkg.packageId} value={pkg.packageId}>
                  {pkg.packageTitle}
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
                  <th>Action</th>
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
                    <td>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {bookings.length === 0 && (
              <p className="mt-4 text-center text-gray-500">
                No bookings found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
