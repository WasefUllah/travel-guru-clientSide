import axios from "axios";
import React, { useContext } from "react";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const AddDestinations = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const destinationName = form.name.value;
    const destinationDescription = form.description.value;
    const destinationPhoto = form.photo.value;
    const destination = {
      destinationName,
      destinationDescription,
      destinationPhoto,
      email: user.email,
      name: user.displayName,
      popular: false,
    };


    axios.post(`${baseUrl}/destinations`, destination).then((res) => {

      if (res.data.insertedId) {
        form.reset();
        Swal.fire({
          title: "Destination added successfully",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  return (
    <div className="min-h-[610px]">
      <h1 className="text-center text-2xl font-bold mt-24">
        Add a destination
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 max-w-xl mx-auto pt-"
      >
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Destination Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter Destination Name"
            className="input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Description"
            className="input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="imageURL" className="block mb-1 font-medium">
            Image URL
          </label>
          <input
            id="imageURL"
            name="photo"
            placeholder="Enter Image URL"
            className="input w-full"
            required
          />
        </div>

        <div className="flex justify-center items-center">
          <button type="submit" className="btn btn-primary">
            Add Destination
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDestinations;
