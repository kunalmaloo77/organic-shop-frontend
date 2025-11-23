import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Header from "../../components/Header/Header";
import instance from "../../utils/axios";
import { formatDate } from "../../utils/utils";

const OrdersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [ordersData, setOrdersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = async () => {
    try {
      const {
        data: {
          data: { orders, totalPages, totalOrders, page },
        },
      } = await instance.get("/admin/orders");
      setOrdersData(orders);
      setTotalPages(totalPages);
      setTotalOrders(totalOrders);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orders = [
    {
      _id: "ORD-2024-1234",
      userId: {
        name: "John Doe",
        email: "john.doe@email.com",
      },
      date: "2025-10-20",
      total: 249.99,
      status: "delivered",
      items: 3,
    },
    {
      _id: "ORD-2024-1235",
      userId: {
        name: "Sarah Smith",
        email: "sarah.smith@email.com",
      },
      date: "2025-10-21",
      total: 189.5,
      status: "processing",
      items: 2,
    },
    {
      _id: "ORD-2024-1236",
      userId: {
        name: "Mike Johnson",
        email: "mike.j@email.com",
      },
      date: "2025-10-21",
      total: 456.0,
      status: "shipped",
      items: 5,
    },
    {
      _id: "ORD-2024-1237",
      userId: {
        name: "Emily Brown",
        email: "emily.b@email.com",
      },
      date: "2025-10-22",
      total: 99.99,
      status: "pending",
      items: 1,
    },
    {
      _id: "ORD-2024-1238",
      userId: {
        name: "David Wilson",
        email: "david.w@email.com",
      },
      date: "2025-10-22",
      total: 329.75,
      status: "delivered",
      items: 4,
    },
    {
      _id: "ORD-2024-1239",
      userId: {
        name: "Lisa Anderson",
        email: "lisa.a@email.com",
      },
      date: "2025-10-22",
      total: 156.2,
      status: "cancelled",
      items: 2,
    },
    {
      _id: "ORD-2024-1240",
      userId: {
        name: "Tom Martinez",
        email: "tom.m@email.com",
      },
      date: "2025-10-22",
      total: 542.3,
      status: "processing",
      items: 6,
    },
    {
      _id: "ORD-2024-1241",
      userId: {
        name: "Anna Taylor",
        email: "anna.t@email.com",
      },
      date: "2025-10-22",
      total: 275.0,
      status: "shipped",
      items: 3,
    },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: Clock,
        label: "Pending",
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: XCircle,
        label: "Failed",
      },
      created: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: Package,
        label: "Created",
      },
      paid: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: Package,
        label: "Paid",
      },
      delivered: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
        label: "Delivered",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: XCircle,
        label: "Cancelled",
      },
    };
    return configs[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Orders</h1>
            <p className="text-gray-600">
              Manage and track all customer orders
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {ordersData.filter((o) => o.status === "pending").length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-blue-600">
                {ordersData.filter((o) => o.status === "paid").length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-bold text-green-600">
                {ordersData.filter((o) => o.status === "delivered").length}
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by order ID, customer name, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ordersData.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-800">
                          {order._id}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {order.userId.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.userId.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-800">
                          {formatDate(order.createdAt) || new Date()}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-semibold text-gray-800">
                          ₹{(order.amount / 100).toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800 transition">
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No orders found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersList;
