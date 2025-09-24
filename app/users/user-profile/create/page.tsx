"use client";
import React, { useRef, useState } from "react";

export default function UserCreate() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("role", form.role);
      formData.append("password", form.password);
      if (file) {
        formData.append("profilePic", file);
      }
      const res = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("User created successfully!");
        setForm({ name: "", email: "", phone: "", role: "", password: "", confirmPassword: "" });
        setProfilePic(null);
        setFile(null);
      } else {
        const data = await res.json().catch(() => ({}));
        setMessage(data.message || "Failed to create user.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create User</h1>
      <form className="bg-white rounded shadow p-6" onSubmit={handleSubmit}>
        {message && (
          <div className={`mb-4 text-center text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-stretch w-full">
          {/* Profile Picture on the left */}
          <div className="flex flex-col items-center gap-2 min-w-[120px] sm:min-w-[140px] flex-shrink-0 mb-4 sm:mb-0">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-200"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-blue-200 flex items-center justify-center bg-gray-100 text-gray-500 text-center text-sm font-medium">
                Profile Preview
              </div>
            )}
            <button
              type="button"
              className="mt-2 bg-blue-600 text-white rounded-md px-4 py-2 shadow hover:bg-blue-700"
              onClick={() => inputRef.current?.click()}
            >
              Change
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {/* Form fields on the right */}
          <div className="flex-1 grid grid-cols-1 gap-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Editor">Editor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
