import { MdArrowOutward } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Stories() {
    const StoriesPosts = [
        {
            id: 1,
            author: "Debitis Aut",
            date: "20 April 2025",
            title: "At vero eos et accusamus et lustood io ",
            description: "Stay updated with our latest insights and industry trends. Explore expert articles, tips, and thought leadership.",
            url: "/Stories/post-1",
            image: "/saree9.webp",
            category: "marketing"
        },
        {
            id: 2,
            author: "Jane Doe",
            date: "15 May 2025",
            title: "Understanding modern web development practices",
            description: "Stay updated with our latest insights and industry trends. Explore expert articles, tips, and thought leadership.",
            url: "/Stories/post-2",
            image: "/saree5.webp",
            category: "marketing"
        },
        {
            id: 3,
            author: "John Smith",
            date: "1 June 2025",
            title: "The future of responsive design",
            description: "Stay updated with our latest insights and industry trends. Explore expert articles, tips, and thought leadership.",
            url: "/Stories/post-3",
            image: "/saree9.webp",
            category: "marketing"
        },
        {
            id: 4,
            author: "Debitis Aut",
            date: "20 April 2025",
            title: "At vero eos et accusamus et lustood io ",
            description: "Stay updated with our latest insights and industry trends. Explore expert articles, tips, and thought leadership.",
            url: "/Stories/post-1",
            image: "/saree4.webp",
            category: "marketing"
        },
        {
            id: 5,
            author: "Jane Doe",
            date: "15 May 2025",
            title: "Understanding modern web development practices",
            description: "Stay updated with our latest insights and industry trends. Explore expert articles, tips, and thought leadership.",
            url: "/Stories/post-2",
            image: "/saree2.webp",
            category: "finance"
        },
        {
            id: 6,
            author: "John Smith",
            date: "1 June 2025",
            title: "The future of responsive design",
            description: "Stay updated with our latest insights and industry trends. Explore expert articles, tips, and thought leadership.",
            url: "/Stories/post-3",
            image: "/saree1.webp",
            category: "technology"
        }
    ];
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 6

    const filteredPosts = StoriesPosts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "" || post.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <>
            <section className="" >
                <div className="  relative">
                    <section className="my-10" >
                        <div className="text-center">
                            <p className="pt-4 text-4xl font-semibold">Fresh ideas, real stories, and smart insights.</p>
                        </div>
                        <div className="sm:flex items-center mx-auto max-w-5xl gap-4 mt-8 mb-6 px-4">
                            {/* Search Input */}
                            <div className="relative w-full sm:w-2/3">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-gray-200 bg-white shadow-sm rounded-xl px-4 py-3 pl-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full sm:w-1/3 border border-gray-200 bg-white shadow-sm rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                            >
                                <option value="">All Categories</option>
                                {[...new Set(StoriesPosts.map((p) => p.category))].map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-10 border-b-2 border-gray-200">
                            {currentPosts.map((post, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-gray-100"
                                >
                                    {/* Top Image Section */}
                                    <div className="relative w-full h-[220px] overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt="Stories"
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <Link
                                            href="/Stories"
                                            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-purple-700 px-4 py-2 text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-md"
                                        >
                                            Read More <MdArrowOutward className="inline-block ml-1" />
                                        </Link>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-4 flex flex-col justify-between flex-1">
                                        <div className="flex items-center text-gray-500 text-sm mb-2">
                                            <SlCalender className="mr-2" />
                                            <span>{post.date}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                                        <p className="text-gray-600 text-sm">{post.description}</p>
                                    </div>
                                </div>

                            ))}
                        </div>

                        <div className="sm:flex justify-between items-center mt-10 px-10">
                            {/* Page Numbers */}
                            <div className="flex justify-center sm:justify-end gap-2">
                                {Array.from({ length: 4 }).map((_, i) => {
                                    const half = Math.floor(4 / 2);
                                    let start = Math.max(1, currentPage - half);
                                    let end = start + 3;

                                    if (end > totalPages) {
                                        end = totalPages;
                                        start = Math.max(1, end - 3);
                                    }

                                    const page = start + i;
                                    const isDisabled = page > totalPages;

                                    return (
                                        <button
                                            key={i}
                                            className={`px-4 py-2 border-2 font-semibold rounded-full transition-colors duration-200
            ${currentPage === page
                                                    ? "bg-purple-600 text-white border-purple-600"
                                                    : "text-gray-700 border-gray-300 hover:bg-purple-100"
                                                }
            ${isDisabled ? "cursor-not-allowed opacity-50" : ""}
          `}
                                            onClick={() => {
                                                if (!isDisabled) setCurrentPage(page);
                                            }}
                                            disabled={isDisabled}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Navigation Arrows */}
                            <div className="flex gap-2 pt-4 justify-center sm:justify-end sm:mt-0">
                                <button
                                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-3 border rounded-full text-purple-600 border-purple-600 hover:bg-purple-100 hover:text-purple-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                                >
                                    <FaArrowLeft />
                                </button>
                                <button
                                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-3 border rounded-full text-purple-600 border-purple-600 hover:bg-purple-100 hover:text-purple-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>



                    </section>
                </div>

            </section>
        </>
    );
}
