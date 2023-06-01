/* eslint-disable no-unused-vars */
import {React, useState} from 'react'


const EditEleve = () => {
    const [pageAction, setPageAction] = useState("Modifier")
    const [inputsDisabled, setInputsDisabled] = useState(true)
  
    const handleModifierClick = () => {
      if (pageAction === "Modifier") {
        setPageAction("Enregistrer")
        setInputsDisabled(false)
      } else {
        setPageAction("Modifier")
        setInputsDisabled(true)
      }
    }    
  return (
    <div className='admin_edit_page'>
      <h3 className='current_page'>
        <span>Elèves</span>
        <span>{">"}</span>
        <span>Nicholas Patrick</span>
      </h3>
      <div className='admin_inputs_cards'>
        <div className='admin_inputs'>
          <div className='input_container2 half'>
            <label htmlFor="Nom">Nom</label>
            <input id="Nom" disabled={inputsDisabled} type="text" placeholder="Patrick"/>
          </div>
          <div className='input_container2 half'>
            <label htmlFor="Prénom ">Prénom </label>
            <input id="Prénom " disabled={inputsDisabled} type="text" placeholder="Nicholas"/>
          </div>  
          <div className='input_container2 half'>
            <label htmlFor="Téléphone">Téléphone</label>
            <input id="Téléphone" disabled={inputsDisabled} type="text" placeholder="01124548870"/>
          </div>     
          <div className='input_container2 half'>
            <label htmlFor="Email">Email</label>
            <input id="Email" disabled={inputsDisabled} type="text" placeholder="imane@gmail.com"/>
          </div>  
          <div className='input_container2 half'>
            <label htmlFor="Adresse  ">Adresse  </label>
            <input id="Adresse  " disabled={inputsDisabled} type="text" placeholder="test test"/>
          </div>   
          <div className='input_container2 half'>
            <label htmlFor="Code postale">Code postale</label>
            <input id="Code postale" disabled={inputsDisabled} type="text" placeholder="test"/>
          </div>  
          <div className='input_container2 half'>
            <label htmlFor="Ville">Ville</label>
            <input id="Ville" disabled={inputsDisabled} type="text" placeholder="test test"/>
          </div>                                   
        </div>  
      </div>

      <button className={pageAction === "Enregistrer" ? "cta green" : "cta"} onClick={handleModifierClick}>
        {pageAction}
      </button>
    </div>
  )
}

export default EditEleve