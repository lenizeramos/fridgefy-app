import "./App.scss";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <>
      <h1>hello</h1>

      {/* will be deleted soon*/}
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {/* will be deleted soon*/}
    </>
  );
}

export default App;
