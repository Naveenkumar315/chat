import React from "react";
import Data from "../navbar_component/Data";

const SidebarItems = ({tabIndex, setTabIndex, setExpanded}) => {
  return (
    <>
      <div
        className="w-90 bg-[#fff] px-4 my-[1px] py-4 transition-all duration-300"
        style={{
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // right-side shadow
        }}
      >
        <Data setExpanded={setExpanded} tabIndex={tabIndex} setTabIndex={setTabIndex}/>
      </div>
    </>
  );
};

export default SidebarItems;