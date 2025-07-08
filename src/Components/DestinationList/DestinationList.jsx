import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/destinations`).then((res) => {
      setDestinations(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.get(`${baseUrl}/relatedPackages/${id}`).then((res) => {
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
            // axios.delete(`${baseUrl}/destinations/${id}`).then((res) => {
            //   if (res.data.deletedCount) {
            //     // remaining logic
            //   }
          });
        }
      });

      // setDestinations((prev) => prev.filter((item) => item._id !== id));
      // alert("Destination deleted.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id) => {
    // Navigate or open a modal (depends on your app flow)
    console.log("Update destination:", id);
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Destinations</h2>
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Description</th>
            <th>Email</th>
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
              <td className="space-x-2">
                <button
                  onClick={() => handleUpdate(dest._id)}
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
    </div>
  );
};

export default DestinationList;
