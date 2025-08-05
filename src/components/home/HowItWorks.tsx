"use client"

import { Search, Palette, ShoppingBag, ArrowRight, CheckCircle } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Browse & Discover",
      description:
        "Explore thousands of products across multiple categories with advanced search and filtering options.",
      features: ["Smart search", "Category filters", "Product recommendations"],
      color: "#384D89",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Compare & Choose",
      description: "Compare products, read reviews, and make informed decisions with detailed product information.",
      features: ["Product comparison", "Customer reviews", "Detailed specifications"],
      color: "#A13C78",
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Order & Enjoy",
      description: "Secure checkout, fast delivery, and excellent customer support for a seamless shopping experience.",
      features: ["Secure payment", "Fast delivery", "24/7 support"],
      color: "#2A4172",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white border-t-2">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle size={16} />
            <span>How It Works</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Shopping Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with our easy 3-step process to find and purchase your perfect products
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              )}

              {/* Step Card */}
              <div className="relative bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 z-10">
                {/* Step Number */}
                <div
                  className="absolute -top-4 left-8 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>

                {/* Features List */}
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        

        {/* Trust Indicators */}
    <div className="mt-20 mb-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {/* Happy Customers */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A13C78]/5 to-[#C1467F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold text-[#A13C78] mb-2">10K+</div>
          <div className="text-sm font-medium text-gray-600">Happy Customers</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A13C78] to-[#C1467F]"></div>
      </div>

      {/* Satisfaction Rate */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#384D89]/5 to-[#2A4172]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold text-[#384D89] mb-2">99%</div>
          <div className="text-sm font-medium text-gray-600">Satisfaction Rate</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#384D89] to-[#2A4172]"></div>
      </div>

      {/* Customer Support */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A4172]/5 to-[#1B2E4F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold text-[#2A4172] mb-2">24/7</div>
          <div className="text-sm font-medium text-gray-600">Customer Support</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2A4172] to-[#1B2E4F]"></div>
      </div>

      {/* Fast Delivery */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C1467F]/5 to-[#A13C78]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold text-[#C1467F] mb-2">2-Day</div>
          <div className="text-sm font-medium text-gray-600">Fast Delivery</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78]"></div>
      </div>
    </div>
  </div>
</div>

        {/* FAQ Preview */}
     <div className="mt-20 mb-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <h3 className="text-3xl font-bold text-[#1B2E4F] text-center mb-12 relative">
      Frequently Asked Questions
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#A13C78] to-[#C1467F] rounded-full"></span>
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          question: "How long does delivery take?",
          answer: "Most orders are delivered within 2-3 business days with free shipping on orders over $50.",
          icon: "🚚",
        },
        {
          question: "What's your return policy?",
          answer: "We offer a 30-day return policy for all items in original condition with tags attached.",
          icon: "🔄",
        },
        {
          question: "Do you offer customer support?",
          answer: "Yes, our customer support team is available 24/7 via chat, email, or phone.",
          icon: "💬",
        },
        {
          question: "Are payments secure?",
          answer: "All payments are processed securely using industry-standard encryption and security measures.",
          icon: "🔒",
        },
      ].map((faq, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative overflow-hidden group"
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#A13C78] to-[#C1467F]"></div>
          
          <div className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">{faq.icon}</span>
            <div>
              <h4 className="font-bold text-lg text-[#2A4172] mb-3 group-hover:text-[#384D89] transition-colors">
                {faq.question}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#384D89]/5 to-[#C1467F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      ))}
    </div>
    
    <div className="mt-12 text-center">
      <p className="text-gray-500 mb-4">Still have questions?</p>
      <button className="bg-gradient-to-r from-[#A13C78] to-[#C1467F] text-white font-medium py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-[#C1467F]/30 transition-all duration-300">
        Contact Support
      </button>
    </div>
  </div>
</div>
      </div>
    </section>
  )
}

export default HowItWorks
