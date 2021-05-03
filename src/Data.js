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

export default Data