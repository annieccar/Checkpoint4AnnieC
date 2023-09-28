import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

import { useCurrentUserContext } from "../contexts/currentUserContext";

export default function CategoryModal({ setIsModal }) {
  const [category, setCategory] = useState("");
  const { user } = useCurrentUserContext();
  const { VITE_BACKEND_URL } = import.meta.env;

  const handleSubmit = async () => {
    if (category) {
      const data = { name: category, userId: user.Id };

      try {
        const response = await axios.post(
          `${VITE_BACKEND_URL}/categories`,
          data
        );
        if (response.status === 201) {
          setIsModal(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setIsModal(false)}>
        <div className="fixed z-10 top-0 bottom-0 left-0 right-0 backdrop-blur-md" />
      </button>
      <div className="bg-lightgray border-solid border-2 border-orange w-[330px] px-5 py-3 rounded-md flex flex-col gap-2 items-center fixed z-50 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 ">
        <label
          htmlFor="notes"
          className="text-dark font-primary font-bold text-l mb-2 "
        >
          Category name:
        </label>

        <input
          className="h-10 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-red text-gray font-primary "
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          className="font-primary w-fit px-3 font-bold h-8 text-sm bg-red hover:opacity-70 text-white mr-2 flex justify-center items-center"
          type="button"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

CategoryModal.propTypes = {
  setIsModal: PropTypes.func.isRequired,
};
