import { RiCloseLine } from "react-icons/ri";
import aubergine from "../../media/aubergine.jpg";

const Vegetable = ({ handleModal, vegetable, limitsList, indexGarden, handleAddToGarden }) => {
    // dates semis / recolte
    const months = ["january", "february", "march", "april", "may", "june", "july",
    "august", "september", "october", "november", "december"];

  const getDates = (start, end, id) => {
    const startId = months.indexOf(start.toLowerCase());
    const endId = months.indexOf(end.toLowerCase());
    return (id >= startId && id <= endId) ? "active" : "";
  };
  return (
    <>
      <div className="darkBG" onClick={() => handleModal} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">{vegetable.name}</h5>
          </div>
          <button className="closeBtn" onClick={() => handleModal(-1)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modal-card-vegetable">
            <img
              src={aubergine}
              className="card-picture"
              alt="card picture"
            ></img>
            {(indexGarden !== -1) ? (
              <button className="pointer" onClick={() => handleAddToGarden(vegetable.id)}>Ajouter au potager</button>
            ) : ""}
            {vegetable.startingSowingCover !== null && vegetable.endingSowingCover !== null ? (
              <div className="sowing-cover">
                <p>Semis en intérieur</p>
                {months.map((month, index) => (
                  <span className={getDates(vegetable.startingSowingCover, vegetable.endingSowingCover, index)} key={index}>{month.substring(0, 1).toUpperCase()}</span>))}

              </div>
            ) : ""}

            {vegetable.startingSowingGround !== null && vegetable.endingSowingGround !== null ? (
              <div className="sowing-ground">
                <p>Semis en extérieur</p>
                {months.map((month, index) => (
                  <span className={getDates(vegetable.startingSowingGround, vegetable.endingSowingGround, index)} key={index}>{month.substring(0, 1).toUpperCase()}</span>))}
              </div>
            ) : ""}

            {vegetable.startingHarvest !== null && vegetable.endingHarvest !== null ? (
              <div className="harvest">
                <p>Récolte</p>
                {months.map((month, index) => (
                  <span className={getDates(vegetable.startingHarvest, vegetable.endingHarvest, index)} key={index}>{month.substring(0, 1).toUpperCase()}</span>))}
              </div>
            ) : ""}
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              {vegetable.id > 1 ? (
                <button
                  className="previousBtn"
                  onClick={() => handleModal(vegetable.id - 1)}
                >
                  précédent
                </button>
              ) : (
                ""
              )}

              {vegetable.id < limitsList ? (
                <button
                  className="nextBtn"
                  onClick={() => handleModal(vegetable.id + 1)}
                >
                  suivant
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Vegetable;
