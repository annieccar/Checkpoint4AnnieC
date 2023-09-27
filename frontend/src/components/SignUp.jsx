import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    // expressAPI
    //   .put(`/api/users/${user.id}`, formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((res) => {
    //     res.data.usertype_id = parseInt(res.data.usertype_id, 10);
    //     setUser(res.data);
    //     localStorage.setItem("user", JSON.stringify(res.data));
    //     if (res.status === 201) {
    //       setUpdateSuccess(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return (
    <form
      className="w-80 flex flex-col justify-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label
          htmlFor="username"
          className="text-dark font-primary font-bold text-l mb-2 "
        >
          User Name
        </label>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <input
          className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-red text-gray font-primary "
          type="text"
          {...register("username", {
            required: true,
            minLength: 3,
          })}
          aria-invalid={errors.username ? "true" : "false"}
          name="username"
          // defaultValue={user.username}
        />
        {errors.username && (
          <span className="text-red">
            Your user name must have a minimum of 3 characters
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="text-dark font-primary font-bold text-l mb-2 "
        >
          Email Address
        </label>
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
      <div className="flex flex-col">
        <label
          htmlFor="confirmPassword"
          className="text-dark font-primary font-bold text-l mb-2 "
        >
          Confirm password
        </label>
        <input
          className="h-9 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-red text-gray font-primary "
          type="password"
          {...register("confirmpassword", {
            required: true,
            validate: (value) => value === watch("password"),
          })}
          aria-invalid={errors.confirmpassword ? "true" : "false"}
          name="confirmpassword"
        />
        {errors.confirmpassword && (
          <span className="text-red">Your password does not match</span>
        )}
      </div>
      <div className="flex justify-center my-5">
        <input
          className="bg-red font-primary font-bold text-lg text-white w-24 h-10 mx-10 my-5"
          type="submit"
          value="Sign Up"
        />
      </div>
    </form>
  );
}
