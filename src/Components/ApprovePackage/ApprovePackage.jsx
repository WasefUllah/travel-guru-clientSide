import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";

const ApprovePackage = () => {
  const [pendingPackages, setPendingPackages] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/approvedPackage`) 
      .then((res) => setPendingPackages(res.data))
      .catch((err) => console.error("Failed to load unapproved packages", err));
  }, []);

  const handleApprove = (id) => {
    axios
      .patch(`${baseUrl}/package/${id}`, { approved: true })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Approved!", "Package has been approved.", "success");
          setPendingPackages(pendingPackages.filter((pkg) => pkg._id !== id));
        }
      })
      .catch((err) => console.error("Approval failed", err));
  };

  return (
    <div className="p-4 overflow-x-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Pending Package Approvals</h2>

      {pendingPackages.length === 0 ? (
        <p className="text-gray-500">No unapproved packages found.</p>
      ) : (
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>#</th>
              <th>Title</th>
              <th>Manager</th>
              <th>Price</th>
              <th>Slot</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingPackages.map((pkg, index) => (
              <tr key={pkg._id}>
                <td>{index + 1}</td>
                <td>{pkg.title}</td>
                <td>{pkg.email}</td>
                <td>৳ {pkg.price}</td>
                <td>{pkg.slot}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleApprove(pkg._id)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => console.log("View details", pkg)}
                    className="btn btn-sm btn-outline"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovePackage;
