import React from "react";
import { Link } from "react-router-dom";

import InputField from "../components/InputField/InputField";

const Signup = () => {
  return (
    <main className="h-screen flex items-center justify-center bg-colorPrimary">
      <section className="w-full max-w-[30rem] p-7 bg-colorPrimaryLight rounded-sm">
        <h3 className="text-2xl font-bold mb-8">Sign Up</h3>

        <form className="flex flex-col gap-5 mb-7">
          <InputField
            labelText="Name"
            type="text"
            name="name"
            placeHolder="Your name"
          />
          <InputField
            labelText="Email"
            type="text"
            name="email"
            placeHolder="Your Email"
          />
          <InputField
            labelText="Password"
            type="password"
            name="password"
            placeHolder="Your Password"
          />

          <button type="submit" className="btn-primary w-full text-sm">
            Create an account
          </button>
        </form>

        <div>
          <p className="text-sm font-bold text-colorMediumGray">
            Already have an account?
            <Link className="text-colorpurple ml-2" to="/login">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
