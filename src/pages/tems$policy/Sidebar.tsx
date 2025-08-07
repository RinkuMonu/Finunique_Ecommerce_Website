import { FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/shipping", label: "Shipping Policy" },
    { to: "/return-and-exchanges", label: "Return Policy" },
    { to: "/terms-and-condition", label: "Terms and Condition" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/cancellation-policy", label: "Cancellation Policy" },
    { to: "/cookies", label: "Cookies" },
  ];

  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
        <h3 className="font-bold text-[#14263F] mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[#C1467F]" />
          Policies & Legal
        </h3>
        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-[#C1467F]/10 text-[#C1467F]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-br from-[#C1467F]/10 to-[#A13C78]/10 rounded-xl border border-[#C1467F]/20">
          <h4 className="font-bold text-[#14263F] mb-2">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-3">
            Contact our customer support team
          </p>
          <Link
            to="/contact-us"
            className="w-full bg-gradient-to-r from-[#C1467F] to-[#A13C78] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
