

const DisplayIncompatibility = ({incompatibleVegetables}) => {
    return (
        <div className=" associated" id="incompatible-vegetable">
            <h3>Associations déconseillées</h3>
            <ul>
            {incompatibleVegetables.map((vegetableName,index) => 
               <li key={index}>{vegetableName}</li> )}
        </ul>
        </div>
    );
};

export default DisplayIncompatibility;