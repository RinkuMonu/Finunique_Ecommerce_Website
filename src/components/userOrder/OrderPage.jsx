import { useState, useEffect } from "react";
import { FaSpinner, FaBox, FaChevronRight, FaShoppingBag } from "react-icons/fa";
import { FiPackage, FiCalendar, FiDollarSign, FiHash } from "react-icons/fi";

const statusColors = {
  pending: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    icon: "bg-amber-500",
  },
  shipped: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    icon: "bg-blue-500",
  },
  delivered: {
    bg: "bg-green-100",
    text: "text-green-800",
    icon: "bg-green-500",
  },
  cancelled: {
    bg: "bg-red-100",
    text: "text-red-800",
    icon: "bg-red-500",
  },
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
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatOrderId = (id) => {
    return `ORD${id?.slice(0, 4).toUpperCase()}${id?.slice(-4).toUpperCase()}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
  //       <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
  //         <div className="flex flex-col items-center text-center">
  //           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
  //             <svg
  //               className="w-8 h-8 text-red-500"
  //               fill="none"
  //               stroke="currentColor"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //               />
  //             </svg>
  //           </div>
  //           <h3 className="text-lg font-medium text-gray-900 mb-2">
  //             Error loading orders
  //           </h3>
  //           <p className="text-gray-600 mb-4">{error}</p>
  //           <button
  //             onClick={() => window.location.reload()}
  //             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
  //           >
  //             Try Again
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (orders.length === 0 || error) {
    return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gradient-to-b from-white via-indigo-50 to-white">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-200">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FaBox className="text-3xl text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Orders Yet
        </h2>
        <p className="text-gray-500 mb-6">
          You haven't placed any orders. Start shopping to see your orders here.
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium shadow hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        >
          Browse Products
        </button>
      </div>
    </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <p className="mt-2 text-gray-600">
          View the status of your recent orders and manage returns
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-5">Products</div>
          <div className="col-span-2 flex items-center">
            <FiHash className="mr-2" /> Order ID
          </div>
          <div className="col-span-2 flex items-center">
            <FiCalendar className="mr-2" /> Date
          </div>
          <div className="col-span-2 flex items-center">
            <FiPackage className="mr-2" /> Status
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <FiDollarSign className="mr-2" /> Total
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {orders.map((order) => {
            const status = order.status.toLowerCase();
            const statusColor = statusColors[status] || statusColors.pending;
            console.log(orders)
            return (
              <div
                key={order._id}
                className="grid grid-cols-1 md:grid-cols-12 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-5 mb-4 md:mb-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {order.products?.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="relative h-12 w-12 rounded-md border-2 border-white shadow-sm"
                        >
                         {item.product?.images ? (
  <img
    src={item.product.images}
    alt={item.product.productName || "Product"}
    className="h-full w-full object-cover rounded-md"
  />
) : (
  <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-md">
    <FaShoppingBag className="w-5 h-5 text-blue-600" />
  </div>
)}

                        </div>
                      ))}
                      {order.products?.length > 3 && (
                        <div className="relative h-12 w-12 rounded-md border-2 border-white bg-gray-100 shadow-sm flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            +{order.products.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {order.products?.length} item
                        {order.products?.length !== 1 ? "s" : ""}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.products?.[0]?.product?.productName}
                        {order.products?.length > 1 && " and more"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 mb-3 md:mb-0">
                  <div className="md:hidden text-xs font-medium text-gray-500 uppercase mb-1">
                    Order ID
                  </div>
                  <div className="flex items-center text-sm text-gray-900">
                    {formatOrderId(order._id)}
                  </div>
                </div>

                <div className="col-span-2 mb-3 md:mb-0">
                  <div className="md:hidden text-xs font-medium text-gray-500 uppercase mb-1">
                    Date
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </div>
                </div>

                <div className="col-span-2 mb-3 md:mb-0">
                  <div className="md:hidden text-xs font-medium text-gray-500 uppercase mb-1">
                    Status
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${statusColor.icon} mr-2`}
                      ></span>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="md:hidden text-xs font-medium text-gray-500 uppercase mb-1">
                    Total
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-medium text-gray-900">
                      <span className="rupee">₹</span>{order.totalAmount?.toFixed(2)}
                    </span>
                    <button className="ml-2 p-1 text-gray-400 hover:text-gray-600 md:hidden">
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}