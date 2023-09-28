import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Recipe() {
  const recipeId = useParams();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recipeCategories, setRecipeCategories] = useState([]);

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

  //   console.log(recipeCategories);
  //   console.log(recipeDetails.file_name);

  return (
    <div className="mt-5">
      <button type="button" className="flex items-center px-2">
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
          <div className="font-primary text-dark text-lg font-bold">
            Notes:{" "}
          </div>
          <div className="font-script text-2xl ml-2">{recipeDetails.notes}</div>
          {/* <iframe
            src={`${VITE_BACKEND_URL}/public/files/${recipeDetails.file_name}`}
          />
          <img src={`${VITE_BACKEND_URL}/public/files/annie.png`} /> */}
          {recipeCategories.map((category) => (
            <div
              key={category.name}
              className="font-primary font-bold h-10 text-sm bg-green text-white px-2 flex justify-center items-center"
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
