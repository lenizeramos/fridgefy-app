import {
    SignInButton,
    SignedOut,
    UserButton,
    SignedIn,
  } from "@clerk/clerk-react";

const Dashboard = () => {
  return (
    <> {/* will be deleted soon*/}
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
    {/* will be deleted soon*/}</>
  )
}

export default Dashboard