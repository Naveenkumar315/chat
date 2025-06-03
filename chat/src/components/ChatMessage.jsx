// src/components/ChatMessage.jsx
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const ChatMessage = ({ message, sender, isUser }) => {
  return (
    <div className={`flex items-end my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="p-2 bg-gray-300 rounded-full shadow">
          <SmartToyIcon className="text-gray-700" fontSize="small" />
        </div>
      )}

      <div
        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-2xl text-sm shadow ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none ml-2'
            : 'bg-white text-gray-900 rounded-bl-none mr-2'
        }`}
      >
        <p>{message} {!isUser && (
            // <InfoOutlinedIcon
            //   fontSize="inherit"
            //   className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            //   titleAccess="Bot Info"
            // />
             <PersonIcon className="text-blue-600" fontSize="small" />
          )}</p>
        <span className="text-[10px] text-right block mt-1 opacity-60">{sender}</span>
      </div>

      {isUser && (
        <div className="p-2 bg-blue-100 rounded-full shadow">
          <PersonIcon className="text-blue-600" fontSize="small" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
