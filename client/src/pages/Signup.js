import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import logoMob from "../assets/logo-mobile.svg";

import InputField from "../components/FormComps/InputField";
import { schemaSignup } from "../utils/yup/schema";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Error from "../components/Error/Error";
import { useSignUp } from "../hooks/api/auth/useAuth";

const Signup = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess, isLoading, error, isError } = useSignUp();

  useEffect(() => {
    if (isError) {
    }

    if (isSuccess) {
      navigate("/login");
    }
  }, [isError, isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });

  const submitForm = (formData) => {
    mutate(formData);
  };

  return (
    <main className="h-screen flex flex-col gap-8 items-center justify-center bg-colorPrimary">
      <img src={logoMob} alt="" />

      <section className="w-full max-w-[30rem] p-7 bg-colorPrimaryLight rounded-lg mx-4">
        <h3 className="text-2xl md:text-xl font-bold mb-8">Sign Up</h3>

        {isError && <Error message={error.response.data.message} />}
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
