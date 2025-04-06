import {
  User,
  Package,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const handleOrdersRedirect = () => {
    navigate("/orders");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {formatDate(user.createdAt)}
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Orders Card Button */}
            <div
              onClick={handleOrdersRedirect}
              className="bg-white rounded-lg shadow p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Package className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Orders</h3>
                <p className="text-sm text-gray-600">
                  Track, return, or buy again
                </p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>

            {/* Wishlist Card */}
            <div className="bg-white rounded-lg shadow p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <Heart className="text-red-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Wishlist</h3>
                <p className="text-sm text-gray-600">Items you've saved</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>

            {/* Payment Methods Card */}
            <div className="bg-white rounded-lg shadow p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <CreditCard className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Payment Methods</h3>
                <p className="text-sm text-gray-600">Manage your cards</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow mb-6">
            <h3 className="font-semibold text-lg p-4 border-b">
              Account Settings
            </h3>

            <div className="divide-y">
              {/* Personal Info */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <User className="mr-3 text-gray-500" size={20} />
                  <span>Personal Information</span>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>

              {/* Notifications */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <Bell className="mr-3 text-gray-500" size={20} />
                  <span>Notifications</span>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>

              {/* Settings */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <Settings className="mr-3 text-gray-500" size={20} />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>

              {/* Logout */}
              <div
                className="p-4 flex items-center text-red-600 hover:bg-gray-50 cursor-pointer"
                onClick={() => dispatch(logoutUser())}
              >
                <LogOut className="mr-3" size={20} />
                <span>Log Out</span>
              </div>
            </div>
          </div>

          {/* Recently Viewed */}
          {/* <div className="bg-white rounded-lg shadow">
            <h3 className="font-semibold text-lg p-4 border-b">
              Recently Viewed Items
            </h3>

            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center cursor-pointer">
                  <div className="bg-gray-100 rounded mb-2 aspect-square flex items-center justify-center">
                    <img
                      src={`/api/placeholder/150/150`}
                      alt={`Product ${item}`}
                      className="max-h-full"
                    />
                  </div>
                  <p className="text-sm font-medium truncate">Product Name</p>
                  <p className="text-sm text-blue-600">$29.99</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
