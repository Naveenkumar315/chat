import React, { useState } from "react";
import {
  Home,
  UserAvatarFilledAlt,
  Settings,
  Logout,
  ChevronRight,
  ChevronLeft,
  WatsonxGovernance,
} from "@carbon/icons-react";
import SidebarItems from "./SidebarItems";
import Dashboard from "../Dashboard";
import { useGlobalContext } from "../context/GlobalContext";
// import Tooltip from '@mui/material/Tooltip';

const Nav = () => {
  const [expanded, setExpanded] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const { activeIndex, setActiveIndex, setIsLoggedIn } = useGlobalContext();

  const menuItems = [
    { label: "Data", icon: Home },
    // { label: "Profile", icon: WatsonxGovernance },
    { label: "Settings", icon: Settings },
    { label: "Logout", icon: Logout },
  ];

  const handleMenuClick = (idx) => {
    setActiveIndex(idx);
    // setIsLoggedIn(false);

  };

  return (
    <div className="flex h-full w-full mt-0.5">
      {/* Left Fixed Icon Bar */}
      <div className="w-16 bg-[#176C9A] text-white flex flex-col items-center py-4 space-y-4">
        {/* <Tooltip title={"Toggle"} placement="right" arrow > */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="focus:outline-none"
          title="Toggle"
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        {/* </Tooltip> */}

        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeIndex === idx;

          return (
            <div
              onClick={() => handleMenuClick(idx)}
              className={`w-12 h-10 flex items-center justify-center rounded-md cursor-pointer ${
                isActive ? "bg-white" : ""
              }`}
              key={idx}
            >
              <Icon
                size={25}
                className={`my-1 transition-colors ${
                  isActive ? "text-[#176C9A]" : "text-white"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Right Expandable Panel */}
      {expanded && <SidebarItems setExpanded={setExpanded} setTabIndex={setTabIndex} tabIndex={tabIndex} />}
      <div className="flex-1 overflow-auto">
        <Dashboard setTabIndex={setTabIndex} tabIndex={tabIndex}/>
      </div>
    </div>
  );
};

export default Nav;
