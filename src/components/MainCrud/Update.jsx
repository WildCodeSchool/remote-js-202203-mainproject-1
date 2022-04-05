import axios from "axios";
import { useState, useEffect } from "react";

const Update = ({ vegetablesList, setVegetablesList }) => {
  const [name, setName] = useState("");

  const [startingSowingCover, setStartingSowingCover] = useState("");
  const [endingSowingCover, setEndingSowingCover] = useState("");

  const [startingSowingGround, setStartingSowingGround] = useState("");
  const [endingSowingGround, setEndingSowingGround] = useState("");

  const [startingHarvest, setStartingHarvest] = useState("");
  const [endingHarvest, setEndingHarvest] = useState("");
  const updateAPIData = (id) => {
    axios.put(
      `https://potager-compatible-api.herokuapp.com/api/vegetables/${id}`,
      {
        name,
        startingSowingCover,
        endingSowingCover,
        startingSowingGround,
        endingSowingGround,
        startingHarvest,
        endingHarvest,
      }
    );
  };

  //   const setData = (data) => {
  //     let {
  //       id,
  //       name,
  //       startingSowingCover,
  //       endingSowingCover,
  //       startingSowingGround,
  //       endingSowingGround,
  //       startingHarvest,
  //       endingHarvest,
  //     } = data;
  //     localStorage.setItem("ID", id);
  //     localStorage.setItem("Name", name);
  //     localStorage.setItem("StartingSowingCover", startingSowingCover);
  //     localStorage.setItem("EndingSowingCover", endingSowingCover);
  //     localStorage.setItem("StartingSowingGround", startingSowingGround);
  //     localStorage.setItem("EndingSowingGround", endingSowingGround);
  //     localStorage.setItem("StartingHarvest", startingHarvest);
  //     localStorage.setItem("EndingHarvest", endingHarvest);
  //     useEffect(() => {
  //       setID(localStorage.getItem("ID"));
  //       setName(localStorage.getItem("Name"));
  //       setStartingSowingCover(localStorage.getItem("StartingSowingCover"));
  //       setEndingSowingCover(localStorage.getItem("EndingSowingCover"));
  //       setStartingSowingGround(localStorage.getItem("StartingSowingCover"));
  //       setEndingSowingGround(localStorage.getItem("EndingSowingCover"));
  //       setStartingHarvest(localStorage.getItem("StartingSowingCover"));
  //       setEndingHarvest(localStorage.getItem("EndingSowingCover"));
  //     }, []);
  //     console.log(data);
  //   };

  return (
    <div className="form-delete">
      <h1>Modifier un légume</h1>
      <div>
        <ul className="container-card-delete">
          {vegetablesList.map((vegetable) => (
            <div className="card-vegetable-delete" key={vegetable.id}>
              <div>
                <h2>{vegetable.name}</h2>
                <input
                  placeholder={vegetable.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder={vegetable.startingSowingCover}
                  onChange={(e) => setStartingSowingCover(e.target.value)}
                />
                <input
                  placeholder={vegetable.endingSowingCover}
                  onChange={(e) => setEndingSowingCover(e.target.value)}
                />
                <input
                  placeholder={vegetable.startingSowingGround}
                  onChange={(e) => setStartingSowingGround(e.target.value)}
                />
                <input
                  placeholder={vegetable.endingSowingGround}
                  onChange={(e) => setEndingSowingGround(e.target.value)}
                />
                <input
                  placeholder={vegetable.startingHarvest}
                  onChange={(e) => setStartingHarvest(e.target.value)}
                />
                <input
                  placeholder={vegetable.endingHarvest}
                  onChange={(e) => setEndingHarvest(e.target.value)}
                />
              </div>
              <button
                className="edit-btn"
                onClick={() => {
                  updateAPIData(vegetable.id);
                }}
              >
                MODIFIER
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Update;
