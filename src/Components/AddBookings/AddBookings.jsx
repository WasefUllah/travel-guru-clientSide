import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const AddBookings = () => {
  const { user } = useContext(AuthContext);
  const pack = useLoaderData();
  const [travelDate, setTravelDate] = useState(null);
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
        <div>
          <label className="block mb-1 font-medium" htmlFor="userUid">
            User Name
          </label>
          <input value={user?.displayName} className="input w-full" required />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="packageId">
            Package Name
          </label>
          <input value={pack.title} className="input w-full" required />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="packageId">
            Offer End Date
          </label>
          <input
            value={format(new Date(pack.offerEndDate), "do MMMM, yyyy")}
            className="input w-full"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Offer end date</label>
          <DatePicker
            selected={travelDate}
            onChange={(date) => setTravelDate(date)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select a date"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="numberOfPeople">
            Number of People
          </label>
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
          <label className="block mb-1 font-medium" htmlFor="totalPrice">
            Total Price
          </label>
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
