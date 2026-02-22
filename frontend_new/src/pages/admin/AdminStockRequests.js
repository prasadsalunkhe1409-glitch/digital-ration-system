import { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../components/Footer";
import api from "../../utils/axios";
import "./AdminStockRequests.css";

const AdminStockRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await api.get("/admin/stock-requests");
    setRequests(res.data.requests);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    await api.put(`/admin/stock-requests/${id}/approve`);
    fetchRequests();
  };

  const reject = async (id) => {
    await api.put(`/admin/stock-requests/${id}/reject`);
    fetchRequests();
  };

  return (
    <div className="layout">
      <Sidebar role="admin" />

      <div className="content">
        <h2 className="title">Stock Requests</h2>

        <table className="request-table">
          <thead>
            <tr>
              <th>Dealer</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.dealer?.name}</td>
                <td>{req.itemName}</td>
                <td>{req.quantity}</td>
                <td className={req.status.toLowerCase()}>{req.status}</td>

                <td>
                  {req.status === "Pending" && (
                    <>
                      <button
                        className="approve"
                        onClick={() => approve(req._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="reject"
                        onClick={() => reject(req._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default AdminStockRequests;
