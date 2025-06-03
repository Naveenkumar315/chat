import { useState, useRef, useEffect } from "react";
import { file } from "../file"; // Ensure this path is correct
// import { useGlobalContext } from "../context/GlobalContext"; // Ensure this path is correct

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const { setIsLoggedIn } = useGlobalContext(); 
  const dropdownRef = useRef();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // const handleLogout = () => {
  //   sessionStorage.removeItem("isLoggedIn");
  //   setDropdownOpen(false);
  //   setIsLoggedIn(false)
  // };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow px-4 py-2 flex items-center justify-between">


      <div className="text-2xl font-bold text-blue-600">
        <img src={file.logo} alt="Logo" className="h-8" />
      </div>


      {/* <div className="relative" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen((prev) => !prev)}>
          <UserAvatarFilledAlt size={32} className="text-gray-700 cursor-pointer" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white  rounded shadow-md z-99">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div> */}
    </header>
  );
};

export default Header;
