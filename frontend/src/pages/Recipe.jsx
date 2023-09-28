import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Recipe() {
  const recipeId = useParams();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recipeCategories, setRecipeCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeResponse = await axios.get(
          `${VITE_BACKEND_URL}/recipes/${recipeId.id}`
        );

        const categoriesResponse = await axios.get(
          `${VITE_BACKEND_URL}/categories/recipe/${recipeId.id}`
        );
        setRecipeDetails(recipeResponse.data[0]);
        setRecipeCategories(categoriesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const deleteResponse = await axios.delete(
        `${VITE_BACKEND_URL}/recipes/${parseInt(recipeId.id, 10)}`
      );
      if (deleteResponse.status === 204) navigate("/myrecipes");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-5">
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
      <div className="flex flex-col items-center mt-5">
        <div className="font-primary text-red text-2xl font-bold">
          {recipeDetails.title}
        </div>
        <div className="flex my-3 items-center">
          <div className="font-primary text-dark text-lg font-bold">Notes:</div>
          <div className="font-script text-2xl ml-2">{recipeDetails.notes}</div>
        </div>
        <div className="flex flex-col">
          {/* <iframe
            src={`${VITE_BACKEND_URL}/public/files/${recipeDetails.file_name}`}
          />
          <img src="http://localhost:8000/public/files/annie.png" /> */}
          <div className="font-primary text-dark my-3">
            Associated categories:{" "}
          </div>
          <div className="flex border-b pb-5 border-gray">
            {recipeCategories.map((category) => (
              <div
                key={category.name}
                className="font-primary w-fit px-3 font-bold h-8 text-sm bg-red text-white mr-2 flex justify-center items-center"
              >
                {category.name}
              </div>
            ))}
          </div>
          <div className="flex justify-around items-center mt-10">
            <button
              type="button"
              className="font-primary w-fit px-3 font-bold h-8 text-sm bg-green hover:opacity-70 text-white mr-2 flex justify-center items-center"
            >
              Edit Recipe
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="font-primary w-fit px-3 font-bold h-8 text-sm bg-green hover:opacity-70 text-white mr-2 flex justify-center items-center"
            >
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
