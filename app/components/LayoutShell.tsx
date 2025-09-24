"use client";
import Link from "next/link";
import { MdDashboard, MdPhotoLibrary } from "react-icons/md";
import { FaUsers, FaBoxOpen, FaRegEdit, FaListAlt } from "react-icons/fa";
import React, { useState, createContext, useRef } from "react";

export const SearchContext = createContext<{ search: string; setSearch: (s: string) => void }>({ search: "", setSearch: () => {} });

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string, role?: string } | null>({ name: "Zak", role: "Admin" });
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [logo, setLogo] = useState<string>("/benitech-logo.png");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const handleSignOut = () => {
    setUser(null);
    setProfileOpen(false);
  };
  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(URL.createObjectURL(file));
    }
  }
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <div className="w-full h-screen flex flex-row bg-blu-100">
      {/* Sidebar for all screens */}
      <div className="w-3/12 min-w-[180px] max-w-[260px] h-full p-2 z-0">
        <div className="pt-0 h-full border-1 border-black/50 rounded-md">
          <div className="logo text-center">
            <img className="h-16 w-16 mx-auto mt-3 rounded-full border-2 border-blue-200" src={logo} alt="Benitech Logo" />
            {user?.role === "Admin" && (
              <div className="mt-2 flex flex-col items-center">
                <button
                  className="text-xs px-2 py-1 bg-blue-100 rounded hover:bg-blue-200 mb-1"
                  onClick={() => logoInputRef.current?.click()}
                >
                  Change Logo
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={logoInputRef}
                  style={{ display: "none" }}
                  onChange={handleLogoChange}
                />
              </div>
            )}
            <div className="w-2/3 mx-auto mt-3 border-b border-blue-200 opacity-40"></div>
          </div>
          <div className="menu w-full p-2 mt-3 flex flex-col gap-1">
            <Link href="/" className="bg-white/60 p-3 w-full rounded-md flex items-center gap-3 transition-transform duration-200 hover:scale-105 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words">
              <MdDashboard className="w-6 h-6 mr-2" />
              Dashboard
            </Link>
            <Link href="/users" className="bg-white/60 p-3 w-full rounded-md flex items-center gap-3 transition-transform duration-200 hover:scale-105 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words">
              <FaUsers className="w-6 h-6 mr-2" />
              Users
            </Link>
            <Link href="/galleri" className="bg-white/60 p-3 w-full rounded-md flex items-center gap-3 transition-transform duration-200 hover:scale-105 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words">
              <MdPhotoLibrary className="w-6 h-6 mr-2" />
              Galleri
            </Link>
            <Link href="/products" className="bg-white/60 p-3 w-full rounded-md flex items-center gap-3 transition-transform duration-200 hover:scale-105 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words">
              <FaBoxOpen className="w-6 h-6 mr-2" />
              Products
            </Link>
            <Link href="/posts" className="bg-white/60 p-3 w-full rounded-md flex items-center gap-3 transition-transform duration-200 hover:scale-105 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words">
              <FaRegEdit className="w-6 h-6 mr-2" />
              Post
            </Link>
            <Link href="/orders" className="bg-white/60 p-3 w-full rounded-md flex items-center gap-3 transition-transform duration-200 hover:scale-105 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words">
              <FaListAlt className="w-6 h-6 mr-2" />
              Order List
            </Link>
          </div>
        </div>
      </div>
      {/* Main content area with navbar */}
      <div className="w-full md:w-9/12 h-full p-2">
        <div className="w-full px-4 py-5 bg-white z-50 rounded-md shadow border border-black/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ minHeight: '80px' }}>
          <div className="w-full sm:w-auto max-w-xs flex items-center justify-center mx-auto">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-40 sm:w-56 px-4 py-2 border border-blue-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
            />
          </div>
          <div className="flex items-center gap-4 justify-center sm:justify-end w-full sm:w-auto">
            {!user ? (
              <button className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full shadow hover:bg-blue-300 transition">Sign In</button>
            ) : (
              <div className="relative">
                <button
                  className="w-10 h-10 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center focus:outline-none"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-label="User Profile"
                >
                  <span className="text-blue-700 font-bold">{user.name[0]}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg border border-gray-200 z-50">
                    <button
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100 rounded"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
  {/* Render page content here */}
  {children}
      </div>
    </div>
    </SearchContext.Provider>
  );
}
