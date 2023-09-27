import { useNavigate } from "react-router-dom";
import curry from "../assets/images/curry.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="font-primary text-center text-3xl text-red font-bold px-5 my-10">
        A simple and quick way to organize your recipes and
      </div>
      <h1 className="font-script text-gray text-5xl mb-10">
        make your life easier...
      </h1>
      <img
        src={curry}
        alt="Curry dish"
        className="w-full lg:w-1/2 lg:opacity-50"
      />
      <div className="flex flex-col items-center lg:-translate-y-[400px]">
        <div className="font-primary text-center text-2xl text-red font-bold my-10">
          Don't have an account yet?
        </div>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="bg-red w-52 h-14 text-white font-primary text-2xl"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
