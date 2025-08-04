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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-[#A13C78] mb-1">10K+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-[#384D89] mb-1">99%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-[#2A4172] mb-1">24/7</div>
            <div className="text-sm text-gray-600">Customer Support</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-[#C1467F] mb-1">2-Day</div>
            <div className="text-sm text-gray-600">Fast Delivery</div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How long does delivery take?",
                answer: "Most orders are delivered within 2-3 business days with free shipping on orders over $50.",
              },
              {
                question: "What's your return policy?",
                answer: "We offer a 30-day return policy for all items in original condition with tags attached.",
              },
              {
                question: "Do you offer customer support?",
                answer: "Yes, our customer support team is available 24/7 via chat, email, or phone.",
              },
              {
                question: "Are payments secure?",
                answer: "All payments are processed securely using industry-standard encryption and security measures.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
