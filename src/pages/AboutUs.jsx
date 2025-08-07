import { motion } from "framer-motion";
import { FaShippingFast, FaShieldAlt, FaHeadset, FaExchangeAlt, FaCheckCircle } from "react-icons/fa";

const AboutPage = () => {
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
    <main className="w-full bg-gray-50">
      {/* Hero Banner with Animated Circles */}
      <section className="relative w-full h-72 md:h-[28rem] overflow-hidden bg-gradient-to-r from-[#384D89] via-[#2A4172] to-[#1B2E4F]">
        {/* Animated Circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#A13C78]/20 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#872D67]/20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-[#C1467F]/15 animate-float"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-[#C1467F]">DigiHub</span>
          </h1>
          <div className="w-24 h-1 bg-[#A13C78] mb-8"></div>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            India's Premier Destination for Electronics & Gadgets
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto py-16 px-6 space-y-16">
        {/* Intro Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#14263F]/10">
          <div className="p-8 md:p-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#14263F]">
              India's Trusted Online Destination for Electronics & Gadgets
            </h2>
            <p className="text-[#2A4172] leading-relaxed text-lg">
              At DigiHubUnique Tech Solutions Pvt. Ltd., we're redefining how India shops for technology. From the latest gadgets to everyday accessories, we bring together quality, affordability, and customer-first service — all in one place.
            </p>
          </div>
        </div>

        {/* Journey Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#14263F]">
              Our <span className="text-[#A13C78]">Journey</span>
            </h2>
            <p className="text-[#2A4172] leading-relaxed">
              Our journey began in 2025 with one clear mission — to bring the best of electronics, gadgets, and accessories within easy reach of every Indian household.
            </p>
            <p className="text-[#2A4172] leading-relaxed">
              Founded by a passionate team of tech enthusiasts in Jaipur, Rajasthan, DigiHub started with just a few shelves of products and a vision to change how India experiences technology.
            </p>
          </div>
          <div className="bg-[#F3F6FF] rounded-xl p-6 h-full flex items-center justify-center border border-[#384D89]/10">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#A13C78] mb-2">2025</div>
              <div className="text-[#2A4172]">Year Founded</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#384D89] text-white rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold mb-2">2,00,000+</div>
            <div className="text-blue-100">Happy Customers</div>
          </div>
          <div className="bg-[#2A4172] text-white rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold mb-2">5,00,000+</div>
            <div className="text-blue-100">Successful Deliveries</div>
          </div>
          <div className="bg-[#1B2E4F] text-white rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold mb-2">25,000+</div>
            <div className="text-blue-100">Products</div>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-12 border border-[#14263F]/10">
          <div className="p-8 md:p-10 space-y-6">
            <h2 className="text-3xl font-bold text-[#14263F]">
              What Makes Us <span className="text-[#A13C78]">Different</span>
            </h2>
            <p className="text-[#2A4172] leading-relaxed">
              With a 4.7 out of 5 customer satisfaction rating, 100+ trusted brand partnerships, and an in-house team of product experts, we make sure every product is not just trendy — but tested, reliable, and built to serve real needs.
            </p>
          </div>
        </div>

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

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#A13C78] hover:shadow-lg">
            <h3 className="text-2xl font-bold text-[#A13C78] mb-4">Our Mission</h3>
            <p className="text-[#2A4172] leading-relaxed">
              To empower every Indian with easy, affordable, and trusted access to modern electronics and tech accessories — through an online experience that is smooth, secure, and satisfying.
            </p>
            <p className="text-[#2A4172] leading-relaxed mt-4">
              We exist to ensure that technology serves you — not the other way around.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#A13C78] hover:shadow-lg">
            <h3 className="text-2xl font-bold text-[#A13C78] mb-4">Our Vision</h3>
            <p className="text-[#2A4172] leading-relaxed">
              To become India's most reliable and customer-centric electronics platform, delivering cutting-edge products and extraordinary service — while making innovation accessible to every home, business, and lifestyle.
            </p>
          </div>
        </div>

        {/* Additional Content */}
        <div className="mt-12 space-y-6">
          <p className="text-[#2A4172] leading-relaxed">
            Today, DigiHub proudly serves:
            <br />
            Over 2,00,000 happy customers across India
            <br />
            More than 5,00,000 successful deliveries, including mobiles, laptops, audio devices, smart gadgets, printers, camera gear, wearables, and many more electronics
          </p>
          <p className="text-[#2A4172] leading-relaxed">
            Our extensive catalogue includes everything from smartphones and power banks to fitness trackers, tablets, musical instruments, chargers, desktops, grooming devices, and more — carefully curated for quality, affordability, and satisfaction.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;