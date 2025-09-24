
"use client";
import { useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { SearchContext } from "../components/LayoutShell";

export default function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "234-567-8901", role: "User" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "345-678-9012", role: "Editor" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", phone: "456-789-0123", role: "User" },
  ]);
  const { search } = useContext(SearchContext);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });
  const handleOpenModal = () => {
    router.push("/users/user-profile/create");
  };
  const handleCloseModal = () => {
    setShowModal(false);
  setForm({ name: "", email: "", phone: "", role: "" });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: users.length + 1,
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
      },
    ]);
    handleCloseModal();
  };
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full mt-6">
      <div className="bg-white rounded-md shadow p-4 sm:p-8 w-full transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">User List</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Add New User"
            onClick={handleOpenModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.id}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700 hover:underline cursor-pointer" onClick={() => router.push(`/users/user-profile/${user.id}`)}>
                    {user.name}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.phone}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal Popup for Adding User */}
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
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
      </div>
    </div>
  );
}
