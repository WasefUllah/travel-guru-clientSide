import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const AddPackage = () => {
    const {user} = useContext(AuthContext)
  
  const [destinations, setDestinations] = useState([]);
  const [offerStartDate, setOfferStartDate] = useState(null);
  const [offerEndDate, setOfferEndDate] = useState(null);
  useEffect(() => {
    axios
      .get(`${baseUrl}/destinations`)
      .then((res) => {
        setDestinations(res.data); 
      })
      .catch((err) => {
        console.error("Failed to fetch destinations:", err);
      });
  }, []);

  console.log(destinations);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const singlePackage = Object.fromEntries(formData.entries());
    singlePackage.offerStartDate = offerStartDate;
    singlePackage.offerEndDate = offerEndDate;
    singlePackage.email = user.email;
    console.log(singlePackage);

    axios.post(`${baseUrl}/packages`, singlePackage).then((res) => {
      if (res.data.insertedId) {
        e.target.reset();
        Swal.fire({
          title: "Package added successfully",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add Travel Package
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Destination</label>
          <select
            name="destination"
            className="select select-bordered text-white"
            required
          >
            <option value="">-- Select Destination --</option>
            {destinations.map((dest) => (
              <option key={dest._id} value={dest._id}>
                {dest.destinationName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Package Title</label>
          <input
            name="title"
            className="border p-2 rounded w-full"
            placeholder="e.g. 3 Days in Cox's Bazar"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Package Description</label>
          <textarea
            name="description"
            className="border p-2 rounded w-full"
            placeholder="Details about the tour, hotel, activities..."
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (৳)</label>
          <input
            name="price"
            type="number"
            className="border p-2 rounded w-full"
            placeholder="e.g. 8999"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Slot count</label>
          <input
            name="slot"
            type="number"
            className="border p-2 rounded w-full"
            placeholder="e.g. 10"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <input
            name="duration"
            type="text"
            className="border p-2 rounded w-full"
            placeholder="e.g. 3 Days 2 Nights"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            name="imageURL"
            className="border p-2 rounded w-full"
            placeholder="Paste image link here"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Offer start date</label>
          <DatePicker
            selected={offerStartDate}
            onChange={(date) => setOfferStartDate(date)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select a date"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Offer start date</label>
          <DatePicker
            selected={offerEndDate}
            onChange={(date) => setOfferEndDate(date)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select a date"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition"
          >
            Submit Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
