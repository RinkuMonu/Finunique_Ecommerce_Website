import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Refund = () => {
  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#1B2E4F] pt-[60px] pb-[60px] mb-[50px] text-start">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="relative z-10">
            <h3 className="text-white text-[28px] font-bold mb-[10px]">Refund Policy</h3>
            <div className="text-[rgba(255,255,255,0.8)] text-[16px] flex items-center">
              <span>
                <Link to={"/"} className="text-[rgba(255,255,255,0.8)] hover:text-[#C1467F] transition-colors duration-300">
                  Home
                </Link>
              </span>
              <ChevronRight className="mx-2" color="rgba(255,255,255,0.8)" size={16} />
              <span>Refund Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-[80px]">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="prose">
            {/* Return and Refund Policy */}
            {/* <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Return And Refund Policy</strong>
            </h3> */}

            {/* Return Policy */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Return Policy</strong>
            </h3>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                All Products purchased from the Website enjoy Ten (10) days
                Return Policy.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Any Product purchased from the Website can be returned to the
                Company within Ten (10) days of delivery by placing a Cancel
                Order request by logging a call with the Company's Customer Care
                Centre at 9660339514 (Mon to Sat-10AM to 6PM).
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Any Product purchased from the Website can be returned only if
                the Product is damaged, defective, or different from what was
                ordered.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                The User shall ensure not to accept delivery of any Product
                whose original packaging is damaged or tampered in any manner.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                If the Product is damaged/defective/different from what was
                ordered, the User must immediately inform the Company's Customer
                Care Centre, and the Company will arrange for replacement or a
                refund of the price, including shipping charges if applicable.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                In case of Cancellation (Return/Exchange) after delivery, the
                Customer must cooperate fully to return the Product with all
                original packaging, manuals, accessories, freebies, and other
                materials received with the Product. Refund or exchange will
                only be processed after receipt of the product.
              </li>
            </ul>

            <p className="text-[#777] font-sans text-[14px] leading-relaxed mb-5">
              All free gifts, in original packing and unused condition, must be
              returned along with the Product in case of cancellation of the
              Product with which the free gift(s) were given.
            </p>

            {/* Refund Policy */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Refund Policy</strong>
            </h3>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Any cancellation/exchange in accordance with the above terms
                qualifies for payment reversal or replacement of the Product
                depending on availability and User preference.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Refunds for cancellations before delivery will be subject to a
                2% deduction plus applicable taxes of the Product Price
                (Transaction value) as banking and transaction charges. The
                balance amount will be processed for refund.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Refunds will be initiated within Ten (10) working days of
                receipt of the Request for Cancellation or after the Company's
                logistics partner picks up the Product from the User's place.
                The refund will be credited to the User's bank/credit card
                account based on banking channels' processing time.
                If approved, you'll be automatically refunded on your original
                payment method within 10 business days.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Refunds will be credited to the account from which payment was
                made.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Interest Fee Reversal: If an EMI facility was availed for the
                cancelled transaction, the interest fee debited to the User's
                card will be reversed as per the bank's terms. The User should
                contact the card-issuing bank for interest refund procedures.
              </li>
            </ul>

            <p className="text-[#777] font-sans text-[14px] leading-relaxed mb-5">
              The above terms and conditions in respect to refunds are referred
              to as the "Refund Policy."
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Refund;