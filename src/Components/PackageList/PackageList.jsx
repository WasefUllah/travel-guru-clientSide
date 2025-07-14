import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import UpdatePackage from "../UpdatePackage/UpdatePackage";
import { AuthContext } from "../../Provider/AuthProvider";

const PackageList = () => {
  const {user} = useContext(AuthContext)
  const [packages, setPackages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [toBeUpdatedPackage, setToBeUpdatedPackage] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/packagesList?email=${user.email}`).then((res) => {
      setPackages(res.data);
    });
  }, [refresh]);
  const handleClick = (id) => {
    axios
      .patch(`${baseUrl}/package/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setRefresh(!refresh);
        }
      })
      .catch();
  };

  const handleDelete = async (id) => {
    await axios.get(`${baseUrl}/relatedBookings/${id}`).then((res) => {
      if (res.data.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This package has related bookings",
          footer: "Make sure there are no related bookings",
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

    const selected = packages.find((p) => p._id == id);
    setToBeUpdatedPackage(selected);
  };

  return (
    <div className="overflow-x-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Packages</h2>
      {!packages ? (
        <p>No available packages</p>
      ) : (
        <div>
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
                <th>approved</th>
                <th>popular</th>
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
                  <td>
                    {pkg.approved ? (
                      <span className="text-green-500 font-bold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-bold">No</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleClick(pkg._id)}
                      disabled={!pkg.approved} // disables if approved is false
                      className={`btn p-1 ${
                        !pkg.approved ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      title={
                        !pkg.approved
                          ? "Approve this package to enable this feature"
                          : ""
                      }
                    >
                      {pkg.popular ? (
                        <FaHeart size={25} className="text-red-600" />
                      ) : (
                        <CiHeart size={25} />
                      )}
                    </button>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => {
                        handleUpdate(pkg._id);
                        document.getElementById("my_modal_1").showModal();
                      }}
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
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <UpdatePackage
                toBeUpdatedPackage={toBeUpdatedPackage}
                refresh={refresh}
                setRefresh={setRefresh}
              ></UpdatePackage>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
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

export default PackageList;
