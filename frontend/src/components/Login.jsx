import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCurrentUserContext } from "../contexts/currentUserContext";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Login() {
  const { setUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logIn = (data) => {
    axios
      .post(`${VITE_BACKEND_URL}/auth/login`, data)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/myrecipes");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form
      autoComplete="off"
      className="w-80 flex flex-col justify-start"
      onSubmit={handleSubmit(logIn)}
    >
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="text-dark font-primary font-bold text-l mb-2 "
        >
          Email Address
        </label>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <input
          className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-red text-gray font-primary "
          type="text"
          {...register("email", {
            required: true,
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          name="email"
          // defaultValue={user.email}
        />
        {errors.email && (
          <span className="text-red">You must enter a valid email adress</span>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="text-dark font-primary font-bold text-l mb-2 "
        >
          Password
        </label>

        <input
          className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-red text-gray font-primary "
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          aria-invalid={errors.password ? "true" : "false"}
          name="password"
        />
        {errors.password && (
          <span className="text-red">
            Your password must have a minimum of 8 characters
          </span>
        )}
      </div>

      <div className="flex justify-center my-5">
        <input
          className="bg-green font-primary font-bold text-lg text-dark w-24 h-10 mx-10 my-5"
          type="submit"
          value="Log In"
        />
      </div>
    </form>
  );
}
