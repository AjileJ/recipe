import React, {useState, useEffect} from 'react';
import Recipe from "./Recipe";
import axios from "axios";
import './App.css';

const App = () => {
const APP_ID = " 715fe328";
const APP_KEY = "43f5e73dd81b98566f73e41c737f6d3f";

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState('chicken');


	useEffect(()=> {
   getRecipes();
  },[query]); 

const getRecipes = async () => {
axios.get( `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
.then(response => {
  
  setRecipes(response.data.hits);
  console.log(response.data.hits);
})
.catch(error => {
  console.log("error", error);
})
// const data = await response.json();
// setRecipes(data.hits);

};

const updateSearch = e => {
  setSearch(e.target.value);
  console.log(search);
};
const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch("");
}

return(
  <div className = "App">
    <form onSubmit={getSearch} className = "search-form"> 
      <input className = "search-bar" type="text" value={search} onChange={updateSearch}/>
      <button className= "search-button" type= "submit">Search</button>
    </form>
    <div className="recipes">
    {recipes.map(recipe => (
      <Recipe 
      key={recipe.recipe.label} 
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))}
    </div>
  </div>
);
}


export default App;
