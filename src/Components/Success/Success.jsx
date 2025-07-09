import React from "react";
import { Link } from "react-router";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for registering. Your payment has been received successfully.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to={"/"}
            className="bg-green-500 hover:bg-green-600 btn text-white py-2 px-6 rounded-lg transition duration-200"
          >
            Go to Homepage
          </Link>

          <Link to={"/dashboard/myBookings"}
            className="bg-blue-500 hover:bg-blue-600 btn text-white py-2 px-6 rounded-lg transition duration-200"
          >
            View My Apply List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
