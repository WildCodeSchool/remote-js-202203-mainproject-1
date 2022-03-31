import React, { useState } from 'react';
import axios from 'axios';


const Create = () => {
    const [name, setName] = useState('');

    const [startingSowingCover, setStartOfSowingCover] = useState('');
    const [endingSowingCover, setEndOfSowingCover] = useState('');

    const [startingSowingGround, setStartOfSowingGround] = useState('');
    const [endingSowingGround, setEndOfSowingGround] = useState('');

    const [startingHarvest, setstartOfHarvest] = useState('');
    const [endingHarvest, setEndOfHarvest] = useState('');

    const postData = () => {
        axios.post("https://potager-compatible-api.herokuapp.com/api/vegetables", {
            name,
            startingSowingCover,
            endingSowingCover,
            startingSowingGround,
            endingSowingGround,
            startingHarvest,
            endingHarvest
        });
        console.log("Création du légume :");
        console.log(name);
        console.log(startingSowingCover);
        console.log(endingSowingCover);
        console.log(startingSowingGround);
        console.log(endingSowingGround);
        console.log(startingHarvest);
        console.log(endingHarvest);
    };

    return (
        <div className="form-create">
            <h1>Ajouter un légume</h1>

            <label>Nom du légume</label>
            <input placeholder='Nom' onChange={(e) => setName(e.target.value)}/>

            <label>Début : semis intérieur</label>
            <input placeholder='JANUARY' onChange={(e) => setStartOfSowingCover(e.target.value)}/>
            <label>Fin : semis intérieur</label>
            <input placeholder='FEBRUARY' onChange={(e) => setEndOfSowingCover(e.target.value)}/>

            <label>Début : semis extérieur</label>
            <input placeholder='JANUARY' onChange={(e) => setStartOfSowingGround(e.target.value)}/>
            <label>Fin : semis extérieur</label>
            <input placeholder='FEBRUARY' onChange={(e) => setEndOfSowingGround(e.target.value)}/>

            <label>Début : Récolte</label>
            <input placeholder='FEBRUARY' onChange={(e) => setstartOfHarvest(e.target.value)}/>
            <label>Fin : Récolte</label>
            <input placeholder='APRIL' onChange={(e) => setEndOfHarvest(e.target.value)}/>

            <button onClick={postData} type='submit'>Submit</button>
        
        </div>
    );
};

export default Create;