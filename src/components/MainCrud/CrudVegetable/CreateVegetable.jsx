import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateVegetable = ({ vegetablesList, setVegetablesList }) => {
  let navigate = useNavigate();
  const [errorField, setErrorField] = useState("");

  const [listFriendVegetables, setListFriendVegetables] = useState([]);
  const [listEnemyVegetables, setListEnemyVegetables] = useState([]);

  useEffect(() => {
    setListFriendVegetables(vegetablesList);
    setListEnemyVegetables(vegetablesList);
  }, [vegetablesList]);

  const [name, setName] = useState("");
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  const [startingSowingCover, setStartOfSowingCover] = useState(null);
  const [endingSowingCover, setEndOfSowingCover] = useState(null);

  const [startingSowingGround, setStartOfSowingGround] = useState(null);
  const [endingSowingGround, setEndOfSowingGround] = useState(null);

  const [startingHarvest, setstartOfHarvest] = useState(null);
  const [endingHarvest, setEndOfHarvest] = useState(null);

  const [friendVegetableIds, setVegetableIds] = useState([]);
  const [enemyVegetableIds, setenemyVegetableIds] = useState([]);

  const displayMonth = months.map((month, index) => (
    <option key={index} value={month}>{month}</option>
  ));
  const setValueSelect = (type, value) => {
    setErrorField("");
    console.log("valuuuuuuuuuuuuuuuuuu " + value);
    console.log(type);
    switch (type) {
      case 'startingSowingCover':
        setStartOfSowingCover(value);
        break;
      case 'endingSowingCover':
        if (startingSowingCover !== null && startingSowingCover !== 'null') { setEndOfSowingCover(value); }
        else setErrorField("vous avez défini un date de fin de semis en intérieur mais pas de date de début");
        break;
      case 'startingSowingGround':
        setStartOfSowingGround(value);
        break;
      case 'endingSowingGround':
        if (startingSowingGround !== null && startingSowingGround !== 'null') { setEndOfSowingGround(value); }
        else setErrorField("vous avez défini une date de fin de semis en extérieur mais pas de date de début");
        break;
      case 'startingHarvest':
        setstartOfHarvest(value);
        break;
      case 'endingHarvest':
        if (startingSowingGround !== null && startingSowingGround !== 'null') { setEndOfHarvest(value); }
        else setErrorField("vous avez défini une date de fin de récolte mais pas de date de début");
        break;
    }
    console.log("hello");
  };


  function setFriendsList(id) {
    console.log(id);
    if (friendVegetableIds.includes(id)) {
      console.log("on l'a deja retiré faut le remettre");
      const index = friendVegetableIds.indexOf(id);
      friendVegetableIds.splice(index, 1);
    } else {
      console.log("on le retire");
      friendVegetableIds.push(id);
    }
    console.log(friendVegetableIds);
    // misse à jour de la liste des légumes déconseillés
    const newList = vegetablesList.filter(vegetable => !friendVegetableIds.includes(vegetable.id));
    console.log(newList);
    setListEnemyVegetables(newList);
  }

  function setEnemiesList(id) {
    console.log(id);
    if (enemyVegetableIds.includes(id)) {
      console.log("on l'a deja retiré faut le remettre");
      const index = enemyVegetableIds.indexOf(id);
      enemyVegetableIds.splice(index, 1);
    } else {
      console.log("on le retire");
      enemyVegetableIds.push(id);
    }
    console.log(enemyVegetableIds);
    // misse à jour de la liste des légumes déconseillés
    const newList = vegetablesList.filter(vegetable => !enemyVegetableIds.includes(vegetable.id));
    console.log(newList);
    setListFriendVegetables(newList);
  }

  const checkForm = (e) => {
    console.log(e);
    e.preventDefault();
    if (name === "") setErrorField("Vous n'avez pas saisi de nom de légume");
    else { postData(); }
  };


  const postData = () => {
    axios.post("https://potager-compatible-api.herokuapp.com/api/vegetables", {
      "name": name,
      "startingSowingCover": startingSowingCover,
      "endingSowingCover": endingSowingCover,
      "startingSowingGround": startingSowingGround,
      "endingSowingGround": endingSowingGround,
      "startingHarvest": startingHarvest,
      "endingHarvest": endingHarvest,
      "friendVegetableIds": friendVegetableIds,
      "enemyVegetableIds": enemyVegetableIds,
    }).then((response) => {
      console.log(vegetablesList);
      const vegetableCreated = response.data;
      console.log(vegetableCreated);
      vegetablesList.push(vegetableCreated);
      setVegetablesList(vegetablesList.sort(function (a, b) { return a.name.localeCompare(b.name); }));
      console.log(vegetablesList);
      navigate("/vegetable-option");
    });
    console.log("Création du légume :");
    console.log(name);
    console.log(startingSowingCover);
    console.log(endingSowingCover);
    console.log(startingSowingGround);
    console.log(endingSowingGround);
    console.log(startingHarvest);
    console.log(endingHarvest);
    console.log(friendVegetableIds);
    console.log(enemyVegetableIds);
  };

  return (
    <form onSubmit={(e) => checkForm(e)} className="form-create">
      <h1>Ajouter un légume</h1>
      <p className="error">{errorField}</p>
      <p>
        <label>Nom du légume</label>
        <input placeholder="Nom" onChange={(e) => setName(e.target.value)} />
      </p>
      <p>
        <label>Début : semis intérieur</label>
        <select onChange={(e) => setValueSelect("startingSowingCover", e.target.value)}>
          <option value='null'>Sélectionnez un mois</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>Fin : semis intérieur</label>
        <select onChange={(e) => setValueSelect("endingSowingCover", e.target.value)}>
          <option value={null}>Sélectionnez un mois</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>Début : semis extérieur</label>
        <select onChange={(e) => setValueSelect("startingSowingGround", e.target.value)}>
          <option value={null}>Sélectionnez un mois</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>Fin : semis extérieur</label>
        <select onChange={(e) => setValueSelect("endingSowingGround", e.target.value)}>
          <option value={null}>Sélectionnez un mois</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>Début : Récolte</label>
        <select onChange={(e) => setValueSelect("startingHarvest", e.target.value)}>
          <option value={null}>Sélectionnez un mois</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>Fin : Récolte</label>
        <select onChange={(e) => setValueSelect("endingHarvest", e.target.value)}>
          <option value={null}>Sélectionnez un mois</option>
          {displayMonth}
        </select>
      </p>

      <div className="container-list-compatibilities">
        <div className="list-friends list-compatibilities">
        <h2>Légumes à associations favorable</h2>
          {listFriendVegetables.map((el) => (
            <div key={el.id}>
              <label htmlFor={`friend${el.id}`}>{el.name}</label>
              <input
                type="checkbox"
                id={`friend${el.id}`}
                onClick={() => setFriendsList(el.id)}
              ></input>
              
            </div>
          ))}
        </div>

        <div className="list-enemies list-compatibilities">
          <h2>Légumes à associations défavorable</h2>
          {listEnemyVegetables.map((el) => (
            <div key={el.id}>
              <label htmlFor={`enemy${el.id}`}>{el.name}</label>
              <input
                type="checkbox"
                id={`enemy${el.id}`}
                onClick={() => setEnemiesList(el.id)}
              ></input>
              
            </div>
          ))}
        </div>
      </div>
      <button className="cursor-pointer" type="submit">
        Enregistrer
      </button>
    </form>
  );
};

export default CreateVegetable;
