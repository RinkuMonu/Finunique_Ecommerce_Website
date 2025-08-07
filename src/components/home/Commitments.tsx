import { Shield, Truck, Award, Users } from "lucide-react";

const trustIndicators = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Quality Guarantee",
    description: "100% authentic products",
    color: "#384D89",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Shipping",
    description: "On orders above ₹999",
    color: "#A13C78",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Certified Artisans",
    description: "Direct from master craftsmen",
    color: "#2A4172",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "10K+ Customers",
    description: "Trusted by thousands",
    color: "#C1467F",
  },
];

export default function Commitments() {
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-10">Our Commitments</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {trustIndicators.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full text-white mx-auto mb-4"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
