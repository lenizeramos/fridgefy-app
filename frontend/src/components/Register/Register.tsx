import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/register", {
          credentials: "include",
        });

        if (response.ok) {
          navigate("/dashboard");
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUser();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Register;
