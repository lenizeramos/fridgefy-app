import { useEffect } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SSOCallback = () => {
  const navigate = useNavigate();
  const { isLoaded: signInLoaded } = useSignIn();

  useEffect(() => {
    const handleSSOCallback = async () => {
      if (!signInLoaded) return;
      navigate("/login");
    };
    handleSSOCallback();
  });
  return <div>Loading...</div>;
};

export default SSOCallback;
