import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#1B2E4F] pt-[60px] pb-[60px] mb-[50px] text-start">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="relative z-10">
            <h3 className="text-white text-[28px] font-bold mb-[10px]">Terms and Conditions</h3>
            <div className="text-[rgba(255,255,255,0.8)] text-[16px] flex items-center">
              <span>
                <Link to={"/"} className="text-[rgba(255,255,255,0.8)] hover:text-[#C1467F] transition-colors duration-300">
                  Home
                </Link>
              </span>
              <ChevronRight className="mx-2" color="rgba(255,255,255,0.8)" size={16} />
              <span>Terms and Conditions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-[80px] ">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="prose">
            {/* Exchange Offer */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Exchange Offer</strong>
            </h3>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Availability:</strong> The exchange offer is valid until stocks last or until the offer expires, whichever is earlier.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Simultaneous Exchange:</strong> New product delivery and used product pickup will happen simultaneously.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Cancellation and Retention:</strong> If you decide not to proceed with the exchange and retain the used product, you need to pay the value provided for the used product as part of the transaction and offer.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Refund Policy:</strong> Refunds or returns for the exchanged or used product will not be provided.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Store Limitation:</strong> Exchange offer is available only at selected stores.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Model Limitation:</strong> Offer is applicable only on selected models.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Quantity Limitation:</strong> Only one product can be exchanged for each product purchased at a discounted price.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Discount without Exchange:</strong> You can avail brand new products at a discounted price, even without an old product to exchange. However, the discount percentage is higher on exchange products.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Delivery Delay:</strong> Due to high demand, delivery might be slightly delayed.
              </li>
            </ul>

            {/* Eligibility */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Eligibility</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              The services of the site are available only to select geographies in India. Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872, including un-discharged insolvents, are not eligible to use the site.
            </p>

            {/* License & Site Access */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>License &amp; Site Access</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              You are granted a limited sub-license to access and make personal use of this site and not to download (other than page caching) or modify it, except with express written consent.
            </p>

            {/* Account & Registration Obligations */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Account &amp; Registration Obligations</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              All shoppers must register and log in to place orders on the site. You must keep your account and registration details current and correct for communications related to your purchases.
            </p>

            {/* Pricing */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Pricing</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              All products listed on the site will be sold at MRP unless otherwise specified. Prices at the time of ordering will be the prices charged on the date of delivery.
            </p>

            {/* User Agreement */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>User Agreement</strong>
            </h3>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Non-Delivery:</strong> In the event of a non-delivery due to a mistake by you (e.g., wrong name or address), any extra cost incurred for redelivery will be claimed from you.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Lawful Use:</strong> You agree to use the services provided by the site for lawful purposes only.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Authentic Information:</strong> You will provide authentic and true information when requested.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Sole Risk:</strong> You access the services available on this site and transact at your sole risk.
              </li>
            </ul>

            {/* Prohibited Uses */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Prohibited Uses</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              You may not use the site for the following purposes:
            </p>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Disseminating unlawful, harassing, libelous, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Encouraging conduct that constitutes a criminal offense or results in civil liability.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Gaining unauthorized access to other computer systems.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Interfering with another person's use or enjoyment of the site.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Making, transmitting, or storing electronic copies of materials protected by copyright without the permission of the owner.
              </li>
            </ul>

            {/* Colours */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Colours</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              We have made every effort to display the colours of our products accurately. However, as the actual colours you see depend on your monitor, we cannot guarantee that your monitor's display will be accurate.
            </p>

            {/* Modification of Terms & Conditions */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Modification of Terms &amp; Conditions</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              The site may modify the Terms &amp; Conditions of Use without prior notification. You should regularly review the Terms &amp; Conditions on the site.
            </p>

            {/* Governing Law and Jurisdiction */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Governing Law and Jurisdiction</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              This User Agreement shall be construed in accordance with the laws of India. The courts at Kolkata shall have exclusive jurisdiction.
            </p>

            {/* Reviews, Feedback, Submissions */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Reviews, Feedback, Submissions</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              All reviews, comments, feedback, suggestions, and other submissions disclosed, submitted, or offered to the site shall remain the property of the site.
            </p>

            {/* Copyright & Trademark */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Copyright &amp; Trademark</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              The site and its suppliers and licensors expressly reserve all intellectual property rights in all text, programs, products, processes, technology, content, and other materials that appear on this site.
            </p>

            {/* Objectionable Material */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Objectionable Material</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              By using the site or any services provided on the site, you may encounter content that may be deemed offensive, indecent, or objectionable.
            </p>

            {/* Indemnity */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Indemnity</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              You agree to defend, indemnify, and hold harmless the site, its employees, directors, officers, agents, and their successors and assigns from any claims, liabilities, damages, losses, costs, and expenses, including attorney's fees, arising out of your actions or inactions.
            </p>

            {/* Termination */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Termination</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              This User Agreement is effective until terminated by either you or the site. You may terminate this User Agreement at any time by discontinuing further use of the site.
            </p>

            {/* Terms and Conditions of Credit Card No Cost EMI */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Terms and Conditions of Credit Card No Cost EMI</strong>
            </h3>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                The No Cost EMI facility is offered to customers making purchases on the site using eligible credit cards from selected banks.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                The No Cost EMI facility is funded by the site and is available on select products.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                The facility is not available for purchases made using net banking or Cash on Delivery payment methods.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;