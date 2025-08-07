// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShoppingCart, Star } from "lucide-react";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaPinterestP,
//   FaLinkedinIn,
//   FaWhatsapp,
//   FaEnvelope,
//   FaRegCopy,
//   FaRegUser,
// } from "react-icons/fa";
// import Arrivals from "../components/home/Arrivals";
// import { useDispatch } from "react-redux";
// import LoginModal from "../components/loginModal/LoginModal";
// // import Login from "../pages/Login";

// import { addItemToCart } from "../reduxslice/CartSlice";
// import Login1 from "./Login1";
// import { X } from "react-feather";
// import { RatingModal } from "./reviewmodal";
// // Define Product type directly in this file as requested
// interface Product {
//   _id: string;
//   productName: string;
//   description: string;
//   images: string[];
//   actualPrice: number;
//   price?: number; // Original price, optional
//   discount?: number; // Discount percentage, optional
//   size?: string; // Size, optional
//   category: {
//     _id: string;
//     name: string;
//   };
//   rating?: number; // Rating, optional
//   quantity?: number; // Used in cart context, optional
// }

// interface ProductDetailsProps {
//   addToCart: (product: Product) => void;
// }

// const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState<"description" | "reviews">(
//     "description"
//   );
//   const [mainImage, setMainImage] = useState<string>(""); // Re-introducing mainImage state
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [isRatingModalOpen, setRatingModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const baseUrl = import.meta.env.VITE_API_BASE_URL;
//   const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

//   // Popup States
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [addedProduct, setAddedProduct] = useState<any>(null);
//   const [review, setReview] = useState(null);
//   const [gettoken, settoken] = useState(null);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     settoken(token);
//     const fetchReview = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/sendreview/${id}`);
//         const data = await response.json();
//         setReview(data);
//         console.log(data);
//       } catch (err) {}
//     };

//     if (id) {
//       fetchReview();
//     }
//   }, [id, isRatingModalOpen]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`
//         );
//         const data = await res.json();
//         if (Array.isArray(data.products)) {
//           setAllProducts(data.products);
//           const matched = data.products.find(
//             (item: Product) => item._id === id
//           );
//           setProduct(matched || null);
//           if (matched && matched.images && matched.images.length > 0) {
//             setMainImage(matched.images[0]);
//           } else {
//             setMainImage("/placeholder.svg?height=600&width=600");
//           }
//         }
//       } catch (err) {
//         console.error("Error loading product:", err);
//         setProduct(null);
//         setMainImage("/placeholder.svg?height=600&width=600");
//       }
//     };
//     fetchProducts();
//   }, [id, baseUrl, referenceWebsite]);

//   const handleIncrease = () => setQuantity((prev) => prev + 1);
//   const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

//   const handleAddToCart = (product: any) => {
//     const token = localStorage.getItem("token");

//     const cartItem = {
//       id: product._id,
//       name: product.productName,
//       image: product.images?.[0] || "",
//       category: product.category?.name || "Uncategorized",
//       price: product.actualPrice || product.price,
//       quantity,
//     };

//     if (!token) {
//       // Get existing cart or initialize empty array
//       const existingCart = JSON.parse(
//         localStorage.getItem("addtocart") || "[]"
//       );

//       // Check if product already in cart
//       const existingProductIndex = existingCart.findIndex(
//         (item: any) => item.id === product._id
//       );

//       if (existingProductIndex !== -1) {
//         // Product exists – increase quantity
//         existingCart[existingProductIndex].quantity += quantity;
//       } else {
//         // New product – add to cart
//         existingCart.push(cartItem);
//       }

//       // Save updated cart back to localStorage
//       localStorage.setItem("addtocart", JSON.stringify(existingCart));
//       window.dispatchEvent(new Event("guestCartUpdated"));
//     } else {
//       // User is logged in – use Redux
//       dispatch(addItemToCart(cartItem));
//     }

//     // UI feedback
//     setAddedProduct(product);
//     setIsPopupVisible(true);
//     setTimeout(() => {
//       setIsPopupVisible(false);
//     }, 3000);

//     // closeModal();
//   };

//   const handleBuyNow = () => {
//     const isUserLoggedIn = !!localStorage.getItem("token");
//     if (!isUserLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (product) {
//       addToCart({
//         id: product._id,
//         name: product.productName,
//         image: product.images?.[0] || "",
//         category: product.category?.name || "Uncategorized",
//         price: product.actualPrice || product.price,
//         quantity,
//       });
//     }
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }).map((_, i) => (
//       <Star
//         key={i}
//         size={16}
//         className={`${
//           i < Math.floor(rating)
//             ? "fill-yellow-400 stroke-yellow-400"
//             : "stroke-gray-300"
//         }`}
//       />
//     ));
//   };

//   let relatedProductsFiltered = allProducts.filter(
//     (p) => p._id !== id && p.category?._id === product?.category?._id
//   );
//   if (relatedProductsFiltered.length < 4) {
//     const otherProducts = allProducts.filter(
//       (p) =>
//         p._id !== id && !relatedProductsFiltered.some((rp) => rp._id === p._id)
//     );
//     relatedProductsFiltered = [
//       ...relatedProductsFiltered,
//       ...otherProducts,
//     ].slice(0, 4);
//   }

//   if (!product)
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] text-2xl font-semibold text-gray-700">
//         Loading product details...
//       </div>
//     );

//   return (
//     <div className="container mx-auto px-4 py-16 min-h-screen">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
//         <div className="flex flex-col items-center">
//           <div
//             className="relative w-full max-w-xl rounded-3xl overflow-hidden  border-4 border-transparent transition-all duration-300 hover:border-purple-200"
//             style={{ borderColor: "rgba(157, 48, 137, 0.1)" }}
//           >
//             <img
//               // src={mainImage || "/placeholder.svg?height=600&width=600&query=main product image"}
//               src={`http://api.jajamblockprints.com${product.images}`}
//               alt={product.productName}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//           <div className="flex mt-6 space-x-4">
//             {product.images.map((img: string, index: number) => (
//               <img
//                 key={index}
//                 // src={img || "/placeholder.svg?height=100&width=100&query=product thumbnail"}
//                 src={`http://api.jajamblockprints.com${product.images}`}
//                 alt={`Thumbnail ${index + 1}`}
//                 className={`w-24 h-24 object-cover rounded-xl cursor-pointer border-3 transition-all duration-300 transform hover:scale-105 ${
//                   mainImage === img
//                     ? "border-purple-600 shadow-lg"
//                     : "border-gray-200 hover:border-purple-300"
//                 }`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}

//             {product.images.length === 0 && (
//               <>
//                 <img
//                   src={`http://api.jajamblockprints.com${product.images}`}
//                   alt="Thumbnail 2"
//                   className="w-24 h-24 object-cover rounded-xl cursor-pointer border-3 transition-all duration-300 transform hover:scale-105 border-gray-200 hover:border-purple-300"
//                   onClick={() =>
//                     setMainImage("/placeholder.svg?height=600&width=600")
//                   }
//                 />
//                 <img
//                   src={`http://api.jajamblockprints.com${product.images}`}
//                   alt="Thumbnail 3"
//                   className="w-24 h-24 object-cover rounded-xl cursor-pointer border-3 transition-all duration-300 transform hover:scale-105 border-gray-200 hover:border-purple-300"
//                   onClick={() =>
//                     setMainImage("/placeholder.svg?height=600&width=600")
//                   }
//                 />
//               </>
//             )}
//             {product.images.length === 1 && (
//               <>
//                 <img
//                   src={`http://api.jajamblockprints.com${product.images}`}
//                   alt="Thumbnail 2"
//                   className="w-24 h-24 object-cover rounded-xl cursor-pointer border-3 transition-all duration-300 transform hover:scale-105 border-gray-200 hover:border-purple-300"
//                   onClick={() =>
//                     setMainImage(
//                       product.images[0] ||
//                         "/placeholder.svg?height=600&width=600"
//                     )
//                   }
//                 />
//                 <img
//                   src={`http://api.jajamblockprints.com${product.images}`}
//                   alt="Thumbnail 3"
//                   className="w-24 h-24 object-cover rounded-xl cursor-pointer border-3 transition-all duration-300 transform hover:scale-105 border-gray-200 hover:border-purple-300"
//                   onClick={() =>
//                     setMainImage(
//                       product.images[0] ||
//                         "/placeholder.svg?height=600&width=600"
//                     )
//                   }
//                 />
//               </>
//             )}
//             {product.images.length === 2 && (
//               <img
//                 src={`http://api.jajamblockprints.com${product.images}`}
//                 alt="Thumbnail 3"
//                 className="w-24 h-24 object-cover rounded-xl cursor-pointer border-3 transition-all duration-300 transform hover:scale-105 border-gray-200 hover:border-purple-300"
//                 onClick={() =>
//                   setMainImage(
//                     product.images[0] || "/placeholder.svg?height=600&width=600"
//                   )
//                 }
//               />
//             )}
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="p-2">
//           <h1
//             className="text-5xl font-extrabold mb-4 leading-tight"
//             style={{ color: "#1B2E4F" }}
//           >
//             {product.productName}
//           </h1>
//           <p className="text-gray-700 text-xl mb-6 leading-relaxed">
//             {product.description}
//           </p>

//           <div className="flex items-center mb-5">
//             <div className="flex mr-3">{renderStars(product.rating || 4)}</div>
//             <span className="text-base text-gray-600">(Reviews)</span>
//           </div>

//           <div className="flex items-baseline mb-8">
//             <span
//               className="text-5xl font-bold mr-4"
//               style={{ color: "rgb(157 48 137)" }}
//             >
//               ₹{product.actualPrice}
//             </span>
//             {product.price && product.price !== product.actualPrice && (
//               <span className="text-2xl text-gray-500 line-through">
//                 ₹{product.price}
//               </span>
//             )}
//             {product.discount && (
//               <span
//                 className="ml-6 px-4 py-2 rounded-full text-lg font-semibold text-white shadow-md"
//                 style={{ background: "rgb(157 48 137)" }}
//               >
//                 {product.discount}% OFF
//               </span>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-gray-800 text-lg mb-8">
//             <div>
//               <span className="font-semibold">Size:</span>{" "}
//               <span className="text-gray-700">
//                 {product.size || "Standard"}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold">Category:</span>{" "}
//               <span className="text-gray-700">
//                 {product.category?.name || "Uncategorized"}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold">Material:</span>{" "}
//               <span className="text-gray-700">Premium Silk Blend</span>
//             </div>
//             <div>
//               <span className="font-semibold">Availability:</span>{" "}
//               <span className="text-green-600 font-medium">In Stock</span>
//             </div>
//           </div>

//           <div className="flex items-center mb-10">
//             <span className="mr-6 text-gray-800 font-semibold text-lg">
//               Quantity:
//             </span>
//             <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden shadow-sm">
//               <button
//                 onClick={handleDecrease}
//                 className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-base font-semibold" // Smaller buttons
//                 aria-label="Decrease quantity"
//               >
//                 -
//               </button>
//               <span className="px-4 py-1 text-base font-semibold text-gray-900">
//                 {quantity}
//               </span>{" "}
//               {/* Smaller font */}
//               <button
//                 onClick={handleIncrease}
//                 className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-base font-semibold" // Smaller buttons
//                 aria-label="Increase quantity"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 mb-10">
//             {" "}
//             {/* Reduced gap */}
//             <button
//               onClick={() => handleAddToCart(product)}
//               className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-sm" // Smaller buttons
//               style={{ background: "rgb(157 48 137)" }}
//             >
//               <ShoppingCart size={20} /> Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-xl hover:scale-[1.02] text-sm" // Smaller buttons
//             >
//               Buy Now
//             </button>

//           </div>

//           {/* Share Options */}
//           <div className="flex items-center gap-4 text-gray-600 text-xl">
//             <span className="font-semibold text-lg text-gray-800">Share:</span>
//             <a
//               href="#"
//               aria-label="Share on Facebook"
//               className="hover:text-purple-600 transition-colors"
//             >
//               <FaFacebookF />
//             </a>
//             <a
//               href="#"
//               aria-label="Share on Twitter"
//               className="hover:text-purple-600 transition-colors"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href="#"
//               aria-label="Share on Pinterest"
//               className="hover:text-purple-600 transition-colors"
//             >
//               <FaPinterestP />
//             </a>
//             <a
//               href="#"
//               aria-label="Share on LinkedIn"
//               className="hover:text-purple-600 transition-colors"
//             >
//               <FaLinkedinIn />
//             </a>
//             <a
//               href="#"
//               aria-label="Share on WhatsApp"
//               className="hover:text-purple-600 transition-colors"
//             >
//               <FaWhatsapp />
//             </a>
//             <a
//               href="#"
//               aria-label="Share via Email"
//               className="hover:text-purple-600 transition-colors"
//             >
//               <FaEnvelope />
//             </a>
//             <button
//               aria-label="Copy link"
//               className="hover:text-purple-600 transition-colors"
//             >
//               <FaRegCopy />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tabs Section */}
//       <div className="mt-20 p-10 rounded-3xl border-2 border-gray-100">
//         <div className="flex flex-wrap border-b-2 border-gray-200 mb-8">
//           {/* Button for Description Tab */}
//           <button
//             onClick={() => setActiveTab("description")}
//             className={`px-10 py-4 text-xl font-bold transition-all duration-300 w-full sm:w-auto ${
//               activeTab === "description"
//                 ? "border-b-4 border-purple-600 text-purple-800"
//                 : "text-gray-700 hover:text-purple-600"
//             }`}
//             style={{
//               borderColor: activeTab === "description" ? "rgb(157 48 137)" : "",
//             }}
//           >
//             Description
//           </button>

//           {/* Button for Reviews Tab */}
//           <div className=" flex justify-between gap-6 ">
//             <button
//               onClick={() => setActiveTab("reviews")}
//               className={`px-10 py-4 text-xl font-bold transition-all duration-300 w-full sm:w-auto ${
//                 activeTab === "reviews"
//                   ? "border-b-4 border-purple-600 text-purple-800"
//                   : "text-gray-700 hover:text-purple-600"
//               }`}
//               style={{
//                 borderColor: activeTab === "reviews" ? "rgb(157 48 137)" : "",
//               }}
//             >
//               Reviews
//             </button>
//             {activeTab === "reviews" && gettoken && (
//               <button
//                 onClick={() => setRatingModalOpen(true)}
//                 className="px-10 py-4 text-xl font-bold transition-all duration-300
//     bg-white text-gray-800
//     hover:bg-gray-100 hover:border-gray-400
//     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
//     rounded-lg shadow-sm hover:shadow-md"
//               >
//                 Rate Product
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="py-8 text-gray-700 text-lg leading-relaxed">
//           {activeTab === "description" ? (
//             <div>
//               <h3
//                 className="text-2xl font-bold mb-5"
//                 style={{ color: "#1B2E4F" }}
//               >
//                 Product Overview
//               </h3>
//               <p className="mb-5">{product.description}</p>
//               <p className="mb-5">
//                 This exquisite piece is crafted with the finest traditional
//                 techniques, ensuring both authenticity and durability. Perfect
//                 for special occasions, it embodies the rich cultural heritage of
//                 our artisans.
//               </p>
//               <ul className="list-disc list-inside space-y-3 text-gray-700">
//                 <li>Handwoven with premium threads</li>
//                 <li>Intricate traditional patterns</li>
//                 <li>Comfortable and breathable fabric</li>
//                 <li>Ideal for festive wear and celebrations</li>
//               </ul>
//             </div>
//           ) : (
//             <div>
//               <h3
//                 className="text-2xl font-bold mb-5"
//                 style={{ color: "#1B2E4F" }}
//               >
//                 Customer Reviews
//               </h3>
//               {review.length > 0 ? (
//                 <div className="space-y-8">
//                   {review.map((review) => (
//                     <div
//                       key={review.id}
//                       className="border-b pb-6 last:border-b-0 last:pb-0"
//                     >
//                       <div className="flex flex-col items-start mb-2 gap-3">
//                         <span className="flex justify-center items-center gap-3 font-semibold text-gray-900 mr-3">
//                           <FaRegUser />
//                           {review?.user?.firstName} {review?.user?.lastName}
//                         </span>
//                         <div className="flex">{renderStars(review.rating)}</div>
//                       </div>
//                       <p className="text-sm text-gray-500 mb-3">
//                         {review.date}
//                       </p>
//                       <p className="text-gray-700 leading-relaxed">
//                         {review.comment}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-700">
//                   No reviews yet. Be the first to share your experience!
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//       {showLoginModal && (
//         <LoginModal
//           isOpen={showLoginModal}
//           onClose={() => setShowLoginModal(false)}
//         >
//           <Login1 />
//         </LoginModal>
//       )}
//       {isPopupVisible && addedProduct && (
//         <div
//           className="fixed top-4 right-4 bg-green-100 text-green-500 p-4 rounded-lg shadow-lg z-50 transition-transform transform translate-x-0 opacity-100"
//           style={{
//             transition: "transform 0.5s ease, opacity 0.5s ease",
//           }}
//         >
//           <div className="flex justify-between items-center">
//             <span className="text-[12px]">Product Added to Cart</span>
//             <button onClick={() => setIsPopupVisible(false)}>
//               <X size={20} />
//             </button>
//           </div>
//           <p className="mt-2 text-[12px]">{addedProduct.productName}</p>
//         </div>
//       )}

//       <Arrivals
//         addToCart={function (): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//       {isRatingModalOpen && (
//         <RatingModal
//           isOpen={isRatingModalOpen}
//           onClose={() => setRatingModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  Facebook,
  Twitter,
  Pin,
  Linkedin,
  PhoneIcon as Whatsapp,
  Mail,
  Copy,
  User,
  X,
  Minus,
  Plus,
  ImageIcon,
  Heart,
  CheckCircle,
  Zap,
  Truck,
  Check,
} from "lucide-react";
import Arrivals from "../components/home/Arrivals";
import { useDispatch } from "react-redux";
import LoginModal from "../components/loginModal/LoginModal";
import { addItemToCart } from "../reduxslice/CartSlice";
import Login1 from "./Login1";
import { RatingModal } from "./reviewmodal";
import { FaChevronRight, FaShare } from "react-icons/fa";

interface Product {
  _id: string;
  productName: string;
  description: string;
  images: string[];
  actualPrice: number;
  price?: number;
  discount?: number;
  size?: string;
  category: {
    _id: string;
    name: string;
  };
  rating?: number;
  quantity?: number;
}

interface ProductDetailsProps {
  addToCart: (product: Product) => void;
}

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const [mainImage, setMainImage] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const Image_BaseURL = import.meta.env.VITE_API_BASE_URL_IMAGE;

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState<any>(null);
  const [review, setReview] = useState<any[]>([]);
  const [gettoken, settoken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    settoken(token);
    const fetchReview = async () => {
      try {
        const response = await fetch(`${baseUrl}/sendreview/${id}`);
        const data = await response.json();
        setReview(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReview([]);
      }
    };
    if (id) {
      fetchReview();
    }
  }, [id, isRatingModalOpen, baseUrl]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproduct/${id}?referenceWebsite=${referenceWebsite}`
        );
        const data = await res.json();
        // if (Array.isArray(data.products)) {
        //   setAllProducts(data?.products);
        //   const matched = data?.products.find(
        //     (item: Product) => item._id === id
        //   );
        setProduct(data?.product || null);

        if (
          data?.product &&
          data?.product?.images &&
          data?.product?.images?.length > 0
        ) {
          setMainImage(`${data?.product?.images[0]}`);
        } else {
          setMainImage("/placeholder.svg?height=600&width=600");
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setProduct(null);
        setMainImage("/placeholder.svg?height=600&width=600");
      }
    };
    fetchProducts();
  }, [id, baseUrl, referenceWebsite]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = (product: Product) => {
    const token = localStorage.getItem("token");
    const cartItem = {
      id: product._id,
      name: product.productName,
      image: product.images?.[0] ? `${Image_BaseURL}${product.images[0]}` : "",
      category: product.category?.name || "Uncategorized",
      price: product.actualPrice || product.price,
      quantity,
    };
    if (!token) {
      const existingCart = JSON.parse(
        localStorage.getItem("addtocart") || "[]"
      );
      const existingProductIndex = existingCart.findIndex(
        (item: any) => item.id === product._id
      );
      if (existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }
      localStorage.setItem("addtocart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("guestCartUpdated"));
    } else {
      dispatch(addItemToCart(cartItem));
    }
    setAddedProduct(product);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    const isUserLoggedIn = !!localStorage.getItem("token");
    if (!isUserLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (product) {
      addToCart({
        _id: product._id,
        productName: product.productName,
        description: product.description,
        images: product.images,
        actualPrice: product.actualPrice,
        category: product.category,
        price: product.actualPrice || product.price,
        quantity,
      } as Product);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`${
          i < Math.floor(rating)
            ? "fill-yellow-400 stroke-yellow-400"
            : "stroke-gray-400"
        }`}
      />
    ));
  };

  let relatedProductsFiltered = allProducts.filter(
    (p) => p._id !== id && p.category?._id === product?.category?._id
  );
  if (relatedProductsFiltered.length < 4) {
    const otherProducts = allProducts.filter(
      (p) =>
        p._id !== id && !relatedProductsFiltered.some((rp) => rp._id === p._id)
    );
    relatedProductsFiltered = [
      ...relatedProductsFiltered,
      ...otherProducts,
    ].slice(0, 4);
  }

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-2xl font-semibold text-gray-700">
        Loading product details...
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8 lg:gap-12 items-start">
        {/* Product Image Gallery */}
        <div className="sticky top-4 flex flex-col items-center p-4">
          {/* Main Image with Zoom Effect */}
          <div className="relative w-full max-w-xl rounded-2xl overflow-hidden border-2 border-[#2A4172]/20 bg-white  shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.3)] hover:border-[#2A4172]/30 group">
            <div className="relative overflow-hidden rounded-lg aspect-square ">
              <img
                src={mainImage || "/placeholder.svg?height=600&width=600"}
                alt={product?.productName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-[#A13C78] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md animate-pulse">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="mt-6 w-full">
            <div className="flex space-x-3 pb-2 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#A13C78]/30 scrollbar-track-gray-100/50 ">
              {product?.images?.length > 0
                ? product?.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`flex-shrink-0 w-20 h-20 m-2 rounded-lg overflow-hidden border-3 transition-all duration-300 snap-center ${
                        mainImage === img
                          ? "border-[#380d27] ring-2 ring-[#83225c]"
                          : "border-gray-200 hover:border-[#C1467F]"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover hover:opacity-90"
                      />
                    </button>
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400"
                    >
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Header */}
          <div className="mb-6 flex items-center">
            <ul className="space-y-2">
              <li className="flex items-center ">
                <span className="text-gray-800 font-medium text-[15px]">
                  Category{" "}
                </span>
                <FaChevronRight className="w-3 h-3 text-[#616664] mt-1 mx-2 flex-shrink-0" />
                <span className="text-[#2A4172] text-[13px]">
                  {product.category?.name}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-[#1B2E4F] mb-2">
                {product.productName}
              </h1>
            </div>

            {/* Brand & SKU */}
            <div className="flex items-center space-x-4 text-sm text-[#2A4172] mb-4">
              <span>Brand: {product.brand || "Generic"}</span>
              <span>|</span>
              <span>SKU: {product.sku || "N/A"}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product?.rating || 4)}
              </div>
              <span className="text-sm text-[#2A4172] ml-1">
                ({review?.length} Reviews)
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm font-medium text-[#3ae698] flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> In Stock
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-[#F5F7FA] rounded-xl p-5 mb-4">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-[#A13C78]">
                ₹ {product?.actualPrice.toFixed()}
              </span>
              {product?.price !== product?.actualPrice && (
                <span className="text-xl text-[#2A4172] line-through">
                  ₹{product?.price}
                </span>
              )}
              {product?.discount && (
                <span className="ml-2 px-3 py-1 bg-[#A13C78]/10 text-[#A13C78] rounded-full text-sm font-bold">
                  Save {product?.discount}%
                </span>
              )}
            </div>
            {product?.price !== product?.actualPrice && (
              <div className="mt-2 text-sm text-[#2A4172]">
                You save: ₹{(product?.price - product?.actualPrice).toFixed(2)}
              </div>
            )}
          </div>

          {/* Highlights */}

          {/* Variants */}
          {product?.variants && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#1B2E4F] mb-3">
                Available Options
              </h3>
              <div className="flex flex-wrap gap-2">
                {product?.variants?.map((variant) => (
                  <button
                    key={variant.id}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                      variant?.selected
                        ? "bg-[#1B2E4F] text-white border-[#1B2E4F]"
                        : "bg-white text-[#2A4172] border-gray-300 hover:border-[#1B2E4F]"
                    }`}
                  >
                    {variant?.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#1B2E4F] font-medium">Quantity:</span>
            </div>
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-fit shadow-sm">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-[#2A4172] text-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </button>
              <span className="px-5 py-2 text-lg font-medium text-[#1B2E4F]">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                disabled={quantity >= product?.stock}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-[#2A4172] text-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#2A4172] hover:bg-[#1B2E4F] text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#A13C78] hover:bg-[#872D67] text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
            >
              <Zap size={20} className="mr-1" />
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="bg-[#F0F4F9] border border-[#2A4172]/20 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <Truck className="w-5 h-5 text-[#A13C78] mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-[#1B2E4F] mb-1">
                  Free Delivery
                </h4>
                <p className="text-sm text-[#2A4172]">
                  Get free delivery on this item. Expected delivery in 2-4
                  business days.
                </p>
              </div>
            </div>
          </div>

          {/* Share & Wishlist */}
          <div className="flex flex-col sm:flex-row justify-end items-center pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <span className="text-[#1B2E4F] font-medium flex items-center gap-2">
                Share: <FaShare color="[#A13C78]" />
              </span>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, color: "#2A4172" },
                  { icon: Twitter, color: "#2A4172" },
                  { icon: Whatsapp, color: "#2A4172" },
                  { icon: Linkedin, color: "#2A4172" },
                ].map((Social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#2A4172] hover:text-[#A13C78] hover:scale-110 transition-all"
                    style={{ backgroundColor: `rgba(${Social?.color}, 0.1)` }}
                  >
                    <Social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20 p-8 md:p-10 rounded-xl border-2 border-[#2A4172]/20 shadow-inner bg-white">
        <div className="flex flex-wrap border-b-2 border-[#2A4172]/20 mb-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-8 py-4 text-xl font-bold transition-all duration-300 w-full sm:w-auto ${
              activeTab === "description"
                ? "border-b-4 border-[#A13C78] text-[#1B2E4F]"
                : "text-[#2A4172] hover:text-[#A13C78]"
            }`}
          >
            Description
          </button>
          <div className="flex justify-between gap-6 w-full sm:w-auto sm:flex-grow">
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-8 py-4 text-xl font-bold transition-all duration-300 w-full sm:w-auto ${
                activeTab === "reviews"
                  ? "border-b-4 border-[#A13C78] text-[#1B2E4F]"
                  : "text-[#2A4172] hover:text-[#A13C78]"
              }`}
            >
              Reviews
            </button>
            {activeTab === "reviews" && gettoken && (
              <button
                onClick={() => setRatingModalOpen(true)}
                className="ml-auto px-3 text-md font-semibold transition-all duration-300 
              text-gray-700 hover:text-white hover:bg-[#2A4172] bg-[#b3cafc]
              focus:outline-none focus:ring-2 focus:ring-[#A13C78] focus:ring-opacity-50 
              rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5
              "
              >
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5" />
                  Rate Product
                </div>
              </button>
            )}
          </div>
        </div>
        <div className="py-8 text-[#2A4172] text-lg leading-relaxed">
          {activeTab === "description" ? (
            <div>
              <h3 className="text-2xl font-bold mb-5 text-[#1B2E4F]">
                Product Overview
              </h3>
              <p className="mb-5">{product?.description}</p>
              <p className="mb-5">
                This cutting-edge electronic device is engineered with precision
                and designed for optimal performance. It integrates seamlessly
                into your digital lifestyle, offering unparalleled efficiency
                and reliability.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#2A4172]">
                <li>High-performance processor for demanding tasks</li>
                <li>Durable and sleek design with premium finishes</li>
                <li>Intuitive user interface for effortless navigation</li>
                <li>Long-lasting battery life for extended usage</li>
                <li>Advanced connectivity options (Wi-Fi 6, Bluetooth 5.2)</li>
              </ul>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold mb-5 text-[#1B2E4F]">
                Customer Reviews
              </h3>
              {review?.length > 0 ? (
                <div className="space-y-8">
                  {review?.map((reviewItem: any) => (
                    <div
                      key={reviewItem?.id}
                      className="border-b border-[#2A4172]/20 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 gap-3">
                        <span className="flex justify-center items-center gap-2 font-semibold text-[#1B2E4F] mr-3">
                          <User size={20} className="text-[#A13C78]" />
                          {reviewItem?.user?.firstName}{" "}
                          {reviewItem?.user?.lastName}
                        </span>
                        <div className="flex">
                          {renderStars(reviewItem?.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-[#2A4172]/80 mb-3">
                        {reviewItem?.date}
                      </p>
                      <p className="text-[#2A4172] leading-relaxed">
                        {reviewItem?.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#2A4172]">
                  No reviews yet. Be the first to share your experience!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1 />
        </LoginModal>
      )}
      {isPopupVisible && addedProduct && (
        <div
          className="fixed top-4 right-4 bg-green-100 text-green-700 p-4 rounded-lg shadow-lg z-50 transition-transform transform translate-x-0 opacity-100 flex items-center gap-3"
          style={{
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        >
          <ShoppingCart size={20} className="text-green-600" />
          <div className="flex-grow">
            <span className="text-sm font-semibold">Product Added to Cart</span>
            <p className="mt-1 text-xs text-gray-600">
              {addedProduct?.productName}
            </p>
          </div>
          <button
            onClick={() => setIsPopupVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>
      )}
      <Arrivals addToCart={handleAddToCart} />
      {isRatingModalOpen && (
        <RatingModal
          isOpen={isRatingModalOpen}
          onClose={() => setRatingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
