import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateVegetable = ({ vegetablesList, setVegetablesList }) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  const [startingSowingCover, setStartOfSowingCover] = useState("");
  const [endingSowingCover, setEndOfSowingCover] = useState("");

  const [startingSowingGround, setStartOfSowingGround] = useState("");
  const [endingSowingGround, setEndOfSowingGround] = useState("");

  const [startingHarvest, setstartOfHarvest] = useState("");
  const [endingHarvest, setEndOfHarvest] = useState("");

  const [friendVegetableIds, setVegetableIds] = useState([]);
  const [enemyVegetableIds, setenemyVegetableIds] = useState([]);

  const displayMonth = months.map((month, index) => (
    <option key={index} value={month}>{month}</option>
  ));
  const setValueSelect = (type, value) => {
    console.log("valuuuuuuuuuuuuuuuuuu " + value);
    console.log(type);
    switch (type) {
      case 'startingSowingCover':
        value !== "Sélectionnez un mois" ? setStartOfSowingCover(value) : setStartOfSowingCover(null);
        break;
      case 'endingSowingCover':
        setEndOfSowingCover(value);
        break;
      case 'startingSowingGround':
        setStartOfSowingGround(value);
        break;
      case 'endingSowingGround':
        setEndOfSowingGround(value);
        break;
      case 'startingHarvest':
        setstartOfHarvest(value);
        break;
      case 'endingHarvest':
        setEndOfHarvest(value);
        break;
    }
  };


  function setFriendsList(id) {
    friendVegetableIds.push(id);
    console.log(friendVegetableIds);
  }

  function setEnemiesList(id) {
    enemyVegetableIds.push(id);
    console.log(enemyVegetableIds);
  }

  const postData = () => {
    axios.post("https://potager-compatible-api.herokuapp.com/api/vegetables", {
      name,
      startingSowingCover,
      endingSowingCover,
      startingSowingGround,
      endingSowingGround,
      startingHarvest,
      endingHarvest,
      friendVegetableIds,
      enemyVegetableIds,
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
    axios
      .get("https://potager-compatible-api.herokuapp.com/api/vegetables")
      .then((response) => response.data)
      .then((data) => {
        setVegetablesList(data);
      });
    navigate("/vegetables-list");
  };

  return (
    <div>
      <div className="form-create">
        <h1>Ajouter un légume</h1>

        <label>Nom du légume</label>
        <input placeholder="Nom" onChange={(e) => setName(e.target.value)} />

        <label>Début : semis intérieur</label>
        <select onChange={(e) => setValueSelect("startingSowingCover", e.target.value)}>
          <option>Sélectionnez un mois</option>
          {displayMonth}
        </select>
        {/* <input
          placeholder="JANUARY"
          onChange={(e) => setStartOfSowingCover(e.target.value)}
        /> */}
        <label>Fin : semis intérieur</label>
        <select onChange={(e) => setValueSelect("endingSowingCover", e.target.value)}>
        <option>Sélectionnez un mois</option>
          {displayMonth}
        </select>
        {/* <input
          placeholder="FEBRUARY"
          onChange={(e) => setEndOfSowingCover(e.target.value)}
        /> */}

        <label>Début : semis extérieur</label>
        <select onChange={(e) => setValueSelect("startingSowingGround", e.target.value)}>
        <option>Sélectionnez un mois</option>
          {displayMonth}
        </select>
        {/* <input
          placeholder="JANUARY"
          onChange={(e) => setStartOfSowingGround(e.target.value)}
        /> */}
        <label>Fin : semis extérieur</label>
        <select onChange={(e) => setValueSelect("endingSowingGround", e.target.value)}>
        <option>Sélectionnez un mois</option>
          {displayMonth}
        </select>
        {/* <input
          placeholder="FEBRUARY"
          onChange={(e) => setEndOfSowingGround(e.target.value)}
        /> */}

        <label>Début : Récolte</label>
        <select onChange={(e) => setValueSelect("startingHarvest", e.target.value)}>
        <option>Sélectionnez un mois</option>
          {displayMonth}
        </select>
        {/* <input
          placeholder="FEBRUARY"
          onChange={(e) => setstartOfHarvest(e.target.value)}
        /> */}
        <label>Fin : Récolte</label>
        <select onChange={(e) => setValueSelect("endingHarvest", e.target.value)}>
        <option>Sélectionnez un mois</option>
          {displayMonth}
        </select>
        {/* <input
          placeholder="APRIL"
          onChange={(e) => setEndOfHarvest(e.target.value)}
        /> */}
      </div>
      <h1></h1>
      <div className="container-list-compatibilities">
        <div className="list-friends">
          {vegetablesList.map((el) => (
            <div key={el.id}>
              <input
                type="checkbox"
                name={el.name}
                id={el.name}
                onClick={() => setFriendsList(el.id)}
              ></input>
              <label>{el.name}</label>
            </div>
          ))}
        </div>

        <div className="list-enemies">
          {vegetablesList.map((el) => (
            <div key={el.id}>
              <input
                type="checkbox"
                name={el.name}
                id={el.name}
                onClick={() => setEnemiesList(el.id)}
              ></input>
              <label>{el.name}</label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={postData} type="submit">
        Submit
      </button>
    </div>
  );
};

export default CreateVegetable;
