import { SignedIn } from "@clerk/clerk-react";
import Fridge from "../Fridge/Fridge";

const MyFridgeComponent = () => {
  return (
    <section className="fridge">
      <SignedIn>
          <Fridge />
      </SignedIn>
    </section>
  );
};

export default MyFridgeComponent;
