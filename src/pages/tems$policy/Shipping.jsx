import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Shipping = () => {
  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#1B2E4F] pt-[60px] pb-[60px] mb-[50px] text-start">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="relative z-10">
            <h3 className="text-white text-[28px] font-bold mb-[10px]">Shipping Policy</h3>
            <div className="text-[rgba(255,255,255,0.8)] text-[16px] flex items-center">
              <span>
                <Link to={"/"} className="text-[rgba(255,255,255,0.8)] hover:text-[#C1467F] transition-colors duration-300">
                  Home
                </Link>
              </span>
              <ChevronRight className="mx-2" color="rgba(255,255,255,0.8)" size={16} />
              <span>Shipping Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-[80px]">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="prose">
            {/* Company Terms */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              DIGIHUB UNIQUE TECH SOLUTIONS PRIVATE LIMITED. - Service Terms & Conditions
            </h3>

            {/* Introduction */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Introduction
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              Welcome to DIGIHUB UNIQUE TECH SOLUTIONS PRIVATE LIMITED Services
              By signing the Service Form and handing over your product(s) for service, you agree to
              abide by these Terms and Conditions. These terms govern the
              service and repair of your product(s) by Digital Services Centers
              through its after-sales service, operated by an independent third
              party. If you do not agree to these terms and conditions, please
              do not submit the Form or hand over your product(s) for service.
            </p>

            {/* Order Processing */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Order Processing
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[#A13C78] before:font-bold">
              We strive to fulfill orders as soon as you place them. In most
              cases, your order will be expected to be delivered within 7
              business days. Our business days are Monday-Friday.
            </p>

            {/* Shipping Time */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Shipping Time
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[#A13C78] before:font-bold">
              For most serviceable pin codes, we try to deliver within 10 days.
              <br />
              Standard Shipping - 3 to 5 business days<br />
              Express Shipping - 1 to 2 business days<br />
              International Shipping - 7 to 14 business days
            </p>

            {/* Definitions */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Definitions
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">You/Customer:</strong> Refers to the individual or entity handing over the product(s) for service.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">We/Us/Company:</strong> Refers to Digital Services Centers.
            </p>

            {/* In-Warranty Product Service */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              In-Warranty Product Service
            </h3>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Proof of Purchase:</strong> You must provide a clear and legible copy of the proof of
                purchase (such as a bill or invoice) and details of the
                product's model and serial number.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Customer Responsibility:</strong> It is your sole responsibility to support the Company/service
                provider in offering its services.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Warranty Terms:</strong> The service of the product(s) is governed by the terms of the
                warranty conditions. Please refer to the warranty terms on our
                website for detailed inclusions and exclusions.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Warranty Expiration:</strong> The product warranty will expire as specified in the warranty
                terms. In the event of repair or replacement of any part, the
                warranty will continue only for the unexpired period of the main
                product's warranty.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Free Service:</strong> Products covered under warranty will receive free service and
                replacement of components, provided the product is used as per
                the user manual instructions.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Property Rights:</strong> Replaced products or parts under warranty will become your
                property, and removed parts will become the property of the
                Company.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Service Charges:</strong> Charges will apply for products under warranty if the product is
                not used as per the user manual instructions.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">External Accessories:</strong> The warranty does not cover repair, installation, or
                configuration of external accessories supplied by Digital
                Services Centers or third parties.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Replacement Products:</strong> In case of a free replacement, the same model will be provided.
                If discontinued, an alternate model will be provided with your
                consent.
                <br />
                <strong className="text-[#384D89]">Shipping Policy:</strong> Packages are generally
                dispatched within 6-7 days after receipt of payment and are
                shipped via reputed national couriers with tracking. We will
                provide you with a link to track your package online.
              </li>
            </ul>

            {/* Out-of-Warranty Product Service */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Out-of-Warranty Product Service
            </h3>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Service Charges:</strong> For products outside the warranty period, a service charge of
                Rs. 450 + GST or more (subject to prevailing charges) and
                replacement part charges will apply.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Cost Estimate:</strong> Service charges and part costs will be estimated after product
                inspection. If you reject the estimate after product inspection,
                inspection charges will apply, and your product will be returned
                without repair.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Service Types:</strong> Carry-In, Workshop, or Onsite Home repair work will be conducted
                based on accepted estimates.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Repeat Complaints:</strong> No service charges will apply if the same complaint recurs
                within 30 days of the last service.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">GST:</strong> All services attract a GST of 18%.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Onsite Service:</strong> Onsite/In-Home service is available for specific products.
                Contact Customer Care for more details.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Damage Exclusions:</strong> Damage or failure due to unauthorized modifications, improper
                use, or removal of identification labels will be treated as
                outside warranty, and out-of-warranty charges will apply.
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Modification Prohibition:</strong> Any modification to the product is strictly prohibited. The
                Company will not be liable for any accidents or damages
                resulting from modifications.
              </li>
            </ul>

            {/* Force Majeure */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Force Majeure
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              In unforeseen situations like acts of God, epidemics, pandemics,
              strikes, or lockouts, the Company's services will be suspended.
              Once normalcy is restored, services will resume.
            </p>

            {/* Liability */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Liability
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              The Company/Service provider and its employees are not liable for
              any special, indirect, incidental, or consequential damages from
              repair services. The sole liability is limited to the cost of
              repair or replacement of the affected product.
            </p>

            {/* Abandoned Products */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Abandoned Products
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              If the Company/Service provider is unable to return the product
              due to lack of payment or refusal to collect within thirty (30)
              days of notification, the product will be considered abandoned.
              The Company may dispose of the product in accordance with
              applicable laws.
            </p>

            {/* Data Collection */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Data Collection
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              You agree that it is necessary for the Company to collect,
              process, and use your personal data to perform service and support
              obligations under these terms and conditions.
            </p>

            {/* Contact Information */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              Contact Information
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              For further details, please contact our Customer Care or visit our
              website.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shipping;