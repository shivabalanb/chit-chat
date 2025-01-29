"use client";

import { signIn } from "next-auth/react";

const page = () => {
  async function loginWithGoogle() {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <p>Login Page#</p>{" "}
      <button onClick={loginWithGoogle}>login w google</button>
    </div>
  );
};

export default page;
