import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import UpdateDestination from "../UpdateDestination/UpdateDestination";

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [toBeUpdatedDestination, setToBeUpdatedDestination] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/destinations`).then((res) => {
      setDestinations(res.data);
    });
  }, [refresh]);
  const handleClick = (id) => {
    axios
      .patch(`${baseUrl}/booking/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setRefresh(!refresh);
        }
      })
      .catch();
  };

  const handleDelete = async (id) => {

    try {
      await axios.get(`${baseUrl}/relatedPackages/${id}`).then((res) => {
        
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
                .delete(`${baseUrl}/destinations/${id}`)
                .then((res) => {
                  if (res.data.deletedCount) {
                    setDestinations(
                      destinations.filter((rem) => rem._id != id)
                    );
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id) => {
    // Navigate or open a modal (depends on your app flow)
 
    const selected = destinations.find((p) => p._id == id);
    setToBeUpdatedDestination(selected);
  };

  return (
    <div className="overflow-x-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Destinations</h2>
      {!destinations ? (
        <p>No available destination</p>
      ) : (
        <div>
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Description</th>
                <th>Email</th>
                <th>popular</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest, index) => (
                <tr key={dest._id}>
                  <td className="font-semibold">{index + 1}</td>
                  <td>
                    <img
                      src={dest.destinationPhoto}
                      alt={dest.destinationName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td>{dest.destinationName}</td>
                  <td>{dest.destinationDescription.slice(0, 30)}...</td>
                  <td>{dest.email}</td>
                  <td onClick={() => handleClick(dest._id)}>
                    {dest.popular ? (
                      <FaHeart size={25} className="text-red-600" />
                    ) : (
                      <CiHeart size={25} />
                    )}
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => {
                        handleUpdate(dest._id);
                        document.getElementById("my_modal_2").showModal();
                      }}
                      className="btn btn-sm btn-outline btn-info"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(dest._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <UpdateDestination
                toBeUpdatedDestination={toBeUpdatedDestination}
                refresh={refresh}
                setRefresh={setRefresh}
              ></UpdateDestination>
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

export default DestinationList;
