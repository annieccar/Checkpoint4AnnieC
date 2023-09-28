import { useState, useEffect } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/currentUserContext";

const { VITE_BACKEND_URL } = import.meta.env;

export default function MyRecipes() {
  const { user } = useCurrentUserContext();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  // const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${VITE_BACKEND_URL}/categories/user/${user.Id}`
        );
        const recipesResponse = await axios.get(
          `${VITE_BACKEND_URL}/recipes/user/${user.Id}`
        );
        setCategories(categoriesResponse.data);
        setRecipes(recipesResponse.data);
        // const filteredRecipes = recipes.filter((recipe) => {
        //   selectedCategories.length || selectedCategories.includes(recipe.name);
        // });
        // setFilteredRecipes(filteredRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 w-screen">
      <h1 className="font-primary text-red text-3xl font-bold my-5">
        My Recipes
      </h1>
      <div className="flex items-center h-10 w-80 border-solid border-[1px] border-gray bg-white rounded-md">
        <button type="button" className="text-gray mx-3">
          <BsSearch size={25} />
        </button>
        <input
          className=" focus:outline-none font-primary text-gray"
          placeholder="Search by keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-5 my-5 mx-5">
        {categories.map((elem) => (
          <button
            type="button"
            key={elem.name}
            onClick={() => toggleCategory(elem.name)}
            className={`font-primary font-bold h-10 text-sm ${
              selectedCategories.includes(elem.name)
                ? "bg-green text-white"
                : "border-solid border-[2px] border-green bg-white text-green"
            } px-2`}
          >
            {elem.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-start w-10/12 border-t-[1px] border-gray py-5 ">
        <ul className="flex flex-col justify-start ">
          {recipes
            .filter(
              (item) =>
                !keyword.length ||
                item.title.toLowerCase().includes(keyword.toLowerCase())
            )

            .map((item) => (
              <button
                type="button"
                className="w-fit"
                onClick={() => navigate(`/recipe/${item.id}`)}
              >
                <li
                  className="list-disc mx-5 my-1 font-primary text-dark text-lg  hover:border-b "
                  key={item.title}
                >
                  {item.title}
                </li>
              </button>
            ))}
        </ul>
      </div>
      <button
        onClick={() => navigate("/createnew")}
        type="button"
        className="font-primary w-fit px-3 font-bold h-8 text-sm bg-red hover:opacity-70 text-white mr-2 flex justify-center items-center"
      >
        Add a recipe
      </button>
    </div>
  );
}
