import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useCurrentUserContext } from "../contexts/currentUserContext";
import CategoryModal from "../components/CategoryModal";

export default function CreateRecipe() {
  const { user } = useCurrentUserContext();
  const userId = parseInt(user.Id, 10);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${VITE_BACKEND_URL}/categories/user/${user.Id}`
        );
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [isModal]);

  const handleCheckboxChange = (e) => {
    const categoryId = e.target.value;

    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, parseInt(categoryId, 10)]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== parseInt(categoryId, 10))
      );
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("recipeFile", data.recipeFile[0]);
    formData.append("title", data.title);
    formData.append("notes", data.notes);
    formData.append("userId", userId);

    const uploadRecipe = async () => {
      try {
        const recipeUploadResponse = await axios.post(
          `${VITE_BACKEND_URL}/recipes`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const recipeId = recipeUploadResponse.data.id;
        const categoryResponse = await axios.post(
          `${VITE_BACKEND_URL}/recipes/recipes_has_category`,
          {
            recipeId,
            categories: selectedCategories,
          }
        );
        if (categoryResponse.status === 201) {
          navigate("/myrecipes");
        }
      } catch (err) {
        console.error(err);
      }
    };
    uploadRecipe();
  };

  return (
    <div className="mt-5 lg:px-10">
      <button
        onClick={() => navigate("/myrecipes")}
        type="button"
        className="flex items-center px-2"
      >
        <BsFillArrowLeftSquareFill size={20} />
        <div className="font-primary text-lg font-bold ml-1">
          Back to recipe list
        </div>
      </button>
      <div className="flex flex-col items-center mt-10">
        <h1 className="font-primary text-red font-bold text-2xl mb-5">
          Upload New Recipe
        </h1>
        <form
          className="w-80 flex flex-col justify-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-dark font-primary font-bold text-l mb-2 "
            >
              Recipe Name:
            </label>
            {/* eslint-disable react/jsx-props-no-spreading */}
            <input
              className="h-10 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-red text-gray font-primary "
              type="text"
              {...register("title", {
                required: true,
                minLength: 3,
              })}
              aria-invalid={errors.title ? "true" : "false"}
              name="title"
              // defaultValue={user.username}
            />
            {errors.title && (
              <span className="text-red">
                Your must give a name to your recipe
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="recipeFile"
              className="text-dark font-primary font-bold text-l mb-2 "
            >
              Recipe File:
            </label>
            {/* eslint-disable react/jsx-props-no-spreading */}
            <input
              className="file:mt-1 h-10 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-red text-gray font-primary flex items-center "
              type="file"
              {...register("recipeFile", {
                required: true,
              })}
              aria-invalid={errors.file ? "true" : "false"}
              name="recipeFile"
              // defaultValue={user.username}
            />
            {errors.recipeFile && (
              <span className="text-red">Select a file for your recipe</span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="notes"
              className="text-dark font-primary font-bold text-l mb-2 "
            >
              Notes:
            </label>
            {/* eslint-disable react/jsx-props-no-spreading */}
            <textarea
              className="h-20 focus:outline-none mb-2 px-2 rounded-lg border-2 border-solid border-red text-gray font-primary "
              type="text"
              {...register("notes", {
                required: false,
              })}
              name="notes"
              // defaultValue={user.username}
            />
          </div>
          <div className="flex justify-between items-start px-2 mt-5">
            <div className="flex flex-col">
              <label
                htmlFor="categories"
                className="text-dark font-primary font-bold text-l mb-2 "
              >
                Select categories:
              </label>
              {/* eslint-disable react/jsx-props-no-spreading */}
              <div>
                {categories.map((category) => (
                  <div key={category.Id} className="flex">
                    <input
                      type="checkbox"
                      id={category.id}
                      name={category.name}
                      value={category.Id}
                      onChange={handleCheckboxChange}
                    />
                    <div className="ml-2">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsModal(true)}
              type="button"
              className="bg-red text-white font-primary font-bold text-sm px-2 h-8 hover:opacity-70"
            >
              + Create New
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <input
              className="font-primary w-fit px-3 font-bold h-8 text-sm bg-green hover:opacity-70 text-white mr-2 flex justify-center items-center"
              type="submit"
              value="Save Recipe"
            />
          </div>
        </form>
      </div>
      {isModal && <CategoryModal setIsModal={setIsModal} />}
    </div>
  );
}
