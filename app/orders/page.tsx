import Link from "next/link";

const mockOrders = [
  { id: 1, customer: "Alice", total: 120.5, status: "Pending", date: "2025-09-20" },
  { id: 2, customer: "Bob", total: 89.99, status: "Shipped", date: "2025-09-21" },
  { id: 3, customer: "Charlie", total: 45.0, status: "Delivered", date: "2025-09-22" },
];

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Order List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-left">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 border-b">Order #</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-blue-50 transition-transform duration-200 transform hover:scale-[1.025] cursor-pointer"
              >
                <td className="py-2 px-4 border-b">
                  <Link href={`/orders/${order.id}`}
                    className="text-blue-700 hover:underline cursor-pointer"
                  >
                    {order.id}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">{order.customer}</td>
                <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
