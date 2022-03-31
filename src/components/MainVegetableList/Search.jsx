


const Search = ( {searchTerm, handleSearch} ) => {
  
  return (
    <div className="search">
      <label>Recherche</label>
      <input
        type="text"
        placeholder="Recherchez un légume"
        onChange={(event) => { handleSearch(event.target.value);}}
        
      />
    </div>
  );
};
  
export default Search;