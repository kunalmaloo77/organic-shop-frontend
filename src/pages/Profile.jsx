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
          <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-lg">{user.email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Member since {formatDate(user.createdAt)}
                </p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Orders Card Button */}
            <button
              onClick={handleOrdersRedirect}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="bg-blue-50 p-4 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors">
                <Package className="text-blue-600" size={24} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">Orders</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Track, return, or buy again
                </p>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>

            {/* Wishlist Card */}
            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center cursor-pointer hover:shadow-md hover:border-red-200 transition-all duration-200 group">
              <div className="bg-red-50 p-4 rounded-xl mr-4 group-hover:bg-red-100 transition-colors">
                <Heart className="text-red-600" size={24} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">Wishlist</h3>
                <p className="text-sm text-gray-600 mt-1">Items you've saved</p>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>

            {/* Payment Methods Card */}
            <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center cursor-pointer hover:shadow-md hover:border-green-200 transition-all duration-200 group">
              <div className="bg-green-50 p-4 rounded-xl mr-4 group-hover:bg-green-100 transition-colors">
                <CreditCard className="text-green-600" size={24} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">Payment Methods</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your cards</p>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <h3 className="font-semibold text-xl p-6 border-b border-gray-100 text-gray-800">
              Account Settings
            </h3>

            <div className="divide-y divide-gray-100">
              {/* Personal Info */}
              <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="flex items-center">
                  <User
                    className="mr-4 text-gray-500 group-hover:text-gray-700 transition-colors"
                    size={20}
                  />
                  <span className="font-medium text-gray-800">
                    Personal Information
                  </span>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>

              {/* Notifications */}
              <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="flex items-center">
                  <Bell
                    className="mr-4 text-gray-500 group-hover:text-gray-700 transition-colors"
                    size={20}
                  />
                  <span className="font-medium text-gray-800">
                    Notifications
                  </span>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>

              {/* Settings */}
              <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="flex items-center">
                  <Settings
                    className="mr-4 text-gray-500 group-hover:text-gray-700 transition-colors"
                    size={20}
                  />
                  <span className="font-medium text-gray-800">
                    Privacy & Security
                  </span>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>

              {/* Logout - Now properly sized and styled */}
              <button
                className="w-full p-6 flex items-center text-red-600 hover:bg-red-50 cursor-pointer transition-colors group border-t border-gray-100"
                onClick={() => dispatch(logoutUser())}
              >
                <LogOut
                  className="mr-4 group-hover:text-red-700 transition-colors"
                  size={20}
                />
                <span className="font-medium group-hover:text-red-700 transition-colors">
                  Log Out
                </span>
              </button>
            </div>
          </div>

          {/* Recently Viewed */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-xl p-6 border-b border-gray-100 text-gray-800">
              Recently Viewed Items
            </h3>

            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center cursor-pointer group">
                  <div className="bg-gray-100 rounded-xl mb-3 aspect-square flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                      <Package className="text-gray-600" size={32} />
                    </div>
                  </div>
                  <p className="text-sm font-medium truncate text-gray-800 group-hover:text-blue-600 transition-colors">
                    Product Name {item}
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">$29.99</p>
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
