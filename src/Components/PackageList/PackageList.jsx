import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/packages`).then((res) => {
      setPackages(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${baseUrl}/packages/${id}`);
      setPackages((prev) => prev.filter((item) => item._id !== id));
      alert("Package deleted.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    console.log("Update package:", id);
    // Navigate or show modal (optional)
  };

  return (
    <div className="overflow-x-auto p-4">
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
