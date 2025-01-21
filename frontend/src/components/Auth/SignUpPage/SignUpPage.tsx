import { SignUp } from "@clerk/clerk-react";
import "../Auth.scss";

const SignUpPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center authContainer">
      <SignUp forceRedirectUrl="/register" />
    </div>
  );
};

export default SignUpPage;
