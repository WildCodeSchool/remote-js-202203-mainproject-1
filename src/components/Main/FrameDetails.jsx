const FrameDetails = () => {
  return (
    <div className="modal-frame">
      <div className="modal-container">
        <button> X </button>
        <div className="title">Titre</div>
        <div className="body">
          <p>Here is my body</p>
        </div>
        <div className="footer">
          <button>précédent</button>
          <button>suivant</button>
        </div>
      </div>
    </div>
  );
};
export default FrameDetails;
