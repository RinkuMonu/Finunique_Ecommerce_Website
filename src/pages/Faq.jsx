import { Search, User, Heart, ShoppingBag, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from "react-router-dom";

import { useState } from 'react'

export default function Faq() {
  const sidebarItems = [
    { name: "Top Queries", icon: Star, active: true },
    
  ]
  const [expandedIndex, setExpandedIndex] = useState(null)

 const toggleExpanded = (index) => {
  setExpandedIndex(prev => (prev === index ? null : index));
}


    const faqData = [
        {
            question: "How do I check the status of my order?",
            answer:
            "Please go to the 'My Orders' section under the main menu on the Digihub Website or Mobile site to check the current status of your order."
        },
        {
            question: "Why are there different prices for the same product? Is it legal?",
            answer:
            "Digihub is an online marketplace that allows independent sellers to list and sell their products directly to buyers. The prices are decided by the sellers, and Digihub does not interfere in pricing. Hence, the same product may appear at different prices from different sellers. This is completely legal and follows all marketplace compliance rules."
        },
        {
            question: "What is Digihub's cancellation policy?",
            answer:
            "You can cancel your order while it is in the packed or shipped status, as long as the 'Cancel' option is available on the Digihub Website or Mobile site. This applies to sale items as well. Any amount paid will be refunded to the original payment method used."
        },
        {
            question: "How do I cancel the order I have placed?",
            answer:
            "Orders can be cancelled before they are out for delivery. You can cancel by visiting the 'My Orders' section on the Digihub Website or Mobile site. Select the item or order you wish to cancel. If the option is unavailable, you can refuse the delivery, and your refund will be processed to the original payment method if it was prepaid."
        },
        {
            question: "I have created a return request. When will the product be picked up?",
            answer:
            "Pickup usually happens within 4 to 7 business days after placing a return request. The exact schedule may vary depending on the assigned logistics partner."
        },
        {
            question: "I have created a return request. When will I get the refund?",
            answer:
            `Refund will be initiated after the returned item is successfully picked up and verified. The refund timelines are as follows:

        - Debit Card / Credit Card / Net Banking / EMI: 7 business days  
        - UPI: 5 business days  
        - Digihub Credit / Super Coins / Gift Card / LP: Instant (up to 2 days in case of delay)  
        - Wallets (e.g., PhonePe, PayZap): Instant (up to 2 days in case of delay)  
        - Simple PayLater & Pay in 3: Instant (up to 5 days in case of delay)  
        - LazyPay: Instant (up to 5 days in case of delay)  

        Note: You can save up to five bank accounts for NEFT/IMPS refunds. A single bank account can be linked to up to five Digihub accounts. To add a new bank account beyond this limit, please delete an existing one.`
        },
        {
            question: "Can I modify the shipping address of my order after it has been placed?",
            answer: "Yes, you can modify the shipping address of your order before it is processed (i.e., before it is packed). To do this, go to the 'My Orders' section on the Digihub Website or Mobile site and use the 'Change Address' option available for the order."
        },
        {
            question: "How do I cancel my order?",
            answer: "Go to the 'My Orders' section under the main menu of the Digihub Website or Mobile site. Then, select the item or order you wish to cancel and click on the 'Cancel Order' option, if available."
        },
        {
            question: "What is Digihub's Return and Exchange Policy? How does it work?",
            answer: `Digihub’s return and exchange policy allows you to return or exchange items purchased on our Website or Mobile Site for any reason, within the specified return/exchange period (please check the product details page for the return window).

            Products will be picked up from the same address where they were delivered. You're welcome to try the product, but please ensure it remains unused and in its original condition with all tags and packaging intact. If the product comes with a seal tag, it must remain attached and undamaged to be eligible for return or exchange.

            There are two ways to return a product:

            1. **Pickup**: In most locations, we offer a free pickup service. You will see the pickup option when you submit a return request.

            2. **Self-Ship**: If pickup is not available in your area, you can ship the product back to us. In such cases, we will reimburse the shipping cost in the form of Digihub Credits, provided the return meets our policy and you share a scanned copy of the courier receipt.

            **During pickup**, our delivery partner may perform a quality check. If the pickup is successful, a refund will be initiated to the original payment method. In some locations, the refund will only be processed after the product reaches our warehouse and passes a quality check. If the item fails the quality check, it will be returned to you.

            If you're exchanging an item due to a size issue or a defect, we will deliver the replacement free of cost—subject to stock availability and your area being serviceable. In case of exchange, the delivery partner will bring the new item and collect the original one.

            We allow you to exchange an item for the same or a different size of the same product, or even for a different product of higher or lower value, subject to availability and serviceability.

            **Exceptions and Rules:**

            - The following items cannot be returned or exchanged: Precious Jewelry, Sunglasses, Socks, Briefs, Shapewear Bottoms, Lingerie Sets (including briefs), Swimwear, Mittens, Wristbands, and other hygiene-sensitive products.
            - Certain items like fine jewelry, watches, or designer apparel may have shorter return windows or exchange-only policies (e.g., sherwanis). Please check the product details page for specifics.
            - Some intimate products, including select innerwear, sleepwear, and lingerie, are only eligible for **self-ship returns** and cannot be exchanged.
            - All returns and exchanges must include the original packaging and tags. For example, shoes must be returned in their original shoe box.

            **Under our Exchange Policy:**

            a) If you exchange a product for the same or a different size of the same item within the eligible period, we will replace it free of charge.  
            b) If you exchange for a different item of higher value, you’ll pay the difference. If the exchanged item is of lower value, the difference will be refunded after successful pickup.  
            c) Refunds or extra charges will be calculated based on the net amount paid (excluding instant discounts).  
            d) Exchange-related refunds will only be processed after the original product is picked up and passes quality check.

            - All exchanges are subject to stock availability and the delivery pin code being eligible.
            - A product can only be exchanged for one item. For multiple exchanges, place separate requests.
            - Non-returnable categories cannot be exchanged either.
            - Platform handling fees (if any) are not applicable to exchanged orders.
            - Digihub reserves the right to refuse returns or exchanges if the policy is misused.
            - If a product was bought with a free gift or promotional item, you must return the gift too.

            **Important Notes for Self-Ship Returns:**

            - Pack items securely to avoid loss or damage in transit.
            - Use a reliable courier and keep the receipt.
            - Reimbursement for shipping is only processed once the return passes quality checks and the courier receipt is submitted and verified.
            - If the quality check fails, the product will be shipped back to you.

            We recommend reviewing the product details page for specific return/exchange timeframes before placing an order.`
        },
        {
            "question": "How can I pay for my order on Digihub?",
            "answer": "We support the following payment options on Digihub:\n\n- Credit Card\n- Debit Card\n- Net Banking\n- UPI (Google Pay, PhonePe, Paytm, etc.)\n- Wallets (e.g., Paytm, PhonePe, Mobikwik – based on availability at checkout)\n- EMI Options (on eligible products & cards)\n- Cash on Delivery (COD) – Available for selected pin codes\n\nNote: Availability of payment methods may vary based on your location and the items in your cart."
        }

    ];



  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          {/* <div className="w-80 flex-shrink-0">
            <div className="space-y-2">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    item.active
                      ? "bg-yellow-50 border-l-4 border-yellow-400"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Star 
                    className={`w-4 h-4 ${
                      item.active ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                    }`} 
                  />
                  <span className={`text-sm ${
                    item.active ? "text-gray-900 font-medium" : "text-gray-600"
                  }`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Still need help?</span>
               <Link
                    to="/contact-us"
                    className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded text-sm"
                    >
                    CONTACT US
                </Link>

              </div>
            </div>

            {/* FAQ Content */}
            <div className="bg-white">
              <div className="border-l-4 border-yellow-400 pl-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Queries</h2>
                
                {/* Track Orders Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <button
                    onClick={() => toggleExpanded(0)}
                    className="w-full px-4 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-700 font-medium">{faqData[0].question}</span>
                    <div className="flex items-center space-x-3">
                     
                      {expandedIndex === 0 ? (

                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  {expandedIndex === 0 && (
                    <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">{faqData[0].answer}</p>
                    </div>
                  )}
                </div>

                {/* FAQ Questions */}
                <div className="space-y-2">
                  {faqData.slice(1).map((faq, index) => {
                    const actualIndex = index + 1; // Since we're slicing from index 1
                        const isExpanded = expandedIndex === actualIndex;
                    
                    return (
                      <div key={actualIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleExpanded(actualIndex)}
                          className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                          <span className="text-gray-700 font-medium pr-4">{faq.question}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
