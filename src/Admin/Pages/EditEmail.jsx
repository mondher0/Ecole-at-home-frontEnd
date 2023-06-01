import React from 'react'
import '../css/EditEmail.css'


const EditMail = () => {
  return (
    <div>
      <h3 className='current_page'>
        <span>Emails</span>
        <span>{">"}</span>
        <span>Ajouter un modèle</span>
      </h3>     
      <div className='email_editor'>
        <div className='top_bar'>
            Ercivez quelque chose...
        </div>
        <div className='email_content'>
            <input type="text" placeholder="A"/>
            <input type="text" placeholder="Object"/>
            <textarea placeholder='Text ...'></textarea>            
        </div>
        <div className='bottom_bar'>
            <div className='tools'>
                <button className='cta'>Enregistrer</button>
                <img src="../assets/A.svg"/>
                <img src="../assets/clip.svg"/>
                <img src="../assets/add_link.svg"/>
                <img src="../assets/emoji.svg"/>
                <img src="../assets/drive.svg"/>
                <img src="../assets/image.svg"/>
                <img src="../assets/time_lock.svg"/>
                <img src="../assets/pen.svg"/>
                <div>
                    <img src="../assets/three_dots.svg"/>
                    <img src="../assets/delete_fill.svg"/>
                </div>                
            </div>
        </div>        
    </div>   
    </div>
  )
}

export default EditMail