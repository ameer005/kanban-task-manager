import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../components/FormComps/InputField";
import { schemaLogin } from "../utils/yup/schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const submitForm = (formData) => {
    console.log(formData);
  };

  return (
    <main className="h-screen flex items-center justify-center bg-colorPrimary">
      <section className="w-full max-w-[30rem] p-7 bg-colorPrimaryLight rounded-sm">
        <h3 className="text-2xl font-bold mb-8">Login</h3>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5 mb-7"
        >
          <InputField
            errors={errors}
            register={register}
            labelText="Email"
            type="text"
            name="email"
            placeHolder="Your Email"
          />
          <InputField
            errors={errors}
            register={register}
            labelText="Password"
            type="password"
            name="password"
            placeHolder="Your Password"
          />

          <button type="submit" className="btn-primary w-full text-sm">
            Login to your account
          </button>
        </form>

        <div className="flex justify-center">
          <p className="text-sm font-bold text-colorMediumGray">
            Don't have an account?
            <Link className="text-colorpurple ml-2" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
