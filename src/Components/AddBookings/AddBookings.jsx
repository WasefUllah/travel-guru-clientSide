import React from "react";

const AddBookings = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
        <input
          name="userUid"
          placeholder="User UID"
          className="input"
          required
        />
        <input
          name="packageId"
          placeholder="Package ID"
          className="input"
          required
        />
        <input name="travelDate" type="date" className="input" required />
        <input
          name="numberOfPeople"
          type="number"
          placeholder="People Count"
          className="input"
          required
        />
        <input
          name="totalPrice"
          type="number"
          placeholder="Total Price"
          className="input"
          required
        />
        <button type="submit" className="btn">
          Add Booking
        </button>
      </form>
    </div>
  );
};

export default AddBookings;
