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
  const [combinedRecipes, setCombinedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
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

  const combineRecipes = (array) => {
    return array.reduce((combinedArray, current) => {
      const existing = combinedArray.find(
        (item) => item.title === current.title
      );
      if (existing) {
        existing.name.push(current.name);
      } else {
        combinedArray.push({
          id: current.id,
          title: current.title,
          name: [current.name],
        });
      }
      return combinedArray;
    }, []);
  };

  useEffect(() => {
    if (recipes.length > 0) {
      setCombinedRecipes(combineRecipes(recipes));
    }
  }, [recipes]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredRecipes(combinedRecipes);
    } else {
      setFilteredRecipes(
        combinedRecipes.filter((recipe) => {
          return selectedCategories.every((category) =>
            recipe.name.includes(category)
          );
        })
      );
    }
  }, [selectedCategories, combinedRecipes]);

  return (
    <div className="flex flex-col items-center mt-10 w-screen">
      <h1 className="font-primary text-red text-3xl font-bold my-5">
        My Recipes
      </h1>
      <div className="flex flex-col lg:flex-row lg:w-[90vw] lg:mt-10 lg:px-20">
        <div className="flex flex-col items-center lg:w-2/5">
          <div className="flex items-center h-10 w-80 border-solid border-[1px] border-gray bg-white rounded-md lg:w-3/4">
            <button type="button" className="text-gray mx-3">
              <BsSearch size={25} />
            </button>
            <input
              className=" focus:outline-none font-primary text-gray"
              placeholder="Search by keyword"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-5 my-5 mx-5 lg:grid-cols-2 lg:w-3/4">
            {categories.map((elem) => (
              <div key={elem.id} className="w-full lg:flex lg:justify-center">
                <button
                  type="button"
                  key={elem.id}
                  onClick={() => toggleCategory(elem.name)}
                  className={`w-full font-primary font-bold h-10 text-sm lg:w-3/4 ${
                    selectedCategories.includes(elem.name)
                      ? "bg-green text-white"
                      : "border-solid border-[2px] border-green bg-white text-green"
                  } px-2`}
                >
                  {elem.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start lg:w-3/5 lg:pl-20">
          <button
            onClick={() => navigate("/createnew")}
            type="button"
            className="font-primary mb-5 mt-5 lg:mt-0 lg:mb-10 w-fit px-3 font-bold h-8 text-sm bg-red hover:opacity-70 text-white mr-2 flex justify-center items-center"
          >
            Add a recipe
          </button>
          <div className="flex flex-col justify-start w-10/12 border-t-[1px] border-gray lg:border-none py-5 lg:pt-0 lg:min-h-[350px]">
            <ul className="flex flex-col justify-start ">
              {filteredRecipes
                .filter(
                  (item) =>
                    !keyword.length ||
                    item.title.toLowerCase().includes(keyword.toLowerCase())
                )
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="w-fit"
                    onClick={() => navigate(`/recipe/${item.id}`)}
                  >
                    <li
                      className="list-disc mx-5 my-1 font-primary text-dark text-lg text-left hover:border-b "
                      key={item.title}
                    >
                      {item.title}
                    </li>
                  </button>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
