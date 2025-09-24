"use client";
import { useState, useRef } from "react";
import { FaUpload, FaTrash, FaEdit } from "react-icons/fa";

export default function GalleriPage() {
  const [showModal, setShowModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [uploaded, setUploaded] = useState<Array<{ url: string; name: string; desc: string }>>([]);
  const [samples, setSamples] = useState<Array<{ url: string; name: string }>>(
    [1,2,3,4,5,6,7,8].map(i => ({
      url: `https://picsum.photos/300/200?random=${i}`,
      name: `Image ${i}`
    }))
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editType, setEditType] = useState<'uploaded' | 'sample' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFile(null);
    setName("");
    setDesc("");
    setDragActive(false);
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleChangeFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const url = URL.createObjectURL(file);
      setUploaded([
        ...uploaded,
        { url, name, desc }
      ]);
    }
    handleCloseModal();
  };

  const handleDelete = (index: number) => {
    setUploaded(uploaded.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number, type: 'uploaded' | 'sample') => {
    setEditIndex(index);
    setEditType(type);
    if (type === 'uploaded') {
      setEditName(uploaded[index].name);
      setEditDesc(uploaded[index].desc);
    } else {
      setEditName(samples[index].name);
      setEditDesc(samples[index].desc || "");
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null && editType) {
      if (editType === 'uploaded') {
        const updated = [...uploaded];
        updated[editIndex] = {
          ...updated[editIndex],
          name: editName,
          desc: editDesc,
        };
        setUploaded(updated);
      } else {
        const updated = [...samples];
        updated[editIndex] = {
          ...updated[editIndex],
          name: editName,
          desc: editDesc,
        };
        setSamples(updated);
      }
      setEditIndex(null);
      setEditType(null);
      setEditName("");
      setEditDesc("");
    }
  };

  const handleEditClose = () => {
    setEditIndex(null);
    setEditType(null);
    setEditName("");
    setEditDesc("");
  };
  return (
    <div className="w-full mt-6">
      <div className="bg-white rounded-md shadow p-4 sm:p-8 w-full transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Galleri</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Upload Image"
            onClick={handleOpenModal}
          >
            <FaUpload className="h-5 w-5" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Uploaded images */}
          {uploaded.map((img, i) => (
            <div key={img.url} className="bg-gray-100 rounded-lg overflow-hidden shadow hover:scale-110 transition-transform duration-200 cursor-pointer relative">
              <img src={img.url} alt={img.name} className="w-full h-48 object-cover" />
              <div className="p-2 text-center text-gray-700 text-sm font-bold">{img.name}</div>
              <div className="px-2 pb-2 text-center text-gray-500 text-xs">{img.desc}</div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="bg-white rounded-full p-2 shadow hover:bg-blue-100"
                  aria-label="Edit"
                  onClick={() => handleEdit(i, 'uploaded')}
                >
                  <FaEdit className="h-4 w-4 text-blue-600" />
                </button>
                <button
                  className="bg-white rounded-full p-2 shadow hover:bg-red-100"
                  aria-label="Delete"
                  onClick={() => handleDelete(i)}
                >
                  <FaTrash className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
          {samples.map((img, i) => (
            <div key={img.url} className="bg-gray-100 rounded-lg overflow-hidden shadow hover:scale-110 transition-transform duration-200 cursor-pointer relative">
              <img src={img.url} alt={img.name} className="w-full h-48 object-cover" />
              <div className="p-2 text-center text-gray-700 text-sm font-bold">{img.name}</div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="bg-white rounded-full p-2 shadow hover:bg-blue-100"
                  aria-label="Edit"
                  onClick={() => handleEdit(i, 'sample')}
                >
                  <FaEdit className="h-4 w-4 text-blue-600" />
                </button>
                <button
                  className="bg-white rounded-full p-2 shadow hover:bg-red-100"
                  aria-label="Delete"
                  onClick={() => setSamples(samples.filter((_, idx) => idx !== i))}
                >
                  <FaTrash className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        {/* Edit Modal */}
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
              <h2 className="text-xl font-bold mb-4">Edit Image Info</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    rows={2}
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
          {/* Example gallery images, replace with your own */}
        </div>
        {/* Modal Popup for Upload */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-80">
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
              <h2 className="text-xl font-bold mb-4">Upload Image or Video</h2>
              <form onSubmit={handleSubmit} className="space-y-4" onDragEnter={handleDrag}>
                <div
                  className={`w-full h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
                  onClick={() => inputRef.current && inputRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                >
                  <FaUpload className="h-8 w-8 text-blue-400 mb-2" />
                  <span className="text-gray-600">Drag & drop image or video here, or click to select</span>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleChangeFile}
                  />
                  {file && <span className="mt-2 text-blue-600 font-medium">{file.name}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
                  >
                    Upload
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
