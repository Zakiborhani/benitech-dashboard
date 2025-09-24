import { FaUserPlus, FaShoppingCart } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
// Simulated authentication state
const isSignedIn = false; // Change to true to simulate signed-in state
import { MdDashboard, MdPhotoLibrary } from "react-icons/md";
import { FaUsers, FaBoxOpen, FaRegEdit, FaListAlt } from "react-icons/fa";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full">
      {/* Main Cards Section */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {/* Card 1: Today's Money */}
        <div className="bg-white rounded-md shadow p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-2 mb-1 min-h-[32px]">
            <MdAttachMoney className="w-8 h-8 min-w-[32px] min-h-[32px] text-green-500" />
            <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 break-words">Today's Money</span>
          </div>
          <div className="w-full my-2 border-b border-blue-200 opacity-40"></div>
          <div className="flex flex-col items-start mt-2">
            <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-blue-700 break-words">$53,000</span>
            <span className="text-xs sm:text-sm md:text-base text-green-600 mt-1 break-words">+55% <span className="text-gray-500">than last week</span></span>
          </div>
        </div>
        {/* Card 2: Today's User */}
        <div className="bg-white rounded-md shadow p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-2 mb-1 min-h-[32px]">
            <FaUsers className="w-8 h-8 min-w-[32px] min-h-[32px] text-blue-500" />
            <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 break-words">Today's User</span>
          </div>
          <div className="w-full my-2 border-b border-blue-200 opacity-40"></div>
          <div className="flex flex-col items-start mt-2">
            <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-blue-700 break-words">1,200</span>
            <span className="text-xs sm:text-sm md:text-base text-green-600 mt-1 break-words">+12% <span className="text-gray-500">than last week</span></span>
          </div>
        </div>
        {/* Card 3: New Clients */}
        <div className="bg-white rounded-md shadow p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-2 mb-1 min-h-[32px]">
            <FaUserPlus className="w-8 h-8 min-w-[32px] min-h-[32px] text-purple-500" />
            <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 break-words">New Clients</span>
          </div>
          <div className="w-full my-2 border-b border-blue-200 opacity-40"></div>
          <div className="flex flex-col items-start mt-2">
            <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-purple-700 break-words">320</span>
            <span className="text-xs sm:text-sm md:text-base text-green-600 mt-1 break-words">+8% <span className="text-gray-500">than last week</span></span>
          </div>
        </div>
        {/* Card 4: Sales */}
        <div className="bg-white rounded-md shadow p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-2 mb-1 min-h-[32px]">
            <FaShoppingCart className="w-8 h-8 min-w-[32px] min-h-[32px] text-orange-500" />
            <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 break-words">Sales</span>
          </div>
          <div className="w-full my-2 border-b border-blue-200 opacity-40"></div>
          <div className="flex flex-col items-start mt-2">
            <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-orange-700 break-words">$9,800</span>
            <span className="text-xs sm:text-sm md:text-base text-green-600 mt-1 break-words">+21% <span className="text-gray-500">than last week</span></span>
          </div>
        </div>
      </div>
      {/* Second row of cards */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Card 5: Website Views */}
        <div className="bg-white rounded-md shadow p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-semibold text-green-600">Website Views</span>
          </div>
          <div className="w-full my-2 border-b border-green-200 opacity-40"></div>
          <div className="flex flex-col items-start mt-2 w-full">
            {/* SVG graph for Monday to Saturday */}
            <div className="w-full h-24 bg-green-50 rounded-md flex items-end p-2">
              <svg viewBox="0 0 120 60" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="4"
                  points="10,50 30,40 50,45 70,30 90,35 110,25"
                />
                {/* Dots for each day */}
                <circle cx="10" cy="50" r="4" fill="#22c55e" />
                <circle cx="30" cy="40" r="4" fill="#22c55e" />
                <circle cx="50" cy="45" r="4" fill="#22c55e" />
                <circle cx="70" cy="30" r="4" fill="#22c55e" />
                <circle cx="90" cy="35" r="4" fill="#22c55e" />
                <circle cx="110" cy="25" r="4" fill="#22c55e" />
                {/* Day labels */}
                <text x="10" y="58" fontSize="8" textAnchor="middle" fill="#22c55e">Mon</text>
                <text x="30" y="58" fontSize="8" textAnchor="middle" fill="#22c55e">Tue</text>
                <text x="50" y="58" fontSize="8" textAnchor="middle" fill="#22c55e">Wed</text>
                <text x="70" y="58" fontSize="8" textAnchor="middle" fill="#22c55e">Thu</text>
                <text x="90" y="58" fontSize="8" textAnchor="middle" fill="#22c55e">Fri</text>
                <text x="110" y="58" fontSize="8" textAnchor="middle" fill="#22c55e">Sat</text>
              </svg>
            </div>
            <span className="text-2xl font-bold text-green-600">18,000</span>
            <span className="text-xs text-green-600/70 mt-2">Monday to Saturday</span>
          </div>
        </div>
        {/* Card 6: Daily Sales Graph */}
        <div className="bg-white rounded-md shadow p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-semibold text-pink-500">Daily Sales</span>
          </div>
          <div className="w-full my-2 border-b border-pink-200 opacity-40"></div>
          <div className="flex flex-col items-start mt-2 w-full">
            {/* SVG graph for Monday to Saturday, styled inline with other graphs */}
            <div className="w-full h-24 bg-pink-500 rounded-md flex items-end p-2">
              <svg viewBox="0 0 120 60" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#fff"
                  strokeWidth="4"
                  points="10,40 30,30 50,35 70,20 90,25 110,15"
                />
                {/* Dots for each day */}
                <circle cx="10" cy="40" r="4" fill="#fff" />
                <circle cx="30" cy="30" r="4" fill="#fff" />
                <circle cx="50" cy="35" r="4" fill="#fff" />
                <circle cx="70" cy="20" r="4" fill="#fff" />
                <circle cx="90" cy="25" r="4" fill="#fff" />
                <circle cx="110" cy="15" r="4" fill="#fff" />
                {/* Day labels */}
                <text x="10" y="58" fontSize="8" textAnchor="middle" fill="#fff">Mon</text>
                <text x="30" y="58" fontSize="8" textAnchor="middle" fill="#fff">Tue</text>
                <text x="50" y="58" fontSize="8" textAnchor="middle" fill="#fff">Wed</text>
                <text x="70" y="58" fontSize="8" textAnchor="middle" fill="#fff">Thu</text>
                <text x="90" y="58" fontSize="8" textAnchor="middle" fill="#fff">Fri</text>
                <text x="110" y="58" fontSize="8" textAnchor="middle" fill="#fff">Sat</text>
              </svg>
            </div>
            <span className="text-2xl font-bold text-pink-500">$2,300</span>
            <span className="text-xs text-pink-500/70 mt-2">Monday to Saturday</span>
          </div>
        </div>
        {/* Card 7: Completed Tasks */}
        <div className="bg-white rounded-md shadow p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-semibold text-black">Completed Tasks</span>
          </div>
          <div className="w-full my-2 border-b border-black opacity-40"></div>
          <div className="flex flex-col items-start mt-2 w-full">
            {/* SVG graph for Monday to Saturday */}
            <div className="w-full h-24 bg-black rounded-md flex items-end p-2">
              <svg viewBox="0 0 120 60" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#fff"
                  strokeWidth="4"
                  points="10,30 30,20 50,25 70,10 90,15 110,5"
                />
                {/* Dots for each day */}
                <circle cx="10" cy="30" r="4" fill="#fff" />
                <circle cx="30" cy="20" r="4" fill="#fff" />
                <circle cx="50" cy="25" r="4" fill="#fff" />
                <circle cx="70" cy="10" r="4" fill="#fff" />
                <circle cx="90" cy="15" r="4" fill="#fff" />
                <circle cx="110" cy="5" r="4" fill="#fff" />
                {/* Day labels */}
                <text x="10" y="58" fontSize="8" textAnchor="middle" fill="#fff">Mon</text>
                <text x="30" y="58" fontSize="8" textAnchor="middle" fill="#fff">Tue</text>
                <text x="50" y="58" fontSize="8" textAnchor="middle" fill="#fff">Wed</text>
                <text x="70" y="58" fontSize="8" textAnchor="middle" fill="#fff">Thu</text>
                <text x="90" y="58" fontSize="8" textAnchor="middle" fill="#fff">Fri</text>
                <text x="110" y="58" fontSize="8" textAnchor="middle" fill="#fff">Sat</text>
              </svg>
            </div>
            <span className="text-2xl font-bold text-black">87</span>
            <span className="text-xs text-black/70 mt-2">Monday to Saturday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
