import { useState } from 'react';
import './App.css';
import Estimation from './components/Estimation';
import NameForm from './components/NameForm';

function App() {
  const [agePrediction, setAgePrediction] = useState(null);

  // Fonction qui est appelé lors du submit du form name
  function formSubmitted(name, country){

    // Création de l'uri de la requête  
    let uri = `https://api.agify.io?name=${name}`;
    if(country !== "*" && country.length !== 0) {
      uri += `&country_id=${country}`;
    }

    // Appel à l'api
    fetch(uri)
    .then(result => result.json())
    .then(response => {
      // m-a-j de l'état
      setAgePrediction(response);
    })
    
  }
  
  return (
    <div className="App">
      <h1>Estimation inutile : age en fonction du prénom</h1>
      <NameForm formSubmitted={formSubmitted}/>
      <Estimation agePrediction={agePrediction} />
    </div>
  );
}

export default App;

=====================================
formulaire
==============================================
import { useState } from "react";

const countries = [
    {name: "France", iso: "FR"},
    {name: "États-unis", iso: "US"},
    {name: "Italy", iso: "IT"},
    {name: "Espagne", iso: "ES"},
]

function NameForm({formSubmitted}){

    const [name, setName] = useState('');
    const [country, setCountry] = useState('*');

    //Fonction qui gère l'envoi du formulaire 
    function nameFormSubmitted(event){
        event.preventDefault()

        // fonction qui remonte le name et le country dans le parent (App.js)
        formSubmitted(name, country);
        setName("");
        setCountry("*");
    }


    // Fonction qui m-a-j le state de name lorsqu'on modifie le input
    function changeName(event){ setName(event.target.value) }

    // Fonction qui m-a-j le state de country lorsqu'on modifie le input
    function changeCountry(event){  setCountry(event.target.value) }

    return(
        <form onSubmit={nameFormSubmitted}>
            <label htmlFor="name">Prénom:</label>
            <input type="text" id="name" value={name} onChange={changeName}/>
            <button type="submit">Estimer</button>
            <select name="countries" id="contry-select" value={country} onChange={changeCountry}>
                <option value="*">*</option>
                {
                    countries.map((country, index) => {
                        return <option key={index} value={country.iso}>{country.name}</option>
                    })
                }
            </select>
        </form>

    )
}

export default NameForm;

=======================================
détail
=============================

function Estimation({agePrediction}){
    return(
        <section>
            <h2>Estimation</h2>
            {
                (agePrediction?.age) 
                ? <p>Âge estimé : {agePrediction.age} ans (sur {agePrediction.count} {agePrediction.name}
                    { (agePrediction.country_id) ? ` dans ${agePrediction.country_id}` : " dans le monde" })
                </p>
                : <p>No name or name not found in database</p>
            }
        </section>
    );
}

export default Estimation;