import React from "react";

const AddBookings = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
        <div>
          <label className="block mb-1 font-medium" htmlFor="userUid">User UID</label>
          <input
            id="userUid"
            name="userUid"
            placeholder="Enter User UID"
            className="input w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="packageId">Package ID</label>
          <input
            id="packageId"
            name="packageId"
            placeholder="Enter Package ID"
            className="input w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="travelDate">Travel Date</label>
          <input
            id="travelDate"
            name="travelDate"
            type="date"
            className="input w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="numberOfPeople">Number of People</label>
          <input
            id="numberOfPeople"
            name="numberOfPeople"
            type="number"
            placeholder="People Count"
            className="input w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="totalPrice">Total Price</label>
          <input
            id="totalPrice"
            name="totalPrice"
            type="number"
            placeholder="Total Price"
            className="input w-full"
            required
          />
        </div>

        <div className="flex justify-center items-center">
          <button type="submit" className="btn">
            Add Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookings;
