import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Data from './Data';
import List from './List';
import "./index.css";

const Title = () => <h1>Search country:</h1>

const NoCountry = () => {
  return (
    <div>
      <h2>There is no countries</h2>
    </div>
  )
}
 
const App = () => {
  const [countries, setcountries] = useState({
    originalCountries: [],
    filtCountries: []
  });
  const [newCountry, setnewCountry] = useState("");

  useEffect(() =>{

    setTimeout(() => {
      fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
        .then((json) => {
          setcountries({
            originalCountries: json,
            filtCountries: json
          })
        });
    }, 1000);

  } ,[]);

  const handleChange = (event) =>{

    const newCount = event.target.value.toLowerCase();
    setnewCountry(newCount);

    const result = countries.originalCountries.filter((country) => country.name.toLowerCase().includes(newCount));
    setcountries({
      ...countries,
      filtCountries: result
    });
  };

  return (
    <div className="container">
      <Title />
      <form>
        <input type='text'onChange={handleChange}/>
      </form>
      { 
        (countries.filtCountries.length > 1)?
        <List countries={countries.filtCountries} />:
        ((countries.filtCountries.length === 0)
          ?<NoCountry />
          :[])
      }
      {
        (countries.filtCountries.length === 1)?
        <Data country={countries.filtCountries[0]}/>:
        []
      }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)