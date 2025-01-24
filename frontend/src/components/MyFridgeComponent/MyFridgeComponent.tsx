import { SignedIn } from "@clerk/clerk-react";
import { FridgeProvider } from "../../context/FridgeContext";
import Fridge from "../Fridge/Fridge";

const MyFridgeComponent = () => {
  return (
    <section className="fridge">
      <SignedIn>
        <FridgeProvider>
          <Fridge />
        </FridgeProvider>
      </SignedIn>
    </section>
  );
};

export default MyFridgeComponent;
