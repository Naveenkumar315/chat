import { useState, useRef, useEffect } from "react";
import { file } from "../file"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../context/GlobalContext"; // Ensure this path is correct

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const { setIsLoggedIn } = useGlobalContext(); 
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 h-[50px] w-full z-50 bg-white shadow px-4 py-2 flex items-center justify-between">


      <div className="text-2xl font-bold text-blue-600">
        <img src={file.logo} alt="Logo" className="h-8" />
      </div>


      <div className="relative" ref={dropdownRef}>
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
