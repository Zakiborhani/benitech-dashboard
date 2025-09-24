
"use client";
import React, { useRef, useState } from "react";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", description: "High performance laptop", price: 1200, imageUrl: null },
    { id: 2, name: "Smartphone", description: "Latest model smartphone", price: 800, imageUrl: null },
    { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: 150, imageUrl: null },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", price: "", imageUrl: "" });
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = () => {
    window.location.href = "/products/create";
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ name: "", description: "", price: "" });
    setFile(null);
    setPreview(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        imageUrl: preview,
      },
    ]);
    handleCloseModal();
  };

  // Edit logic
  const handleProductClick = (index: number) => {
    const p = products[index];
    setEditIndex(index);
    setEditForm({
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      imageUrl: p.imageUrl || ""
    });
    setEditPreview(p.imageUrl || null);
    setEditFile(null);
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditFile(e.target.files[0]);
      setEditPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex === null) return;
    const updated = [...products];
    updated[editIndex] = {
      ...updated[editIndex],
      name: editForm.name,
      description: editForm.description,
      price: parseFloat(editForm.price),
      imageUrl: editPreview,
    };
    setProducts(updated);
    setEditIndex(null);
    setEditForm({ name: "", description: "", price: "", imageUrl: "" });
    setEditFile(null);
    setEditPreview(null);
  };
  const handleEditClose = () => {
    setEditIndex(null);
    setEditForm({ name: "", description: "", price: "", imageUrl: "" });
    setEditFile(null);
    setEditPreview(null);
  };

  return (
    <div className="w-full mt-6">
      <div className="bg-white rounded-md shadow p-4 sm:p-8 w-full transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Add Product"
            onClick={handleOpenModal}
          >
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={product.id} className="bg-gray-100 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform duration-200 cursor-pointer flex flex-col items-center p-4" onClick={() => handleProductClick(i)}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-400 rounded-md mb-3">
                  <span className="text-4xl">📦</span>
                </div>
              )}
              <div className="text-lg font-bold text-gray-800 mb-1 w-full text-center break-words">{product.name}</div>
              <div className="text-gray-600 text-sm w-full text-center break-words">{product.description}</div>
              <div className="text-blue-700 text-base font-semibold w-full text-center mt-1">${product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        {/* Modal Popup for Adding Product */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transition-all duration-300">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">Add Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md border-2 border-blue-200" />
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center bg-gray-200 text-gray-400 rounded-md border-2 border-blue-200">
                      <span className="text-4xl">📦</span>
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
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transition-all duration-300">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={handleEditClose}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  {editPreview ? (
                    <img src={editPreview} alt="Preview" className="w-32 h-32 object-cover rounded-md border-2 border-blue-200" />
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center bg-gray-200 text-gray-400 rounded-md border-2 border-blue-200">
                      <span className="text-4xl">📦</span>
                    </div>
                  )}
                  <button
                    type="button"
                    className="mt-2 bg-blue-600 text-white rounded-md px-4 py-2 shadow hover:bg-blue-700"
                    onClick={() => editInputRef.current?.click()}
                  >
                    Change Photo
                  </button>
                  <input
                    ref={editInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleEditFileChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    required
                    rows={2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
