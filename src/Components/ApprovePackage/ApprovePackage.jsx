import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";

const ApprovePackage = () => {
  const [pendingPackages, setPendingPackages] = useState([]);
  const [selected, setSelected] = useState([]);

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
        <div>
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
                      onClick={() => {
                        setSelected(
                          pendingPackages.find((p) => p._id == pkg._id)
                        );
                        document.getElementById("my_modal_3").showModal();
                      }}
                      className="btn btn-sm btn-outline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box max-w-3xl">
              <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
              <img
                src={selected.imageURL}
                alt={selected.title}
                className="w-full h-64 object-cover rounded mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <span className="font-semibold">Destination:</span>{" "}
                    {selected.destinationTitle}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> ৳
                    {selected.price}
                  </p>
                  <p>
                    <span className="font-semibold">Slot:</span> {selected.slot}
                  </p>
                  <p>
                    <span className="font-semibold">Booked:</span>{" "}
                    {selected.booked}
                  </p>
                  <p>
                    <span className="font-semibold">Duration:</span>{" "}
                    {selected.duration}
                  </p>
                  <p>
                    <span className="font-semibold">Member Count:</span>{" "}
                    {selected.memberCount}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Offer Start:</span>{" "}
                    {new Date(selected.offerStartDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Offer End:</span>{" "}
                    {new Date(selected.offerEndDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Created By:</span>{" "}
                    {selected.email}
                  </p>
                  <p>
                    <span className="font-semibold">Popular:</span>{" "}
                    {selected.popular ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold">Approved:</span>{" "}
                    {selected.approved ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold">Description:</p>
                <p className="whitespace-pre-wrap">{selected.description}</p>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default ApprovePackage;
