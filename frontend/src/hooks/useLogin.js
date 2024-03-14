import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/authContext";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    const isInputsValid = handleInputErrors(username, password);
    if (!isInputsValid) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("mern-chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return {
    isLoading, login
  }
}

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 3) {
    toast.error("Password must be at least 3 characters");
    return false;
  }

  return true;
}

export default useLogin;