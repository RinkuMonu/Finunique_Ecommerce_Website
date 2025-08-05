import React from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFolder } from 'react-icons/bs';
import {
    FaFacebookF,
    FaTwitter,
    FaWhatsapp,
    FaRegClock,
    FaFolderOpen,
} from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
const StoriesData = [
    {
        image: "/saree9.webp",
        title: 'Lorem ipsum dolork ipsum dolork',
        rank: 1,
        date: '02-05-2025',
        category: "marketing"
    },
    {
        image: "/saree9.webp",
        title: 'Lorem ipsum dolork ipsum dol dolork',
        rank: 1,
        date: '02-05-2025',
        category: "marketing"
    },
    {
        image: "/saree9.webp",
        title: 'Lorem ipsum dolork ipsum dol dolork',
        rank: 1,
        date: '02-05-2025',
        category: "marketing"
    },
    {
        image: "/saree9.webp",
        title: 'Lorem ipsum dolork ipsum dol dolork',
        rank: 1,
        date: '02-05-2025',
        category: "marketing"
    },
];

const categories = [
    'Lorem ipsum dolorcc',
    'Lorem ipsum dolorcc',
    'Lorem ipsum dolorcc',
    'Lorem ipsum dolorcc',
    'Lorem ipsum dolorcc',
    'Lorem ipsum dolorcc',
    'Lorem ipsum dolorcc',
    'Lorem ipsum dolorcc',
];

export default function StoriesDetail() {
    return (
        <section className="py-10  min-h-screen container">
            <div className=" mx-auto flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="max-w-4xl mx-auto  py-6">
                            {/* Title */}
                            <h1 className="text-2xl md:text-4xl font-semibold  mb-2 ">
                                Lorem ipsum dolor sit amet, consecte adipiscing elit, sed
                            </h1>
                            {/* <div className="md:flex justify-between text-purple-500 text-sm mb-4">
                                <div className="flex  md:justify-between gap-1">
                                    <FaRegCalendarAlt size={14} />
                                    <span>02-05-2025</span>
                                </div>
                                <p>By : doloremque laudantium, totam reb</p>
                                <p>Author : dicta sunt</p>
                            </div> */}
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-11">
                                    <div className="rounded-xl overflow-hidden mb-6 ">
                                        <img
                                            src="/saree9.webp"
                                            alt="Stories Visual"
                                            className="w-full object-cover max-h-[300px] md:max-h-[500px] px-2 md:px-0"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-1 flex items-center">
                                    <div className="flex md:flex-col gap-4 mx-auto">
                                        <Link
                                            href="#"
                                            className="text-[#9D3089] hover:text-white border border-[#D8BFD8] w-fit p-2 rounded-full hover:bg-[#9D3089]"
                                        >
                                            <FaWhatsapp size={24} />
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-[#9D3089] hover:text-white border border-[#D8BFD8] w-fit p-2 rounded-full hover:bg-[#9D3089]"
                                        >
                                            <FaFacebookF size={24} />
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-[#9D3089] hover:text-white border border-[#D8BFD8] w-fit p-2 rounded-full hover:bg-[#9D3089]"
                                        >
                                            <FaTwitter size={24} />
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-[#9D3089] hover:text-white border border-[#D8BFD8] w-fit p-2 rounded-full hover:bg-[#9D3089]"
                                        >
                                            <FaFolderOpen size={24} />
                                        </Link>
                                    </div>
                                </div>
                            </div>



                            <div className="mt-4">
                                <div className='gap-4'>
                                    <div className=' ps-3 md:pe-0'>
                                        <h2 className="text-xl font-semibold  mb-2">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed mb-2">
                                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...
                                        </p>
                                        <p className="text-gray-700 leading-relaxed mb-2">
                                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...
                                        </p>
                                        <h2 className="text-xl font-semibold  mb-2">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...
                                        </p>
                                        <Link href="/contact" className="font-semibold  bg-white shadow-[0_8px_15px_rgba(216,191,216)] rounded-lg inline-flex text-base px-3 md:px-6 py-2 md:py-3 text-center text-[#9D3089]  mt-5 w-fit"> <IoIosArrowBack className='mt-1 me-1' />Back to Stories</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="md:pt-8">
                        <div className="sticky top-6 transition-all duration-300 max-w-full lg:max-w-sm space-y-6">

                            {/* Trending Stories */}
                            <div className="rounded-lg border border-[#9D3089] p-4">
                                <div className="flex items-center gap-2 mb-4 text-[#9D3089] font-semibold text-sm">
                                    <FaArrowTrendUp size={18} />
                                    <span>Trending Stories</span>
                                </div>
                                <div className="space-y-3">
                                    {StoriesData.map((Stories, index) => (
                                        <Link
                                            href="/"
                                            key={index}
                                            className="flex items-start gap-3 border-b pb-3 border-gray-200"
                                        >
                                            <img
                                                src={Stories.image}
                                                alt="thumb"
                                                className="w-16 h-14 object-cover rounded border-2"
                                            />
                                            <div className="flex flex-col justify-between w-full">
                                                <p className="text-sm font-medium text-gray-800">
                                                    {Stories.title}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                                                    <span className="bg-[#9D3089] text-white text-[10px] px-2 py-[1px] rounded">
                                                        #{Stories.rank}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaRegCalendarAlt size={12} />
                                                        {Stories.date}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Posts */}
                            <div className="rounded-lg border border-[#9D3089] p-4 ">
                                <div className="flex items-center gap-2 mb-4 text-[#9D3089] font-semibold text-sm">
                                    <AiOutlineClockCircle size={18} />
                                    <span>Recent Post</span>
                                </div>
                                <div className="space-y-3">
                                    {StoriesData.map((Stories, index) => (
                                        <Link
                                            href="/"
                                            key={index}
                                            className="flex items-start gap-3 border-b pb-3 border-gray-200"
                                        >
                                            <img
                                                src={Stories.image}
                                                alt="thumb"
                                                className="w-16 h-14 object-cover rounded"
                                            />
                                            <div className="flex flex-col justify-between w-full">
                                                <p className="text-sm font-medium text-gray-800">
                                                    {Stories.title}
                                                </p>
                                                <div className="flex justify-end text-xs text-gray-500 mt-2">
                                                    <span className="flex items-center gap-1">
                                                        <FaRegCalendarAlt size={12} />
                                                        {Stories.date}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="rounded-xl  border border-[#E0C8ED] p-5 shadow-md">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="bg-[#EBDCF5] p-2 rounded-full text-[#9D3089]">
                                        <BsFolder size={16} />
                                    </div>
                                    <h3 className="text-[#4B0082] font-semibold text-lg">Categories</h3>
                                </div>

                                {/* Categories List */}
                                <div className="flex flex-col gap-2">
                                    {categories.map((cat, i) => (
                                        <Link href="#" key={i}>
                                            <div className="cursor-pointer w-full bg-purple-50 px-3 py-2 text-sm text-[#4B0082] font-medium border border-[#E0C8ED] rounded hover:bg-[#9D3089] hover:text-white transition duration-200">
                                                {cat}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </section>

    );
}
