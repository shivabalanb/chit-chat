"use client";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={async () => {
        try {
          await signOut();
        } catch (error) {
          console.log("There was problem signing out", error);
        }
      }}
    >
      sign out
    </button>
  );
};
export default SignOutButton;
