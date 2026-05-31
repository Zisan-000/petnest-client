import { authClient } from "@/lib/auth-client";
import React from "react";
import { GiCancel } from "react-icons/gi";

export default function RequestTable({ requests }) {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const onCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this adoption request?",
    );
    if (!confirmCancel) return;

    try {
      const { data: tokenData } = await authClient.token();
      const response = await fetch(`http://localhost:5000/adoptions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message);
        window.location.reload();
      } else {
        alert(`Error: ${data.message || "Failed to cancel request."}`);
      }
    } catch (error) {
      console.error("Frontend Error during cancellation:", error);
      alert("A network error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full overflow-x-auto border border-gray-200 rounded-xl shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 text-sm font-semibold uppercase tracking-wider">
            <th className="py-4 px-6">Pet Name</th>
            <th className="py-4 px-6">Owner Contact</th>
            <th className="py-4 px-6">Pickup Date</th>
            <th className="py-4 px-6">Message</th>
            <th className="py-4 px-6 text-center">Status</th>
            <th className="py-4 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
          {requests.map((req) => (
            <tr key={req._id} className="hover:bg-gray-50 transition-colors">
              {/* Pet Identity Parameter */}
              <td className="py-4 px-6 font-semibold text-gray-900">
                {req.petName || "Unknown Pet"}
              </td>

              {/* Target Listing Owner Identity */}
              <td className="py-4 px-6 font-mono text-xs">{req.ownerEmail}</td>

              {/* Dynamic Target Pickup Timestamp */}
              <td className="py-4 px-6 whitespace-nowrap">
                {req.pickupDate
                  ? new Date(req.pickupDate).toLocaleDateString()
                  : "N/A"}
              </td>

              {/* Truncated User Cover Note */}
              <td className="py-4 px-6 max-w-xs truncate" title={req.message}>
                {req.message}
              </td>

              {/* Application Status Badge layout block */}
              <td className="py-4 px-6 whitespace-nowrap text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(req.status)}`}
                >
                  {req.status || "Pending"}
                </span>
              </td>

              <td className="py-4 px-6 flex justify-center">
                {req?.status === "pending" ? (
                  <button
                    onClick={() => onCancel(req._id)}
                    title="Cancel Adoption Request"
                    className="cursor-pointer bg-slate-100 hover:bg-red-50 p-2 rounded-full border border-gray-200 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <GiCancel size={22} />
                  </button>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No Actions
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
