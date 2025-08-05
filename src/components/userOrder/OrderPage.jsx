import { useState, useEffect } from "react";
import { FaSpinner, FaBox } from "react-icons/fa";

// Color palette
const colors = {
  primary: '#384D89',
  primaryDark: '#2A4172',
  primaryDarker: '#1B2E4F',
  primaryDarkest: '#14263F',
  secondary: '#A13C78',
  secondaryDark: '#872D67',
  secondaryDarker: '#681853',
  accent: '#C1467F'
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
 const baseUrliMAGE = import.meta.env.VITE_API_BASE_URL_IMAGE;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/order/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data?.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [baseUrl]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case "shipped":
        return { bg: `bg-[${colors.primary}]/10`, text: `text-[${colors.primary}]` };
      case "delivered":
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case "cancelled":
        return { bg: 'bg-red-100', text: 'text-red-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl" style={{ color: colors.primary }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaBox className="mx-auto text-5xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold" style={{ color: colors.primaryDarker }}>
            No orders found
          </h2>
          <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold" style={{ color: colors.primaryDarker }}>Your Orders</h2>
        <p className="text-gray-500">A list of your recent orders.</p>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {order.products?.slice(0, 3).map((item, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`baseUrliMAGE${item.product?.images?.[0]}`}
                            alt={item.product?.productName || 'Product'}
                            className="h-12 w-12 rounded-md object-cover border border-gray-200"
                          />
                          {index === 2 && order.products.length > 3 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md text-white text-xs font-bold">
                              +{order.products.length - 3}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {`ORD${order._id?.slice(0, 4).toUpperCase()}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status).bg} ${getStatusColor(order.status).text}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ₹{order.totalAmount?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
