import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShowVegetable = ({ vegetablesList, setVegetablesList }) => {
  let navigate = useNavigate();
  const [errorField, setErrorField] = useState("");
  const { idSearch } = useParams();
  console.log(typeof (idSearch));
  const vegetableToUpdate = vegetablesList.find(vegetable => vegetable.id === parseInt(idSearch));
  console.log(vegetableToUpdate);

  const [listFriendVegetables, setListFriendVegetables] = useState([]);
  const [listEnemyVegetables, setListEnemyVegetables] = useState([]);

  useEffect(() => {
    setListFriendVegetables(vegetablesList.filter(vegetable => !vegetableToUpdate.enemyVegetableIds.includes(vegetable.id)));
    setListEnemyVegetables(vegetablesList.filter(vegetable => !vegetableToUpdate.friendVegetableIds.includes(vegetable.id)));
  }, [vegetablesList]);

  const [name, setName] = useState(vegetableToUpdate.name);
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  const [startingSowingCover, setStartOfSowingCover] = useState(vegetableToUpdate.startingSowingCover);
  const [endingSowingCover, setEndOfSowingCover] = useState(vegetableToUpdate.endingSowingCover);

  const [startingSowingGround, setStartOfSowingGround] = useState(vegetableToUpdate.startingSowingGround);
  const [endingSowingGround, setEndOfSowingGround] = useState(vegetableToUpdate.endingSowingGround);

  const [startingHarvest, setstartOfHarvest] = useState(vegetableToUpdate.startingHarvest);
  const [endingHarvest, setEndOfHarvest] = useState(vegetableToUpdate.endingHarvest);

  const [friendVegetableIds, setVegetableIds] = useState([]);
  const [enemyVegetableIds, setenemyVegetableIds] = useState([]);

  const displayMonth =
    months.map((month, index) => (
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
        else setErrorField("vous avez d??fini un date de fin de semis en int??rieur mais pas de date de d??but");
        break;
      case 'startingSowingGround':
        setStartOfSowingGround(value);
        break;
      case 'endingSowingGround':
        if (startingSowingGround !== null && startingSowingGround !== 'null') { setEndOfSowingGround(value); }
        else setErrorField("vous avez d??fini une date de fin de semis en ext??rieur mais pas de date de d??but");
        break;
      case 'startingHarvest':
        setstartOfHarvest(value);
        break;
      case 'endingHarvest':
        if (startingSowingGround !== null && startingSowingGround !== 'null') { setEndOfHarvest(value); }
        else setErrorField("vous avez d??fini une date de fin de r??colte mais pas de date de d??but");
        break;
    }
    console.log("hello");
  };


  function setFriendsList(id) {
    console.log(id);
    if (friendVegetableIds.includes(id)) {
      console.log("on l'a deja retir?? faut le remettre");
      const index = friendVegetableIds.indexOf(id);
      friendVegetableIds.splice(index, 1);
    } else {
      console.log("on le retire");
      friendVegetableIds.push(id);
    }
    console.log(friendVegetableIds);
    // misse ?? jour de la liste des l??gumes d??conseill??s
    const newList = vegetablesList.filter(vegetable => !friendVegetableIds.includes(vegetable.id));
    console.log(newList);
    setListEnemyVegetables(newList);
  }

  function setEnemiesList(id) {
    console.log(id);
    if (enemyVegetableIds.includes(id)) {
      console.log("on l'a deja retir?? faut le remettre");
      const index = enemyVegetableIds.indexOf(id);
      enemyVegetableIds.splice(index, 1);
    } else {
      console.log("on le retire");
      enemyVegetableIds.push(id);
    }
    console.log(enemyVegetableIds);
    // misse ?? jour de la liste des l??gumes d??conseill??s
    const newList = vegetablesList.filter(vegetable => !enemyVegetableIds.includes(vegetable.id));
    console.log(newList);
    setListFriendVegetables(newList);
  }

  const checkForm = (e) => {
    console.log(e);
    e.preventDefault();
    // if (name === "") setErrorField("Vous n'avez pas saisi de nom de l??gume");
    // else { postData(); }
  };


  // const postData = () => {
  //   axios.post("https://potager-compatible-api-pg.herokuapp.com/api/vegetables", {
  //     "name": name,
  //     "startingSowingCover": startingSowingCover,
  //     "endingSowingCover": endingSowingCover,
  //     "startingSowingGround": startingSowingGround,
  //     "endingSowingGround": endingSowingGround,
  //     "startingHarvest": startingHarvest,
  //     "endingHarvest": endingHarvest,
  //     "friendVegetableIds": friendVegetableIds,
  //     "enemyVegetableIds": enemyVegetableIds,
  //   }).then((response) => {
  //     console.log(vegetablesList);
  //     const vegetableCreated = response.data;
  //     console.log(vegetableCreated);
  //     vegetablesList.push(vegetableCreated);
  //     setVegetablesList(vegetablesList.sort(function (a, b) { return a.name.localeCompare(b.name); }));
  //     console.log(vegetablesList);
  //     navigate("/vegetable-option");
  //   });
  //   console.log("Cr??ation du l??gume :");
  //   console.log(name);
  //   console.log(startingSowingCover);
  //   console.log(endingSowingCover);
  //   console.log(startingSowingGround);
  //   console.log(endingSowingGround);
  //   console.log(startingHarvest);
  //   console.log(endingHarvest);
  //   console.log(friendVegetableIds);
  //   console.log(enemyVegetableIds);
  // };

  return (
    <form onSubmit={(e) => checkForm(e)} className="form-create">
      <h1>Modifier un l??gume</h1>
      <p className="error">{errorField}</p>
      <p>
        <label>Nom du l??gume</label>
        <input placeholder="Nom" value={name} onChange={(event) => { const inputName = event.target; setName(inputName.value); }} />
      </p>
      <p>
        <label>D??but : semis int??rieur</label>
        <select onChange={(e) => setValueSelect("startingSowingCover", e.target.value)}>
          <option value={startingSowingCover}>{startingSowingCover}</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>Fin : semis int??rieur</label>
        <select onChange={(e) => setValueSelect("endingSowingCover", e.target.value)}>
          <option value={endingSowingCover}>{endingSowingCover}</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>D??but : semis ext??rieur</label>
        <select onChange={(e) => setValueSelect("startingSowingGround", e.target.value)}>
          <option value={startingSowingGround}>{startingSowingGround}</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>Fin : semis ext??rieur</label>
        <select onChange={(e) => setValueSelect("endingSowingGround", e.target.value)}>
          <option value={endingSowingGround}>{endingSowingGround}</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>D??but : R??colte</label>
        <select onChange={(e) => setValueSelect("startingHarvest", e.target.value)}>
          <option value={startingHarvest}>{startingHarvest}</option>
          {displayMonth}
        </select>
      </p>
      <p>
        <label>Fin : R??colte</label>
        <select onChange={(e) => setValueSelect("endingHarvest", e.target.value)}>
          <option value={endingHarvest}>{endingHarvest}</option>
          {displayMonth}
        </select>
      </p>

      <div className="container-list-compatibilities">
        <div className="list-friends list-compatibilities">
          <h2>L??gumes ?? associations favorable</h2>
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
          <h2>L??gumes ?? associations d??favorable</h2>
          {listEnemyVegetables.map((el) => (
            <div key={el.id}>
              <label htmlFor={`enemy${el.id}`}>{el.name}</label>

              {(vegetableToUpdate.enemyVegetableIds.includes(el.id)) ? <input selected type="checkbox"
                id={`enemy${el.id}`}
                onClick={() => setEnemiesList(el.id)}
              ></input> : <input type="checkbox"
                id={`enemy${el.id}`}
                onClick={() => setEnemiesList(el.id)}
              ></input>}


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

export default ShowVegetable;
