import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/packages`).then((res) => {
      setPackages(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
 

    await axios.get(`${baseUrl}/relatedBookings/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This destination has related package",
          footer: "Make sure there are no related package",
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`${baseUrl}/packages/${id}`)
              .then((res) => {
                if (res.data.deletedCount) {
                  setPackages(packages.filter((rem) => rem._id != id));
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                }
              })
              .catch((err) => console.log(err));
          }
        });
      }
    });
  };

  const handleUpdate = (id) => {
    console.log("Update package:", id);
    // Navigate or show modal (optional)
  };

  return (
    <div className="overflow-x-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Packages</h2>
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Slots</th>
            <th>Bookings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={pkg._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={pkg.imageURL}
                  alt={pkg.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{pkg.title}</td>
              <td>৳ {pkg.price}</td>
              <td>{pkg.duration}</td>
              <td>{pkg.slot}</td>
              <td>{pkg.booked}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handleUpdate(pkg._id)}
                  className="btn btn-sm btn-outline btn-info"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageList;
