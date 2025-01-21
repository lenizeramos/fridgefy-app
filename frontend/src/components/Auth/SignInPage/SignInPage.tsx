import { SignIn } from "@clerk/clerk-react";
import "../Auth.scss";

const SignInPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center authContainer">
      <SignIn path="/signin" routing="path" forceRedirectUrl="/register" />
    </div>
  );
};

export default SignInPage;
