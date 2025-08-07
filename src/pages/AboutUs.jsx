import { motion } from "framer-motion";
import { FaShippingFast, FaShieldAlt, FaHeadset, FaExchangeAlt, FaCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    { value: "5+ Lakh", label: "Happy Customers" },
    { value: "8+ Lakh", label: "Successful Deliveries" },
    { value: "25,000+", label: "Products" },
    { value: "28+", label: "States Served" }
  ];

  const whyChooseUs = [
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: "All Tech in One Place",
      description: "Mobiles, laptops, accessories, smart gadgets, and more — everything you need under one roof."
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Trusted Brands Only",
      description: "We deal only in 100% genuine, brand-authorized products."
    },
    {
      icon: <FaShippingFast className="text-3xl" />,
      title: "Pan-India Fast Delivery",
      description: "Quick, safe, and trackable shipping across India, including remote areas."
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "Always Here to Help",
      description: "Friendly, reliable customer support at every step of your journey."
    },
    {
      icon: <FaExchangeAlt className="text-3xl" />,
      title: "Clear Pricing & Easy Returns",
      description: "No hidden charges. Simple return policies. Transparent service you can trust."
    }
  ];

  return (
  <section className="">
      <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#384d89] to-[#872d67] py-20 px-4 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About DigiHub</h1>
          <p className="text-xl md:text-2xl font-medium">
            India's Trusted Online Destination for Electronics & Gadgets
          </p>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#a13c78] rounded-full opacity-20"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#384d89] rounded-full opacity-20"></div>
        </motion.div>
      </div>


      <div className="max-w-6xl mx-auto py-16 px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-lg md:text-xl text-gray-500 px-10">
            At DigiHub Unique Tech Solutions Pvt. Ltd., we're redefining how India shops for technology. From the latest gadgets to everyday accessories, we bring together quality, affordability, and customer-first service — all in one place.
          </p>
        </motion.div>

        {/* Our Journey */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#384d89] mb-8 text-center"
          >
            Our Journey
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <p className="text-gray-700 mb-4">
                Our journey began in 2020 with one clear mission — to bring the best of electronics, gadgets, and accessories within easy reach of every Indian household.
              </p>
              <p className="text-gray-700 mb-4">
                Founded by a passionate team of tech enthusiasts in Jaipur, Rajasthan, DigiHub started with just a few shelves of products and a vision to change how India experiences technology. We recognized that while global innovations were booming, customers in India still struggled with limited access, unclear choices, high prices, and poor after-sales support. DigiHub was built to solve those challenges.
              </p>
              <p className="text-gray-700">
                Since then, we have grown from a small local store to a nationwide digital platform, offering trusted products, fast service, and a seamless shopping experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-1/2 bg-gradient-to-br from-[#384d89] to-[#a13c78] p-8 rounded-xl text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Today, DigiHub proudly serves:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Over 5,00,000 happy customers across India</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>More than 8,00,000 successful deliveries, including mobiles, laptops, audio devices, smart gadgets, printers, camera gear, wearables, and accessories</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

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
      className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition hover:bg-[#872d67] hover:text-white group"
    >
      <p className="text-3xl font-bold text-[#872d67] group-hover:text-white">{stat.value}</p>
      <p className="text-gray-600 group-hover:text-white">{stat.label}</p>
    </div>
  ))}
</motion.div>





 <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#384d89] to-[#872d67] p-8 rounded-xl "
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
            <p className="text-lg text-white/80">
              To empower every Indian with easy, affordable, and trusted access to modern electronics and tech accessories — through an online experience that is smooth, secure, and satisfying. We exist to ensure that technology serves you — not the other way around.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#a13c78] to-[#872d67] p-8 rounded-xl text-white"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
            <p className="text-lg text-white/80">
              To become India's most reliable and customer-centric electronics platform, delivering cutting-edge products and extraordinary service — while making innovation accessible to every home, business, and lifestyle.
            </p>
          </motion.div>
        </div>




        {/* What Makes Us Different */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#384d89] mb-8 text-center"
          >
            What Makes Us Different
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#384d89] to-[#a13c78] p-8 rounded-xl text-white"
          >
            <p className="text-lg mb-4">
              Over the past few years, DigiHub has evolved from a small electronics seller into one of India's most reliable tech shopping destinations — with over 25,000+ products, delivery services across 28+ Indian states, and the trust of more than half a million satisfied customers.
            </p>
            <p className="text-lg">
              With a 4.7 out of 5 customer satisfaction rating, 100+ trusted brand partnerships, and an in-house team of product experts, we make sure every product is not just trendy — but tested, reliable, and built to serve real needs.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#384d89] mb-8 text-center"
          >
            Why Choose DigiHub
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-center text-[#872d67] font-medium mb-12"
          >
            5+ Lakh Customers. 8+ Lakh Deliveries. One Trusted Platform.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white hover:bg-[#f8d3e9] p-6 rounded-xl shadow-md hover:shadow-lg transition hover:-translate-y-1"
              >
                <div className="text-[#a13c78] mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#384d89] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>



      </div>
    </div>
  </section>
  );
};

export default AboutUs;