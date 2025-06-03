import Button from "../components/Button";
import { file } from "../file";
import { useGlobalContext } from "../context/GlobalContext";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();

  const handleLogin = () => {
    sessionStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md min-h-[300px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <img src={file.logo} alt="Logo" className="h-12 mb-2" />
          <h2 className="text-2xl font-bold mt-10 text-gray-800 text-center">
            Agentic AI Underwriter
          </h2>
        </div>
        <Button
          className="w-full py-2 px-4 rounded-lg transition"
          variant="primary"
          children={"Start"}
          onClick={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;
