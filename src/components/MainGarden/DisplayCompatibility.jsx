

const DisplayCompatibility = ({compatibleVegetables,indexGarden,handleAddToGarden}) => {
    return (
        <div className=" associated" id="compatible-vegetable">
            <h3>Associations conseillées</h3>
            <ul>
            {compatibleVegetables.map((vegetable) => 
               <li key={vegetable.id}>{vegetable.name}{(indexGarden !== -1) ? (
                <button className="pointer btn-add-vegetable associated" onClick={() => handleAddToGarden(vegetable.id)}>Ajouter au potager</button>
              ) : null}</li> )}
            </ul>
        </div>
    );
};

export default DisplayCompatibility;