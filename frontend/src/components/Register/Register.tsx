import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Register = () => {
  const navigate = useNavigate();
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/register", {
          credentials: "include",
        });

        if (response.ok) {
          navigate("/recipes");
          setRemoveLoading(true)
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div>
      {!removeLoading && <Loading />}
    </div>
  );
};

export default Register;
