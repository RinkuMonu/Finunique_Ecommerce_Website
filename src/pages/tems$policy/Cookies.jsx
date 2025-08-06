import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Cookies = () => {
  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#1B2E4F] pt-[60px] pb-[60px] mb-[50px] text-start">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="relative z-10">
            <h3 className="text-white text-[28px] font-bold mb-[10px]">Cookies Policy</h3>
            <div className="text-[rgba(255,255,255,0.8)] text-[16px] flex items-center">
              <span>
                <Link to={"/"} className="text-[rgba(255,255,255,0.8)] hover:text-[#C1467F] transition-colors duration-300">
                  Home
                </Link>
              </span>
              <ChevronRight className="mx-2" color="rgba(255,255,255,0.8)" size={16} />
              <span>Cookies Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-[80px]">
        <div className="container max-w-[1200px] mx-auto px-5">
          <div className="prose">
            {/* Main Heading */}
            <h1 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Cookie Policy for DIGIHUB UNIQUE TECH SOLUTIONS PRIVATE LIMITED</strong>
            </h1>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              Last updated: Feb, 20, 2024
            </p>

            {/* What Are Cookies */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>What Are Cookies</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored; however, this may downgrade or 'break' certain elements of the site's functionality.
            </p>

            {/* How We Use Cookies */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>How We Use Cookies</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
            </p>

            {/* Disabling Cookies */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Disabling Cookies</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the site. Therefore, it is recommended that you do not disable cookies.
            </p>

            {/* The Cookies We Set */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>The Cookies We Set</strong>
            </h3>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Site preferences cookies:</strong>
                <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mt-2">
                  In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how the site runs when you use it. To remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page affected by your preferences.
                </p>
              </li>
            </ul>

            {/* Third-Party Cookies */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>Third-Party Cookies</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site:
            </p>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Google Analytics:</strong>
                <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mt-2">
                  This site uses Google Analytics to help us understand how you use the site and ways we can improve your experience. These cookies may track things such as how long you spend on the site and the pages you visit so we can continue to produce engaging content.
                </p>
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Testing New Features:</strong>
                <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mt-2">
                  From time to time, we test new features and make subtle changes to the way the site is delivered. These cookies may be used to ensure that you receive a consistent experience and to understand which optimizations our users appreciate the most.
                </p>
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Advertising and Business Data:</strong>
                <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mt-2">
                  As we sell products, it's important for us to track how many visitors to our site make a purchase. This data helps us accurately make business predictions, monitor our advertising, and ensure the best prices.
                </p>
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Google AdSense:</strong>
                <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mt-2">
                  The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.
                </p>
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Behavioural Advertising Cookies:</strong>
                <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mt-2">
                  These cookies track your interests anonymously and help us provide the most relevant ads by tracking your interests.
                </p>
              </li>
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                <strong className="text-[#384D89]">Social Media Cookies:</strong>
                <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mt-2">
                  We also use social media buttons and/or plugins to connect with social networks. These sites may set cookies through our site to enhance your profile or contribute to the data they hold for various purposes outlined in their privacy policies.
                </p>
              </li>
            </ul>

            {/* More Information */}
            <h3 className="bg-[#2A4172] text-white font-bold text-[21px] py-3 px-5 my-8 border-l-[5px] border-l-[#C1467F] rounded-l">
              <strong>More Information</strong>
            </h3>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              Hopefully, that has clarified things for you. If you are unsure whether you need cookies, it is usually safer to leave them enabled as they interact with features you use on our site.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              For more general information on cookies, please read the <a href="https://www.cookiespolicy.com" className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">Cookies Policy</a>.
            </p>
            <p className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-5">
              If you still have questions, you can contact us using the following contact methods:
            </p>
            <ul className="list-none pl-0 ml-4">
              <li className="text-[#14263F] font-sans text-[15px] leading-relaxed mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-[#A13C78] before:rounded-full">
                Email: <a href="mailto:Info@digihubtech.in" className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">Info@digihubtech.in</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cookies;