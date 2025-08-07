import { useEffect, useState } from "react";
import {
  FaBox,
  FaRupeeSign,
  FaCalendarAlt,
  FaTruck,
  FaCreditCard,
  FaSpinner,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const OrderPage1 = () => {
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
        return "bg-[#A13C78] text-white";
      case "shipped":
        return "bg-[#2A4172] text-white";
      case "delivered":
        return "bg-[#384D89] text-white";
      case "cancelled":
        return "bg-[#872D67] text-white";
      default:
        return "bg-[#681853] text-white";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff]">
        <FaSpinner className="animate-spin text-4xl text-[#2A4172]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff]">
        <div
          className="bg-[#A13C78] text-white p-4 rounded-lg"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (orders?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff]">
        <div className="text-center">
          <FaBox className="mx-auto text-5xl text-[#C1467F] mb-4" />
          <h2 className="text-2xl font-semibold text-[#1B2E4F]">
            No orders found
          </h2>
          <p className="text-[#681853] mt-2">
            You haven't placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-4 lg:px-4 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1B2E4F] mb-8"> Orders Summery</h1>

        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order?._id}
              className="bg-white shadow-lg overflow-hidden rounded-xl border border-[#C1467F]"
            >
              <div className="px-6 py-4 border-b border-[#C1467F] flex justify-between items-center bg-[#f0f4ff]">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm text-[#681853]">Order ID</p>
                    <p className="font-medium text-[#1B2E4F]">{order?._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#681853]">Date</p>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-[#872D67] mr-2" />
                      <span className="font-medium text-[#1B2E4F]">
                        {formatDate(order?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    {order?.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="px-6 py-4">
                <h3 className="text-lg font-medium text-[#1B2E4F] mb-4">
                  Products
                </h3>
                <div className="space-y-4">
                  {order?.products?.map((product, index) => (
                    <Link
                      to={`/product/${product?.product?._id}`}
                      key={index}
                      className="flex border-b border-[#C1467F] pb-4 last:border-0 hover:bg-[#f0f4ff] p-2 rounded-lg transition-colors"
                    >
                      <div className="flex-shrink-0 h-24 w-24">
                        <img
                          src={product?.product?.images}
                          alt={product?.product?.productName}
                          className="h-full w-full object-cover rounded-lg border border-[#C1467F]"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-md font-medium text-[#1B2E4F]">
                          {product?.product?.productName}
                        </h4>
                        <p className="text-sm text-[#681853] mt-1">
                          Quantity: {product?.quantity}
                        </p>
                        <div className="flex items-center mt-2">
                          <FaRupeeSign className="text-[#872D67]" />
                          <span className="text-[#1B2E4F] ml-1">
                            {product?.price}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-md font-medium text-[#1B2E4F]">
                          Total
                        </p>
                        <div className="flex items-center mt-2">
                          <FaRupeeSign className="text-[#872D67]" />
                          <span className="text-[#1B2E4F] ml-1">
                            {product?.total}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-[#f0f4ff] flex justify-between items-center border-t border-[#C1467F]">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FaTruck className="text-[#872D67] mr-2" />
                    <div>
                      <p className="text-sm text-[#681853]">Shipping Address</p>
                      <p className="text-sm text-[#1B2E4F]">
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.state},{" "}
                        {order.shippingAddress.country} -{" "}
                        {order.shippingAddress.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaCreditCard className="text-[#872D67] mr-2" />
                    <div>
                      <p className="text-sm text-[#681853]">Payment Status</p>
                      <p className="text-sm text-[#1B2E4F] capitalize">
                        {order.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#681853]">Total Amount</p>
                  <div className="flex items-center justify-end">
                    <FaRupeeSign className="text-[#1B2E4F]" />
                    <span className="text-xl font-bold text-[#1B2E4F] ml-1">
                      {order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};