import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

const Title = () => <h1>Search country:</h1>

const List = ({ countries }) => {
  return (
    <div className="list">
        <ul>
          {
            countries
              .map((country) => 
                <li>
                  {country.name}
                </li>
              )
          }
        </ul>
    </div>
  )
}

const Data = ({country}) => {

  console.log(country);
  return(
    <div className="data-list">
      <h1>{country.name}</h1>
      <h4>Capital: {country.capital}</h4>
      <h4>Population: {country.population}</h4>
      <div> <h4>Languages:</h4> 
        <ul> 
          { country.languages.map((lang) => <li> {lang.nativeName} </li> ) } 
        </ul> 
      </div>
      <img className="flag" src={country.flag} alt={country.name}/>
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
        []
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