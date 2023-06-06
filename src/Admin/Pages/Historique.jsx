/* eslint-disable no-unused-vars */
import React from 'react'

const Historique = () => {
  return (
    <div className='admin_section abonnements'>        
        <div className='admin_sections_header'>
            <h2 className='admin_section_title'>
                Historique               
            </h2>
            <div className='admin_time_filter history'>
                <div className='radio_container'> 
                    <label>Elève</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>
                </div>
                <div className='radio_container'>
                    <label>Etat élève</label>                   
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>                    
                <div className='radio_container'> 
                    <label>Du:</label>                    
                    <div className="date_picker_container">
                        <input type='date'/>
                        <img src='../assets/clock_calender.svg'/>
                    </div>                    
                </div>   
                <div className='radio_container'>
                    <label>Au:</label>  
                    <div className="date_picker_container">
                        <input type='date'/>
                        <img src='../assets/clock_calender.svg' />
                    </div>  
                </div>        
                <div className='radio_container'>
                    <label>Parent</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>                                           
  
                <div className='radio_container'>
                    <label>Etat parent</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>                           
                <div className='radio_container'>
                    <label>Enfant</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>      
    
                <div className='radio_container'>
                    <label>Etat enfant</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>    
    
                <div className='radio_container'>
                    <label>Professeur</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div> 
    
                <div className='radio_container'>
                    <label>Etat professeur</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div> 
    
                <div className='radio_container'>
                    <label>Niveau</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>     
                <div className='radio_container'>
                    <label>Matière</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div> 
                <div className='radio_container'>
                    <label>Abonnement</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>                                                                                                        
                <div className='radio_container'>
                    <label>Etat Abonnement</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>       
                <div className='radio_container'>
                    <label>Cours</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>    
                <div className='radio_container'>
                    <label>Etat Cours</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>       
                <div className='radio_container'>
                    <label>Paiement</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>  
                <div className='radio_container'>
                    <label>Etat paiement</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>  
                <div className='radio_container'>
                    <label>Admin</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>  
                <div className='radio_container'>
                    <label>Automatique</label>                    
                    <div className="date_picker_container">
                        <select>
                            <option>Tous</option>
                        </select>
                    </div>                   
                </div>                                                                                                              
            </div>
        </div> 
        <div className='admin_sections_header'>
            <h2 className='admin_section_title sub'>
                Aujourd’hui            
            </h2>
            <button className='cta'>
                <img src='../assets/download_2.svg' />
                <span>Télécharger log</span>
            </button>
        </div>

        <div className='history_list'>
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/admin_sh.svg' />
                    </div>
                    <span>Elève bloqué</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/mini_logo.svg'/>
                    </div>
                    <span>Elève Suspendu</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>            
        </div>

        <div className='admin_sections_header'>
            <h2 className='admin_section_title sub'>
                18 Janvier 2022          
            </h2>
        </div>

        <div className='history_list'>
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/admin_sh.svg' />
                    </div>
                    <span>Elève bloqué</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/mini_logo.svg' />
                    </div>
                    <span>Elève Suspendu</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>          
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/mini_logo.svg'/>
                    </div>
                    <span>Elève Suspendu</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>     
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/mini_logo.svg' />
                    </div>
                    <span>Elève Suspendu</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>     
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/mini_logo.svg' />
                    </div>
                    <span>Elève Suspendu</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>     
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/mini_logo.svg' />
                    </div>
                    <span>Elève Suspendu</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>     
            <div className='history_item'>
                <div className='title'>
                    <div className='icon'>
                        <img src='../assets/mini_logo.svg' />
                    </div>
                    <span>Elève Suspendu</span>
                </div>
                <p>
                    Admin Imane Akkal a bloqué Nicholas Patrick 
                </p>
                <span className='time'>
                    18:45
                </span>
            </div>                                                                  
        </div>        
    </div>
  )
}

export default Historique