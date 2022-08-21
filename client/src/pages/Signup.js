import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import InputField from "../components/FormComps/InputField";
import { schemaSignup } from "../utils/yup/schema";
import { signup, resetAuth } from "../redux/features/auth/authSlice";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Success from "../components/Success/Success";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      dispatch(resetAuth());
    }

    if (isSuccess) {
      navigate("/login");
      dispatch(resetAuth());
    }
  }, [isError, isSuccess, message]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });

  const submitForm = (formData) => {
    dispatch(signup(formData));
  };

  return (
    <main className="h-screen flex items-center justify-center bg-colorPrimary">
      <section className="w-full max-w-[30rem] p-7 bg-colorPrimaryLight rounded-sm">
        <h3 className="text-2xl font-bold mb-8">Sign Up</h3>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5 mb-7"
        >
          <InputField
            errors={errors}
            register={register}
            labelText="Name"
            type="text"
            name="name"
            placeHolder="Your name"
          />
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
            {isLoading ? <LoadingSpinner /> : "Create an account"}
            {/* {isSuccess && <Success />} */}
            {/* {!isLoading && !isSuccess && "Create an account"} */}
          </button>
        </form>

        <div className="flex justify-center">
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
