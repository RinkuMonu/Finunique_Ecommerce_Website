import { useState } from "react";

export default function ProfilePage1() {
  const tabs = ["Tab text", "Tab text", "Tab text", "Tab text", "Tab text"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
        <div className="relative">
          <div className="h-64 md:h-80 lg:h-96 w-full relative bg-gray-300 overflow-hidden">
            <img
              src="https://via.placeholder.com/1536x384"
              alt="Cover photo of a mountain range"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="absolute bottom-4 right-4">
            <button className="flex items-center px-4 py-2 rounded-md bg-black/60 text-white hover:bg-black/80 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Cover
            </button>
          </div>
        </div>

        <div className="bg-white px-4 sm:px-6 lg:px-8 pb-4">
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:space-x-5 -mt-16 sm:-mt-24">
            <div className="relative h-32 w-32 sm:h-48 sm:w-48 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden">
              <img
                src="https://via.placeholder.com/192x192"
                alt="Rachel Rose profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 sm:pb-6 flex-grow">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Rachel Rose</h1>
            </div>
          </div>

          <div className="mt-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <nav className="-mb-px flex space-x-6 sm:space-x-8" aria-label="Tabs">
                {tabs.map((tab, index) => (
                  <button
                    key={tab + index}
                    onClick={() => setActiveTab(index)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      index === activeTab
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}