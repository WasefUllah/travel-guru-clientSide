import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../../URL/baseUrl";

const UpdateDestination = ({ toBeUpdatedDestination, refresh, setRefresh }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFields = Object.fromEntries(formData.entries());

    axios
      .patch(`${baseUrl}/booking/${toBeUpdatedDestination._id}`, updatedFields)
      .then((res) => {
        if (res.data.modifiedCount) {
          form.reset();
          setRefresh(!refresh);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Destination has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch();
  };
  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-2xl mx-auto p-4 bg-base-200 rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          Update Destination
        </h2>

        <div>
          <label className="label">Destination Name</label>
          <input
            type="text"
            name="destinationName"
            defaultValue={toBeUpdatedDestination.destinationName}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            name="destinationDescription"
            defaultValue={toBeUpdatedDestination.destinationDescription}
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="label">Destination Photo URL</label>
          <input
            type="url"
            name="destinationPhoto"
            defaultValue={toBeUpdatedDestination.destinationPhoto}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-4 px-6">
            Update Destination
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDestination;
