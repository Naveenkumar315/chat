// src/components/ChatMessage.jsx
import * as React from "react";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

import ModalComponent from "./ModalComponent";

const ChatMessage = ({ index, message, sender, isUser, timing, sources }) => {
  
  const [open, setOpen] = React.useState(false);
  const handleIconClick = () => setOpen(true);
  return (
    <div
      className={`flex items-end my-2 ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      {!isUser && (
        <div className="p-2 bg-gray-300 rounded-full shadow">
          <SmartToyIcon className="text-gray-700" fontSize="small" />
        </div>
      )}

      <div
        className={`max-w-xs mx-2 sm:max-w-md px-4 py-2 rounded-2xl text-sm shadow ${isUser
            ? "bg-blue-500 text-white rounded-br-none ml-2"
            : "bg-white text-gray-900 rounded-bl-none mr-2"
          }`}
      >
        <p>
          {message}{" "}
          {(!isUser && index !== 0) && (
            <Tooltip
              // title={sources || "NA"}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "blue.600",
                    color: "white",
                    fontSize: 12,
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                  },
                },
              }}
            >
              <InfoOutlinedIcon
                fontSize="small"
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={handleIconClick}
              />
            </Tooltip>
          )}
        </p>
        <span className="text-[10px] text-right block mt-1 opacity-60">
          {sender}
        </span>
      </div>

      {isUser && (
        <div className="p-2 bg-blue-100 rounded-full shadow">
          <PersonIcon className="text-blue-600" fontSize="small" />
        </div>
      )}

      {open && <ModalComponent sources={sources} timing={timing} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default ChatMessage;
