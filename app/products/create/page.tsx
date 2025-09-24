"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductCreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", price: "", currency: "USD" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Product created (demo only)");
  setForm({ name: "", description: "", price: "", currency: "USD" });
      setFile(null);
      setPreview(null);
      setTimeout(() => router.push("/products"), 1000);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form className="bg-white rounded shadow p-6" onSubmit={handleSubmit}>
        {message && (
          <div className="mb-4 text-center text-green-600 text-sm font-medium">{message}</div>
        )}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-stretch w-full">
          <div className="flex flex-col items-center gap-2 min-w-[120px] sm:min-w-[140px] flex-shrink-0 mb-4 sm:mb-0">
            {preview ? (
              <img src={preview} alt="Preview" className="w-28 h-28 sm:w-32 sm:h-32 rounded-md object-cover border-4 border-blue-200" />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-md border-4 border-blue-200 flex items-center justify-center bg-gray-100 text-gray-500 text-center text-sm font-medium">
                Product Photo
              </div>
            )}
            <button
              type="button"
              className="mt-2 bg-blue-600 text-white rounded-md px-4 py-2 shadow hover:bg-blue-700"
              onClick={() => inputRef.current?.click()}
            >
              Upload Photo
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex-1 grid grid-cols-1 gap-4 w-full">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={2}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="w-full sm:w-auto border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                  <option value="JPY">JPY</option>
                  <option value="CNY">CNY</option>
                  <option value="SEK">SEK (kr)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
