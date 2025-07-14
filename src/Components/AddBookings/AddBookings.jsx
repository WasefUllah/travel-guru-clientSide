import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";

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
    const selectedDate = new Date(travelDate);
    const startDate = new Date(pack.offerStartDate);
    const endDate = new Date(pack.offerEndDate);

    if (selectedDate > endDate || selectedDate < startDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Our offered day range doesn't match with you travel days!",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "There has no refund policy",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book it!",
    }).then((result) => {
      if (result.isConfirmed) {

        try {
          axios
            .post(`${baseUrl}/bookings`, booking)
            .then((res) => window.location.replace(res.data.url));
        } catch (error) {
          console.error("Registration failed:", error);
        }
      }
    });
  };

  return (
    <div>
      {!loading && (
        <div>
          <h1 className="text-center text-2xl font-bold my-2 md:text-3xl lg:text-4xl text-primary">
            Add a booking
          </h1>
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
                type="phone"
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

            <div className="flex justify-between items-center">
              <div>
                <label className="block mb-1 font-medium">
                  Offer Start Date
                </label>
                <input
                  value={format(new Date(pack.offerStartDate), "do MMMM, yyyy")}
                  className="input w-full"
                  readOnly
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
