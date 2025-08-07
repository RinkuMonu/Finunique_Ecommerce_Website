"use client"

import { Palette, Layers, Leaf, Globe, Award,  } from "lucide-react"

const DeliveryFeatures = () => {
  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Authentic Prints",
      description: "Traditional Bagru, Dabu, and Sanganeri prints crafted by skilled artisans",
      color: "#384D89",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Premium Fabrics",
      description: "Chanderi, Kota Doriya, and Maheshwari sourced directly from trusted weavers",
      color: "#A13C78",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Eco-Friendly",
      description: "Natural dyes and sustainable practices for environmentally conscious fashion",
      color: "#2A4172",
      bgColor: "bg-green-50",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Pan India Delivery",
      description: "Fast and secure delivery with dedicated customer support across India",
      color: "#C1467F",
      bgColor: "bg-pink-50",
    },
  ]


  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award size={16} />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Premium Quality Features</h2>
          <p className="text-md text-gray-600 max-w-2xl">
            Experience authentic craftsmanship with modern convenience and reliability
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 group ${feature.bgColor} hover:bg-white`}
            >
              {/* Icon */}
              <div className="mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        

        
      </div>
    </section>
  )
}

export default DeliveryFeatures
