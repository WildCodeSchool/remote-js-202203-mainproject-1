const Search = () => {
  return (
    <div>
      <h2>Recherche d'un légume</h2>
      <input
        value={searchValue}
        type="text"
        placeholder="Recherchez un légume en particulier"
      />
    </div>
  );
};
  
export default Search;