import { useEffect, useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const SSOCallback = () => {
  const navigate = useNavigate();
  const { isLoaded: signInLoaded } = useSignIn();
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    const handleSSOCallback = async () => {
      if (!signInLoaded) return;
      navigate("/signin");
      setRemoveLoading(true);
    };
    handleSSOCallback();
  });
  return <div>{!removeLoading && <Loading />}</div>;
};

export default SSOCallback;
