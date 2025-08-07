import { motion } from "framer-motion";
import { FaShippingFast, FaShieldAlt, FaHeadset, FaExchangeAlt, FaCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    { value: "2+ Lakh", label: "Happy Customers" },
    { value: "5+ Lakh", label: "Orders Delivered" },
    { value: "25,000+", label: "Electronics & Gadgets" },
    { value: "28+", label: "States Served" }
  ];

  const whyChooseUs = [
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: "Everything Tech, One Place",
      description: "Mobiles, laptops, accessories, home tech, and gaming — find it all in one platform."
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Only Verified Brands",
      description: "We partner with trusted global and Indian brands to ensure top quality."
    },
    {
      icon: <FaShippingFast className="text-3xl" />,
      title: "Fast & Reliable Shipping",
      description: "Across India with real-time tracking and secure delivery."
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "24x7 Support",
      description: "Quick issue resolution and dedicated post-sale support."
    },
    {
      icon: <FaExchangeAlt className="text-3xl" />,
      title: "Hassle-free Returns",
      description: "Easy exchange and refund process for your peace of mind."
    }
  ];

  return (
    <section className="">
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-white to-blue-50 py-20 px-4 text-[#0F172A] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About DigiHub</h1>
            <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto">
              India’s Go-To Platform for Latest Electronics, Tech Deals & Smart Shopping
            </p>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-100/30 rounded-full"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100/30 rounded-full"></div>
          </motion.div>
        </div>

        {/* Company Intro */}
        <div className="max-w-6xl mx-auto py-16 px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-gray-700 text-lg max-w-4xl mx-auto mb-16"
          >
            DigiHub Unique Tech Solutions Pvt. Ltd. brings the future of electronics to your doorstep. From daily-use gadgets to high-end tech, we focus on providing quality, affordability, and lightning-fast delivery.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-6 rounded-xl text-center hover:bg-[] transition shadow"
              >
                <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Mission and Vision */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 mb-20"
          >
            <div className="bg-white border border-gray-200 p-6 rounded-xl text-[#0F172A]">
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-700 text-base">
                To empower every Indian with easy, affordable, and trusted access to modern electronics and tech accessories — through an online experience that is smooth, secure, and satisfying.
                We exist to ensure that technology serves you — not the other way around.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl text-[#0F172A]">
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-700 text-base">
                To become India’s most reliable and customer-centric electronics platform, delivering cutting-edge products and extraordinary service — while making innovation accessible to every home, business, and lifestyle.
              </p>
            </div>
          </motion.div>

          {/* Why Choose DigiHub */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-6">Why Choose DigiHub</h2>
            <p className="text-center text-gray-600 mb-10 text-lg">
              Trusted by 5+ Lakh Customers for Genuine Products & Seamless Service
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white hover:bg-blue-50 p-6 rounded-xl border border-gray-200 text-left shadow-sm hover:shadow-md"
                >
                  <div className="text-[#0F172A] mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
