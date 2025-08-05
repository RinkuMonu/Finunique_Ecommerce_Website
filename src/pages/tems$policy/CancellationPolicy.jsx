import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CancellationPolicy = () => {
  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#1B2E4F] pt-[60px] pb-[60px] mb-[50px] text-start">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="relative z-10">
            <h3 className="text-white text-[28px] font-bold mb-[10px]">Cancellation Policy</h3>
            <div className="text-[rgba(255,255,255,0.8)] text-[16px] flex items-center">
              <span>
                <Link to={"/"} className="text-[rgba(255,255,255,0.8)] hover:text-[#C1467F] transition-colors duration-300">
                  Home
                </Link>
              </span>
              <ChevronRight className="mx-2" color="rgba(255,255,255,0.8)" size={16} />
              <span>Cancellation Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-[80px]">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="prose">
            {/* Main Heading */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Cancellation Policy for Digihub Unique Tech Solutions Private Limited.</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              Last updated: Feb, 20, 2024
            </p>

            {/* Introduction */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Introduction</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              The cancellation policy of an IT company serves as a
              structured framework that outlines the terms and conditions for
              canceling services, projects, or subscriptions. It is designed to
              provide clarity and transparency regarding how cancellations
              are handled, ensuring that both the client and the company
              understand their rights and responsibilities. By setting clear
              rules, the policy helps in minimizing disputes and maintaining
              professional relationships.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              Additionally, the policy plays a crucial role in preventing
              financial and operational losses that may arise from last-minute
              cancellations. IT projects often involve resource allocation,
              workforce planning, and contractual commitments; unexpected
              cancellations can lead to wasted effort, revenue loss, and
              scheduling disruptions. To mitigate such risks, the policy may
              include cancellation timeframes, refund eligibility, and
              potential penalties for abrupt terminations.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              Furthermore, the policy ensures compliance with legal and
              contractual obligations, especially in long-term service
              agreements. Many IT services operate under contracts that specify
              termination clauses, notice periods, and liability terms. A
              well-defined cancellation policy helps both parties adhere to these
              agreements, reducing the likelihood of legal conflicts and ensuring
              a smooth transition in case of service discontinuation.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              By implementing a robust cancellation policy, IT companies can
              protect their business interests, maintain operational
              efficiency, and foster trust with clients through a fair and
              transparent approach to cancellations. 🚀
            </p>

            {/* Definitions */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Definitions</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">Account:</strong> An account refers to a registered user profile or
              contractual entity that has access to a company's services,
              products, or subscriptions.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">Affiliate:</strong> An affiliate refers to an individual or entity
              that partners with a company to promote its products or services,
              often earning a commission for referrals.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">Company:</strong> A company refers to the business or service
              provider that establishes and enforces the terms for canceling
              services, projects, or subscriptions.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">Cookies:</strong> Cookies refer to small data files stored on a
              user's device by a website to track and remember user preferences,
              login details, or browsing behavior.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">Device:</strong> A device refers to the physical hardware (such as a
              smartphone, tablet, laptop, or desktop computer) that a user
              employs to access a company's services, applications, or software.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">Personal Data:</strong> Personal data refers to any information that
              identifies an individual, such as name, email address, phone
              number, payment details, or login credentials, which a company
              collects during service registration or usage.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">Service:</strong> A service refers to the product, subscription, or
              solution provided by a company to its customers, which may be
              subject to cancellation under specific terms and conditions.
            </p>

            {/* Key Elements */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Key Elements of a Cancellation Policy</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              <strong className="text-[#384D89]">Scope:</strong> Specifies what services or products the policy
              applies to (e.g., software development projects, SaaS
              subscriptions, IT consulting services).
            </p>

            {/* Cancellation Timeframe */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Cancellation Timeframe</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              The cancellation timeframe in a cancellation policy specifies how
              far in advance a customer, client, or partner must request a
              cancellation to avoid penalties such as fees, loss of deposits, or
              non-refundable charges. This timeframe is crucial for businesses,
              as it allows them to manage resources, staffing, and financial
              planning efficiently while also providing fairness and clarity to
              customers.
            </p>

            {/* Refund & Charges */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Refund & Charges</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              A cancellation policy includes clear guidelines on whether a
              customer is eligible for a refund and if any cancellation fees
              apply. This ensures transparency in financial transactions and
              helps both the company and the customer understand their rights and
              obligations when canceling a service, subscription, or contract.
            </p>

            {/* Contractual Obligations */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Contractual Obligations</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              A termination clause in a long-term agreement defines the
              conditions under which either party (the company or the client) can
              end the contract before its intended completion date. These clauses
              are critical for ensuring that both parties understand their
              rights, obligations, and any consequences of terminating the
              agreement prematurely.
            </p>

            {/* Exceptions & Special Cases */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Exceptions & Special Cases</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              A cancellation policy outlines standard procedures for terminating
              services, projects, or contracts. However, there are specific
              exceptional scenarios where cancellations may be handled
              differently. These special cases ensure fairness, legal compliance,
              and adaptability to unforeseen circumstances.
            </p>

            {/* Contact Us */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Contact Us</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              If you have any questions about this Privacy Policy, You can
              contact us via email at{" "}
              <a href="mailto:info@digihub.com" className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">
                info@digihub.com
              </a>{" "}
              and call us at{" "}
              <a href="tel:=01414511098" className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">
                0141-4511098
              </a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CancellationPolicy;