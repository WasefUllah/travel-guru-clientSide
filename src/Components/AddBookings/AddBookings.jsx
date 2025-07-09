import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";

const AddBookings = () => {
  const { user, loading } = useContext(AuthContext);
  const userName = user?.displayName;
  const pack = useLoaderData();
  const [travelDate, setTravelDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const booking = Object.fromEntries(formData.entries());
    booking.userEmail = user.email;
    booking.packageId = pack._id;
    booking.destinationId = pack.destinationId;
    booking.fee = pack.price;
    booking.travelDate = travelDate;
    booking.managerEmail = pack.email;
    booking.packageTitle = pack.title;
    booking.destinationTitle = pack.destinationTitle;
    booking.bookedAt = new Date();
    console.log(booking);

    try {
      await axios
        .post(`${baseUrl}/bookings`, booking)
        .then((res) => window.location.replace(res.data.url));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      {!loading && (
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 max-w-xl mx-auto"
          >
            <div>
              <label className="block mb-1 font-medium" htmlFor="userUid">
                User Name
              </label>
              <input
                value={userName}
                className="input w-full"
                required
                readOnly
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Package Name</label>
              <input
                value={pack.title}
                className="input w-full"
                required
                readOnly
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input
                name="firstName"
                type="text"
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                name="lastName"
                type="text"
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Contact Number</label>
              <input
                name="phone"
                type="number"
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Additional Information
              </label>
              <input
                name="additionalInfo"
                type="text"
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Offer End Date</label>
              <input
                value={format(new Date(pack.offerEndDate), "do MMMM, yyyy")}
                className="input w-full"
                readOnly
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Travel date</label>
              <DatePicker
                selected={travelDate}
                onChange={(date) => setTravelDate(date)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select a date"
              />
            </div>

            <div className="flex justify-center items-center">
              <button type="submit" className="btn btn-primary">
                {`Book for ${pack.price} ৳`}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBookings;
