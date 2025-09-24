// app/orders/[id]/page.tsx
import Link from "next/link";

// Mock order and user data
const mockOrders = [
  { id: 1, customer: "Alice", total: 120.5, status: "Pending", date: "2025-09-20", address: "123 Main St, Stockholm", email: "alice@email.com", phone: "+46 70 123 45 67", items: [
    { name: "Product A", qty: 2, price: 40 },
    { name: "Product B", qty: 1, price: 40.5 },
  ] },
  { id: 2, customer: "Bob", total: 89.99, status: "Shipped", date: "2025-09-21", address: "456 Elm St, Gothenburg", email: "bob@email.com", phone: "+46 70 987 65 43", items: [
    { name: "Product C", qty: 1, price: 89.99 },
  ] },
  { id: 3, customer: "Charlie", total: 45.0, status: "Delivered", date: "2025-09-22", address: "789 Oak St, Malmö", email: "charlie@email.com", phone: "+46 70 555 55 55", items: [
    { name: "Product D", qty: 3, price: 15 },
  ] },
];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = mockOrders.find((o) => o.id === Number(params.id));
  if (!order) return <div className="p-10 text-center">Order not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
      <div className="mb-4">
        <div className="mb-2"><span className="font-semibold">Customer:</span> {order.customer}</div>
        <div className="mb-2"><span className="font-semibold">Email:</span> {order.email}</div>
        <div className="mb-2"><span className="font-semibold">Phone:</span> {order.phone}</div>
        <div className="mb-2"><span className="font-semibold">Address:</span> {order.address}</div>
        <div className="mb-2"><span className="font-semibold">Order Date:</span> {order.date}</div>
        <div className="mb-2"><span className="font-semibold">Status:</span> {order.status}</div>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Items</h2>
        <table className="min-w-full border text-left mb-2">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-1 px-2 border-b">Product</th>
              <th className="py-1 px-2 border-b">Qty</th>
              <th className="py-1 px-2 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-1 px-2 border-b">{item.name}</td>
                <td className="py-1 px-2 border-b">{item.qty}</td>
                <td className="py-1 px-2 border-b">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right font-bold">Total: ${order.total.toFixed(2)}</div>
      </div>
      <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition mb-4">Send Order</button>
      <Link href="/orders">
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 ml-2">Back to Orders</button>
      </Link>
    </div>
  );
}
