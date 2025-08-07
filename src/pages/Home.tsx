import React, { useState } from "react";
import Banner from "../components/home/Banner";
import TrendingProducts from "../components/home/TrendingProducts";
import Arrivals from "../components/home/Arrivals";
import TopCategories from "../components/home/TopCategories";
import Newsletter from "../components/home/Newsletter";
import HowItWorks from "../components/home/HowItWorks";
import DeliveryFeatures from "../components/home/DeliveryFeatures";
import axios from "axios";
import { useEffect } from "react";
import FeaturedSections from "../components/home/featured-sections";
import DealsOfTheDay from "../components/home/deals-of-the-day";
import DealsSection from "../components/home/DealsSection";
import TabletSlider from "../components/home/TabletSlider";
import LimitedTimeDeals from "../components/home/LimitedTimeDeals";
import Commitments from "../components/home/Commitments";
import Premium from "../components/home/Premium";

interface HomeProps {
  addToCart: (product: Product) => void;
  onCartClick: () => void;
}

export default function   Home({ addToCart, onCartClick }: HomeProps) {
  // const [loading2, setLoading2] = useState(false);

  // const data = {
  //   name: "Waleed",
  //   amount: 1,
  //   number: "7498608775",
  //   MUID: "MUID" + Date.now(),
  //   transactionId: "T" + Date.now(),
  // };

  // const handlePayment = (e) => {
  //   e.preventDefault();
  //   setLoading2(true);
  //   axios
  //     .post("https://sevenunique-backend.onrender.com/api/v1/payment/payment", { ...data })
  //     .then((res) => {
  //       setTimeout(() => {
  //         setLoading2(false);
  //       }, 1500);
  //     })
  //     .catch((error) => {
  //       setLoading2(false);
  //       console.error(error);
  //     });
  // };
  useEffect(() => {
    const fetchAndPostData = async () => {
      try {
        // Pehli API se data fetch karna
        const response = await axios.get("https://www.JAJAMtech.in/payoutCallback");
        const fetchedData = response.data;
 
        console.log("Fetched Data:", fetchedData);

        // Dusri API me post karna
        const postResponse = await axios.post("https://api.worldpayme.com/api/mypaycallback", fetchedData);
        
        console.log("Post Response:", postResponse.data);
      } catch (error) {
        console.error("Error in fetching or posting data:", error);
      }
    };

    fetchAndPostData();
      // Har 1 minute (60,000 ms) me call karna
      const intervalId = setInterval(fetchAndPostData, 60000);  

      // Cleanup function (memory leak se bachne ke liye)
      return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Banner />
      <FeaturedSections />
      <Premium />
      <TrendingProducts addToCart={addToCart} /> 
      <TabletSlider />
      <Commitments />
      <DealsOfTheDay />
      <DealsSection />
      {/* <Arrivals addToCart={addToCart} />
      <TopCategories /> */}
    <LimitedTimeDeals />

      {/* <HowItWorks /> */}
      {/* <DeliveryFeatures /> */}
      {/* <Newsletter /> */}
    </>
  );
}
