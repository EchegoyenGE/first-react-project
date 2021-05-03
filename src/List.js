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

export default List