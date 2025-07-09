import axios from "axios";
import React from "react";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";

const UpdatePackage = ({ toBeUpdatedPackage, refresh, setRefresh }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFields = Object.fromEntries(formData.entries());
    console.log(updatedFields);
    axios
      .patch(`${baseUrl}/package/${toBeUpdatedPackage._id}`, updatedFields)
      .then((res) => {
        if (res.data.modifiedCount) {
          setRefresh(!refresh);
          console.log("hi");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Package has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch();
  };
  console.log(toBeUpdatedPackage);

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-2xl mx-auto p-4 bg-base-200 rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Update Package</h2>

        <div>
          <label className="label">Package Title</label>
          <input
            type="text"
            name="title"
            defaultValue={toBeUpdatedPackage.title || ""}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Price (BDT)</label>
          <input
            value={toBeUpdatedPackage.price || ""}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label className="label">Slot</label>
          <input
            type="number"
            name="slot"
            defaultValue={toBeUpdatedPackage.slot || ""}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            type="url"
            name="imageURL"
            defaultValue={toBeUpdatedPackage.imageURL || ""}
            className="input input-bordered w-full"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-4 px-6">
            Update Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePackage;
