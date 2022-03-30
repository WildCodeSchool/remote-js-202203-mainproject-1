

const DisplayCompatibility = ({compatibleVegetables, getVegetable}) => {
    return (
        <div id="compatible-vegetable">
            <h3>Légumes conseillés</h3>
            <ul>
            {compatibleVegetables.map(vegetableId => 
               <li key={vegetableId}>{getVegetable(vegetableId)}</li> )}
            </ul>
        </div>
    );
};

export default DisplayCompatibility;