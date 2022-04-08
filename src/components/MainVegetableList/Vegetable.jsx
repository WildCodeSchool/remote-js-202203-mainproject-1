import { RiCloseLine } from "react-icons/ri";
import aubergine from "../../media/aubergine.jpg";

const Vegetable = ({ handleModal, modalIsActive, vegetable, indexGarden, handleAddToGarden }) => {
  // dates semis / recolte
  const months = ["january", "february", "march", "april", "may", "june", "july",
    "august", "september", "october", "november", "december"];

  const getDates = (start, end, id) => {
    const startId = months.indexOf(start.toLowerCase());
    const endId = months.indexOf(end.toLowerCase());
    return (id >= startId && id <= endId) ? "active" : null;
  };
  return (
    <div className={modalIsActive ? "darkBG actived" : "darkBG"} onClick={() => handleModal} >

      <div className={modalIsActive ? "modal actived" : "modal"}>
        {(!modalIsActive) ? null : (
          <>
            <h2 className="heading">{vegetable.name}</h2>

            <button className="closeBtn cursor-pointer" onClick={() => handleModal(-1)}>
            </button>
            {(indexGarden !== -1) ? (
                <button className="pointer" onClick={() => handleAddToGarden(vegetable.id)}>Ajouter au potager</button>
              ) : ""}
            <div className="modal-card-vegetable">
              {/* <img
            src={aubergine}
            className="card-picture"
            alt="card picture"
          ></img> */}
              
              {vegetable.startingSowingCover !== null && vegetable.endingSowingCover !== null ? (
                <div className="sowing-cover">
                  <h3>Période de semis en intérieur</h3>
                  {months.map((month, index) => (
                    <span className={getDates(vegetable.startingSowingCover, vegetable.endingSowingCover, index)} key={index}>{month.substring(0, 1).toUpperCase()}</span>))}

                </div>
              ) : ""}

              {vegetable.startingSowingGround !== null && vegetable.endingSowingGround !== null ? (
                <div className="sowing-ground">
                  <h3>Période de semis en extérieur</h3>
                  {months.map((month, index) => (
                    <span className={getDates(vegetable.startingSowingGround, vegetable.endingSowingGround, index)} key={index}>{month.substring(0, 1).toUpperCase()}</span>))}
                </div>
              ) : ""}

              {vegetable.startingHarvest !== null && vegetable.endingHarvest !== null ? (
                <div className="harvest">
                  <h3>Période de récolte/floraison</h3>
                  {months.map((month, index) => (
                    <span className={getDates(vegetable.startingHarvest, vegetable.endingHarvest, index)} key={index}>{month.substring(0, 1).toUpperCase()}</span>))}
                </div>
              ) : ""}
            </div>
          </>
        )}
      </div>

    </div>
  );
};
export default Vegetable;
