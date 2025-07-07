import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const AddPackage = () => {
  const [availableDates, setAvailableDates] = useState([new Date()]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.availableDates = availableDates.map((date) =>
      format(date, "yyyy-MM-dd")
    );

    console.log("New Package:", data);
    // 🔥 Submit to Firestore or backend here

    e.target.reset();
    setAvailableDates([new Date()]);
  };

  const addDate = () => setAvailableDates([...availableDates, new Date()]);

  const updateDate = (index, newDate) => {
    const updated = [...availableDates];
    updated[index] = newDate;
    setAvailableDates(updated);
  };
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add Travel Package
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block mb-1 font-medium">Destination ID</label>
          <input
            name="destinationId"
            className="border p-2 rounded w-full"
            placeholder="Destination document ID"
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
          <label className="block mb-1 font-medium">Duration</label>
          <input
            name="duration"
            className="border p-2 rounded w-full"
            placeholder="e.g. 3 Days 2 Nights"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            name="imageURL"
            className="border p-2 rounded w-full"
            placeholder="Paste image link here"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Available Dates</label>
          {availableDates.map((date, i) => (
            <div key={i} className="mb-2">
              <DatePicker
                selected={date}
                onChange={(d) => updateDate(i, d)}
                className="border p-2 rounded w-full"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addDate}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            + Add Another Date
          </button>
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
