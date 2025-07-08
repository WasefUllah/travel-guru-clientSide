import React from "react";
import { Link } from "react-router";

const Failed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          ❌ Payment Failed!
        </h2>
        <p className="text-gray-700 mb-6">
          Something went wrong. Your payment could not be completed.
        </p>

        <Link
          to={"/"}
          className="bg-red-500 hover:bg-red-600 btn text-white py-2 px-6 rounded-lg transition duration-200"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Failed;
