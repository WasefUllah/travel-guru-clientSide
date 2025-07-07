import React from "react";

const AddDestinations = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
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
          <label htmlFor="country" className="block mb-1 font-medium">
            Country
          </label>
          <input
            id="country"
            name="country"
            placeholder="Enter Country"
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
            name="imageURL"
            placeholder="Enter Image URL"
            className="input w-full"
            required
          />
        </div>

        <div className="flex justify-center items-center">
          <button type="submit" className="btn">
            Add Destination
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDestinations;
