import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";

const ShowVegetable = ({ vegetablesList }) => {
  ///////////////////////////////////////////////

  ////////////////////////////////////////////////
  const [errorField, setErrorField] = useState("");

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const { idSearch } = useParams();
  const [vegetableFound, setVegetableFound] = useState({});
  const [name, setName] = useState("");

  const [startingSowingCover, setStartOfSowingCover] = useState(null);
  const [endingSowingCover, setEndOfSowingCover] = useState(null);

  const [startingSowingGround, setStartOfSowingGround] = useState(null);
  const [endingSowingGround, setEndOfSowingGround] = useState(null);

  const [startingHarvest, setstartOfHarvest] = useState(null);
  const [endingHarvest, setEndOfHarvest] = useState(null);

  const [selectedFriendsOption, setSelectedFriendsOption] = useState(null);
  // Display select options
  const displayMonth = months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ));

  useEffect(() => {
    const result = vegetablesList.find(
      (vegetable) => vegetable.id === parseInt(idSearch)
    );
    setVegetableFound(result);
    console.log(`Ami avant modif : ${vegetableFound.friendVegetableIds}`);
  }, [vegetablesList]);

  // const displayVegetable = (id) => {
  //   const vegetable = vegetablesList.map((vegetable) => vegetable.id === id);
  //   return vegetable.name;
  // };

  const friendList = [];

  function manageFriendList() {
    const newFriendsList = [...vegetableFound.friendVegetableIds];
  }

  vegetablesList.map((vegetable) =>
    friendList.push({ value: vegetable.id, label: vegetable.name })
  );

  const setValueSelect = (type, value) => {
    setErrorField("");

    switch (type) {
      case "startingSowingCover":
        setStartOfSowingCover(value);
        break;
      case "endingSowingCover":
        if (startingSowingCover !== null && startingSowingCover !== "null") {
          setEndOfSowingCover(value);
        } else
          setErrorField(
            "vous avez défini un date de fin de semis en intérieur mais pas de date de début"
          );
        break;
      case "startingSowingGround":
        setStartOfSowingGround(value);
        break;
      case "endingSowingGround":
        if (startingSowingGround !== null && startingSowingGround !== "null") {
          setEndOfSowingGround(value);
        } else
          setErrorField(
            "vous avez défini une date de fin de semis en extérieur mais pas de date de début"
          );
        break;
      case "startingHarvest":
        setstartOfHarvest(value);
        break;
      case "endingHarvest":
        if (startingSowingGround !== null && startingSowingGround !== "null") {
          setEndOfHarvest(value);
        } else
          setErrorField(
            "vous avez défini une date de fin de récolte mais pas de date de début"
          );
        break;
    }
  };

  function handleUpdate() {
    let selectedId = [];
    console.log(selectedFriendsOption);

    selectedFriendsOption.map((element) => selectedId.push(element.value));
    console.log(selectedId);
  }
  return (
    <div>
      <h1>Mettre à jour {vegetableFound.name}</h1>
      <p className="error">{errorField}</p>
      <div>
        <label>Changer son nom </label>
        <input placeholder="Nom" onChange={(e) => setName(e.target.value)} />

        <label>Début : semis intérieur </label>
        <select
          onChange={(e) =>
            setValueSelect("startingSowingCover", e.target.value)
          }
        >
          <option value={null}>{vegetableFound.startingSowingCover}</option>
          {displayMonth}
        </select>

        <label>Fin : semis intérieur </label>
        <select
          onChange={(e) => setValueSelect("endingSowingCover", e.target.value)}
        >
          <option value={null}>{vegetableFound.endingSowingCover}</option>
          {displayMonth}
        </select>

        <label>Début : semis extérieur </label>
        <select
          onChange={(e) =>
            setValueSelect("startingSowingGround", e.target.value)
          }
        >
          <option value={null}>{vegetableFound.startingSowingGround}</option>
          {displayMonth}
        </select>

        <label>Fin : semis extérieur </label>
        <select
          onChange={(e) => setValueSelect("endingSowingGround", e.target.value)}
        >
          <option value={null}>{vegetableFound.endingSowingGround}</option>
          {displayMonth}
        </select>

        <label>Début : Récolte </label>
        <select
          onChange={(e) => setValueSelect("startingHarvest", e.target.value)}
        >
          <option value={vegetableFound.startingHarvest}>
            {vegetableFound.startingHarvest}
          </option>
          {displayMonth}
        </select>

        <label>Fin : Récolte </label>
        <select
          onChange={(e) => setValueSelect("endingHarvest", e.target.value)}
        >
          <option value={null}>{vegetableFound.endingHarvest}</option>
          {displayMonth}
        </select>

        <label>Fin : Récolte </label>
        <div>
          <Select
            isSearchable
            isMulti
            isClearable={true}
            defaultValue={vegetableFound.friendList}
            onChange={setSelectedFriendsOption}
            options={friendList}
            onInputChange={manageFriendList}
          />
        </div>
      </div>
      <button onClick={handleUpdate} type="submit">
        Ajouter les modifications
      </button>
    </div>
  );
};

export default ShowVegetable;
