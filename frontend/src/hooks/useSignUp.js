import { useState } from "react";
import toast from "react-hot-toast";
import trimValuesReducer from "../utils/trimValuesReducer";
import { useAuthContext } from "../../context/authContext";


const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signUp = async (inputs) => {
    const trimmedInputs = trimValuesReducer(inputs);
    const isInputsValid = handleInputErrors(trimmedInputs);

    if (!isInputsValid) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedInputs)
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
    isLoading,
    signUp
  }
}

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords must match");
    return false;
  }

  if (password.length < 3) {
    toast.error("Password must be at least 3 characters");
    return false;
  }

  return true;
}

export default useSignUp