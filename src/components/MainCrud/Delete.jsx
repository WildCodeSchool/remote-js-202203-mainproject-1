import axios from "axios";

const Delete = ({ vegetablesList }) => {
  function getVegetable(id) {
    const vegetableToName = vegetablesList.find(
      (vegetable) => vegetable.id === id
    );
    alert(vegetableToName.name + "va être supprimer");
    axios.delete(
      `https://potager-compatible-api.herokuapp.com/api/vegetables/${id}`
    );
    return typeof vegetableToName !== "undefined" ? vegetableToName.name : "";
  }

  return (
    <div className="form-delete">
      <h1>Supprimer un légume</h1>
      <div>
        <ul className="container-card-delete">
          {vegetablesList.map((vegetable) => (
            <div className="card-vegetable-delete" key={vegetable.id}>
              <h2>{vegetable.name}</h2>
              <button
                className="del-btn"
                onClick={() => getVegetable(vegetable.id)}
              >
                SUPPRIMER
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Delete;
