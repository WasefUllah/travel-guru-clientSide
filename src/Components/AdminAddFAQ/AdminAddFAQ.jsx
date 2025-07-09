import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";
import Swal from "sweetalert2";

const AdminAddFAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddFAQ = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/faq`, { question, answer });
      if (res.data.insertedId) {
        Swal.fire("Faq added!");
        setQuestion("");
        setAnswer("");
      }
    } catch (err) {
      console.error("Error adding FAQ:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-base-100 shadow rounded min-h-[400px]">
      <h2 className="text-xl font-bold mb-4">Add New FAQ</h2>
      <form onSubmit={handleAddFAQ}>
        <div className="mb-3">
          <label className="block font-semibold">Question</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Answer</label>
          <textarea
            className="w-full border p-2 rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add FAQ
        </button>
      </form>
    </div>
  );
};

export default AdminAddFAQ;
