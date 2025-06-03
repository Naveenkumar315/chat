import { useState, useRef, useEffect } from "react";
import { file } from "../file"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    // sessionStorage.removeItem("isLoggedIn");
    // setDropdownOpen(false);
    // setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow px-6 py-3 flex items-center justify-between">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img src={file.logo} alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Right Side: Chat + Logout */}
      <div className="flex items-center space-x-6">
        <div className="text-lg font-semibold text-gray-800">Chat</div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
