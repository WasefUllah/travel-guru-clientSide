import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";
import { AuthContext } from "../../Provider/AuthProvider";
import { format } from "date-fns";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/paymentHistory?email=${email}`)
      .then((res) => {
        setHistory(res.data);
      })
      .catch();
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Destination</th>
                <th>Package</th>
                <th>Booked At</th>
                <th>Fee (BDT)</th>
                <th>Status</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={item.tran_id || index}>
                  <td>{index + 1}</td>
                  <td>{item.destinationTitle}</td>
                  <td>{item.packageTitle}</td>
                  <td>
                    {format(
                      new Date(item.bookedAt),
                      "do MMMM, yyyy 'at' h:mm a"
                    )}
                  </td>
                  <td>{item.fee}৳</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.tran_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
