import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
} from "lucide-react";
import Header from "../../components/Header/Header";
import instance from "../../utils/axios";

const Dashboard = () => {
  const [salesPeriod, setSalesPeriod] = useState("monthly");
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    sales: {
      weekly: 0,
      monthly: 0,
      yearly: 0,
    },
  });
  useEffect(() => {
    getStatsData();
  }, []);

  const getStatsData = async () => {
    try {
      const {
        data: {
          data: { statsData },
        },
      } = await instance.get("/admin/stats");
      setStats(statsData);
    } catch (error) {
      console.error("failed to load stats", error);
    }
  };

  const topProducts = [
    { name: "Wireless Headphones", sales: 342, revenue: 34200 },
    { name: "Smart Watch", sales: 298, revenue: 59600 },
    { name: "Laptop Stand", sales: 267, revenue: 13350 },
    { name: "USB-C Cable", sales: 245, revenue: 4900 },
    { name: "Phone Case", sales: 223, revenue: 6690 },
  ];

  const StatCard = ({ icon: Icon, title, value, bgColor, iconColor }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
      <div className={`${bgColor} p-3 rounded-lg`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className=" bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={UserCheck}
              title="Active Users"
              value={stats.activeUsers}
              bgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              icon={ShoppingCart}
              title="Total Orders"
              value={stats.totalOrders}
              bgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <StatCard
              icon={DollarSign}
              title="Avg Order Value"
              value={`$${stats.avgOrderValue}`}
              bgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Sales Overview
                </h2>
                <select
                  value={salesPeriod}
                  onChange={(e) => setSalesPeriod(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="text-center py-8">
                <p className="text-4xl font-bold text-gray-800">
                  ₹{stats.sales[salesPeriod].toLocaleString()}
                </p>
                <p className="text-gray-500 mt-2 capitalize">
                  {salesPeriod} Revenue
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Weekly</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ₹{(stats.sales.weekly / 1000).toFixed(1)}K
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Monthly</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ${(stats.sales.monthly / 1000).toFixed(1)}K
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Yearly</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ${(stats.sales.yearly / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>
            </div>

            {/* Top Products Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                Most Bought Products
              </h2>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.sales} sales
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${product.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
