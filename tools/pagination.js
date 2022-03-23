function CatBreed({ breed }){
    return(
        <div>
            <h2>{breed.breed}</h2>
            <p>Pays : {(breed.country) || "Iconnu"}</p>
            <p>Poil : {(breed.coat) || "Iconnu"}</p>
            <p>Origine : {(breed.origin) || "Iconnu"}</p>
            <p>Paterne : {(breed.pattern) || "iconnu"}</p>
        </div>
    )
}
//========================================================
export default CatBreed;

import { useEffect, useState } from 'react';
import './App.css';
import CatBreed from './components/CatBreed';

function App() {
  /* State */
  const [ breeds, setBreeds ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pagesNumber, setPagesNumber ] = useState(1);

  /* UseEffect */
  useEffect(() => {
    fetch("https://catfact.ninja/breeds")
    .then(r => r.json())
    .then(r => {
      setBreeds(r.data);
      setCurrentPage(r.current_page);
      setPagesNumber(Math.ceil(r.total/r.to));
    });
  }, []);

  useEffect(() => {
    fetch(`https://catfact.ninja/breeds?page=${currentPage}`)
    .then(r => r.json())
    .then(r => {
      setBreeds(r.data);
      setCurrentPage(r.current_page); 
    });
  }, [currentPage])


  /* Functions */
  function paginationButtonClicked(pageNumber){
    setCurrentPage(pageNumber);
  };

  function previousButtonClicked(){
    if(currentPage > 1) setCurrentPage(currentPage-1);
  }
  
  function nextButtonClicked(){
    if(currentPage < 4) setCurrentPage(currentPage+1);
  }


  function getButtons(){
    const paginationsButtons = [];
    for (let i = 1; i <= pagesNumber; i++) {
      paginationsButtons.push(
        <button disabled={(currentPage === i)} onClick={ () => paginationButtonClicked(i) }>{i}</button>
      )    
    }
    return paginationsButtons;
  }

  return (
    <div className="App">
      <h1>Liste des races de chats</h1>
      Page : { currentPage }
      
      <section>
        {
          (breeds?.length) 
          ? breeds.map((breed, index) => {
            return <CatBreed breed={breed} key={index}/>
          }) 
          : <h2>Waiting for API ...</h2>
        }
      </section>

      <section>
        <div>
          <button disabled={(currentPage === 1)} onClick={previousButtonClicked}>Page précédente</button>
          {
            getButtons().map(button => button)
          }
          <button disabled={(currentPage === pagesNumber)} onClick={nextButtonClicked}>Page suivante</button>
        </div>
      </section>
    </div>
  );
}

export default App;
