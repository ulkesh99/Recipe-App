
import './App.css';
import React,{useEffect,useState} from "react";
import Recipe from './recipe'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


const App = () => {

  const APP_ID = "797ce76b";
  const APP_KEY = "e8182d51b3c603094f88b93a63aa1aa6";

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <TextField className="search-bar" id="standard-basic" label="Enter Recipe name" value={search}  onChange={updateSearch}/>
        <Button className="search-btn" variant="contained" type="submit"> search</Button>

      </form>

      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe key ={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image = {recipe.recipe.image}
                ingredients = {recipe.recipe.ingredients} />
      )
        )}
      </div>
    </div>
  );
};

export default App;
