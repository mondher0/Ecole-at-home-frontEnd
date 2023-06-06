/* eslint-disable no-unused-vars */
import React from 'react'

const PaymentForm = () => {
  return (
    <fieldset className='payment_fs'>
        <div className='payment_methods_icons'>
            <img src='../assets/payment_method.svg' />
            <img src='../assets/visa.svg' />
            <img src='../assets/master.svg' />
        </div>
        <legend>Paiement sécurisé par carte</legend>
        <form>
            <div className='input_container'>
                    <label htmlFor="Titulaire">Titulaire de la carte :</label>
                    <input placeholder='Prénom NOM (pré rempli)' type={'text'} name="Titulaire"></input>
            </div>
            <div className='input_container'>
                <label htmlFor="Adresse">Adresse de facturation :</label>
                <input placeholder='Rue de paris' type={'text'} name="Adresse"></input>
            </div>       
            <div className='input_container half'>
                <label htmlFor="Code_postale">Code postale :</label>
                <input placeholder='75003' type={'text'} name="Code_postale"></input>
            </div>     
            <div className='input_container half'>
                <label htmlFor="Ville">Ville :</label>
                <input placeholder='Paris' type={'text'} name="Ville"></input>
            </div>                                                                                      
            <div className='input_container'>
                <label htmlFor="Numéro">Numéro de carte :</label>
                <input placeholder='*****  1121' type={'text'} name="Numéro"></input>
            </div>
            <div className='input_container half'>
                <label htmlFor="expiration">Date dexpiration :</label>
                <input type={'date'} name="expiration"></input>
            </div>
            <div className='input_container half'>
                <label htmlFor="Cryptogramme">Cryptogramme visuel : </label>
                <input placeholder='***' type={'text'} name="Cryptogramme"></input>
            </div>
            <button className='login_btn'>Valider votre abonnement</button>
            <p className='payment_desc bold'>
                Aucun paiement nest effectué,  vous serez facturé uniquement après avoir assisté au cours
            </p>
            <p className='payment_desc'>Votre moyen de paiement est sécurisé par Stripe</p>
            <p className='payment_desc'>
                En passant votre commande, vous acceptez les <span>conditions générales de vente</span>
            </p>
        </form>
    </fieldset>
  )
}

export default PaymentForm