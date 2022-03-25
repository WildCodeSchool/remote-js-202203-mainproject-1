import { RiCloseLine } from "react-icons/ri";
import aubergine from "../../media/aubergine.jpg";

const Vegetable = ({ handleModal, vegetable }) => {
  return (
    <>
      <div className="darkBG" onClick={() => handleModal} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">{vegetable.name}</h5>
          </div>
          <button className="closeBtn" onClick={handleModal}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modal-card-vegetable">
            <img
              src={aubergine}
              className="card-picture"
              alt="card picture"
            ></img>

            <div className="sowing-cover">
              <span>
                Semis en intérieur de {vegetable.startingSowingCover} à{" "}
                {vegetable.endingSowingCover} fin de saison
              </span>
            </div>
            <div className="sowing-ground">
              <span>
                Semis en extérieur de {vegetable.startingSowingGround} à {""}
                {vegetable.endingSowingGround}
              </span>
            </div>
            <div className="harvest">
              <span>
                Récolte de {vegetable.startingHarvest} à{" "}
                {vegetable.endingHarvest}
              </span>
            </div>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="previousBtn">précédent</button>
              <button className="nextBtn">suivant</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Vegetable;
