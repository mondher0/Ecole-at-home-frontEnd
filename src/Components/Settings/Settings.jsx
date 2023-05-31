// eslint-disable-next-line no-unused-vars
import React from 'react'

const Settings = () => {
  return (
    <div className='Settings'>
    <fieldset>
        <form>
            <div className='input_container half'>
                    <label htmlFor="Nom">Nom</label>
                    <input placeholder="kk" type={'text'} name="Nom"></input>
            </div>
            <div className='input_container half'>
                <label htmlFor="Prénom">Prénom</label>
                <input placeholder="kk" type={'text'} name="Prénom"></input>
            </div>                                
            <div className='input_container half'>
                <label htmlFor="email">Email</label>
                <input placeholder="kk" type={'email'} name="email"></input>
            </div>

            <div className='input_container half'>
                <label htmlFor="email">Email</label>
                <input placeholder="kk" type={'email'} name="email"></input>
            </div>
            <div className='input_container half'>
                <label htmlFor="email">Email</label>
                <input placeholder="kk" type={'email'} name="email"></input>
            </div>
            <div className='input_container half'>
                <label htmlFor="email">Email</label>
                <input placeholder="kk" type={'email'} name="email"></input>
            </div>
            <div className='input_container half'>
                <label htmlFor="email">Email</label>
                <input placeholder="kk" type={'email'} name="email"></input>
            </div>

        </form>
    </fieldset>             
</div>
  )
}

export default Settings
