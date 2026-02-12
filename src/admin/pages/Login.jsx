import React from "react";
import bg from "../../../public/bg4.png";
import img from "../../../public/img.png";
import logo from "../../../public/aditi.png";
import { Icon } from "@iconify/react";
import { useLoginApiMutation } from "../../Redux/Apis/auth.Api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const [login, { isLoading }] = useLoginApiMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
        phone: data.phone,
      }).unwrap();

      alert("✅ Login Successful!");
      console.log("Login Success:", res);


      navigate("/");

    } catch (err) {
      alert("❌ Login Failed!");
      console.error("Login Failed:", err);
    }
  };



  return (
    <div
      className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-10 lg:px-24"
      style={{
        backgroundImage: "url(/bg4.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2.5px]" />

      {/* ---------------- LEFT LOGIN CARD ---------------- */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          relative z-10
          w-full max-w-[450px]
          h-[480px]
          backdrop-blur-xl
          bg-white/2
          border border-white/20
          rounded-2xl
          p-10
          text-white
        "
      >
        <div className="flex justify-center mb-16">
          <img src={logo} alt="Aditi Logo" className="h-16 object-contain" />
        </div>

        <div className="space-y-6">
          {/* NAME */}
          <div className="flex items-center gap-3 border-b border-white/50 py-2">
            <Icon icon="solar:user-broken" width={22} height={22} />

            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="
                w-full bg-transparent outline-none
                text-[15px] text-[#D9D9D96B]
                placeholder:text-[#D9D9D96B]
              "
            />
          </div>

          {/* MOBILE */}
          <div className="flex items-center gap-3 border-b border-white/50 py-2">
            <RiLockPasswordLine width={22} height={22} />
            {/* <Icon icon="fluent:call-28-regular" width={22} height={22} /> */}

            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="
    w-full bg-transparent outline-none
    text-[15px] text-[#D9D9D96B]
    placeholder:text-[#D9D9D96B]
  "
            />

          </div>
          {/* PHONE */}
          {/* <div className="flex items-center gap-3 border-b border-white/50 py-2">
            <Icon icon="fluent:call-28-regular" width={22} height={22} />

            <input
              type="text"
              placeholder="Enter phone number"
              {...register("phone", {
                required: "Phone is required",
              })}
              className="
      w-full bg-transparent outline-none
      text-[15px] text-[#D9D9D96B]
      placeholder:text-[#D9D9D96B]
    "
            />
          </div> */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-[170px] h-[51px]
              mt-20 lg:mt-28
              mx-auto lg:ml-20
              rounded-[37px]
              bg-white/10
              text-white font-medium
              flex items-center justify-center
              shadow-[inset_0px_0px_4px_#3096E0]
            "
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
        </div>
      </form>

      {/* ---------------- RIGHT IMAGE ---------------- */}
      <div className="relative z-10 hidden lg:block">
        <img src={img} alt="Perfume" className="max-h-[500px] object-contain" />
      </div>
    </div>
  );
};

export default Login;
