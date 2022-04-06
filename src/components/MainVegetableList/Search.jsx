


const Search = ({ searchTerm, handleSearch,handleEscape }) => {
  return (
    <div id="search">
      <label>Rechercher un légume</label>
      <input
        value={searchTerm}
        type="text"
        placeholder='appuyez sur la touche "Echap" pour annuler'
        onChange={(event) => { handleSearch(event.target.value); }}
        onKeyDown  ={(event) => {handleEscape(event);}}
      />
    </div>
  );
};

export default Search;