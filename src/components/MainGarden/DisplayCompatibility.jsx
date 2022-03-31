

const DisplayCompatibility = ({compatibleVegetables}) => {
    return (
        <div id="compatible-vegetable">
            <h3>Associations conseillées</h3>
            <ul>
            {compatibleVegetables.map((vegetableName,index) => 
               <li key={index}>{vegetableName}</li> )}
            </ul>
        </div>
    );
};

export default DisplayCompatibility;