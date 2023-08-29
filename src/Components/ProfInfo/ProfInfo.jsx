const ProfInfo = () => {
  return (
    <div className="pop_up_container">
    <div className="pop_up edit">
      <div className="prof_edit_top">
        <img src="../assets/empty_avatar.png" />
        <div className="text">
          <h2 className="user_name">Patrick Nicholas</h2>
          <span>Ingénieur détat en génie des procédés</span>
        </div>
      </div>
      <div className="inscription_validation">
        <table>
          <h4 className="table_title">Niveaux</h4>
          <div className="items_container">
            <div className="tab_col">
              <div className="item title">
                <label>Primaire</label>
              </div>
              <div className="item">
                <input id="CP" type={"checkbox"} />
                <label htmlFor="CP">CP</label>
              </div>
              <div className="item">
                <input id="CE1" type={"checkbox"} />
                <label htmlFor="CE1">CE1</label>
              </div>
              <div className="item">
                <input id="CE2" type={"checkbox"} />
                <label htmlFor="CE2">CE2</label>
              </div>
              <div className="item">
                <input id="CM1" type={"checkbox"} />
                <label htmlFor="CM1">CM1</label>
              </div>
              <div className="item">
                <input id="CM2" type={"checkbox"} />
                <label htmlFor="CM2">CM2</label>
              </div>
            </div>
            <div className="tab_col">
              <div className="item title">
                <label>College</label>
              </div>
              <div className="item">
                <input id="Sixième" type={"checkbox"} />
                <label htmlFor="Sixième">Sixième</label>
              </div>
              <div className="item">
                <input id="Cinquième" type={"checkbox"} />
                <label htmlFor="Cinquième">Cinquième</label>
              </div>
              <div className="item">
                <input id="Quatrième" type={"checkbox"} />
                <label htmlFor="Quatrième">Quatrième</label>
              </div>
              <div className="item">
                <input id="Troisième" type={"checkbox"} />
                <label htmlFor="Troisième">Troisième</label>
              </div>
            </div>
            <div className="tab_col">
              <div className="item title">
                <label>Lycée</label>
              </div>
              <div className="item">
                <input id="Seconde" type={"checkbox"} />
                <label htmlFor="Seconde">Seconde</label>
              </div>
              <div className="item">
                <input id="Première" type={"checkbox"} />
                <label htmlFor="Première">Première</label>
              </div>
              <div className="item">
                <input id="Première STI2D" type={"checkbox"} />
                <label htmlFor="Première STI2D">Première STI2D</label>
              </div>
              <div className="item">
                <input id="Première STMG" type={"checkbox"} />
                <label htmlFor="Première STMG">Première STMG</label>
              </div>
              <div className="item">
                <input id="Terminale" type={"checkbox"} />
                <label htmlFor="Terminale">Terminale</label>
              </div>
              <div className="item">
                <input id="Terminale STI2D" type={"checkbox"} />
                <label htmlFor="Terminale STI2D">Terminale STI2D</label>
              </div>
              <div className="item">
                <input id="Terminale STMG" type={"checkbox"} />
                <label htmlFor="Terminale STMG">Terminale STMG</label>
              </div>
            </div>
          </div>
        </table>
        <table>
          <h4 className="table_title">Matières</h4>
          <div className="items_container">
            <div className="tab_col">
              <div className="item title">
                <label>Sciences</label>
              </div>
              <div className="item">
                <input id="Maths" type={"checkbox"} />
                <label htmlFor="Maths">Maths</label>
              </div>
              <div className="item">
                <input id="Physique-chimie" type={"checkbox"} />
                <label htmlFor="Physique-chimie">Physique-chimie</label>
              </div>
              <div className="item">
                <input id="SVT" type={"checkbox"} />
                <label htmlFor="SVT">SVT</label>
              </div>
              <div className="item">
                <input id="Sciences de l'ingénieur" type={"checkbox"} />
                <label htmlFor="Sciences de l'ingénieur">
                  Sciences de lingénieur
                </label>
              </div>
            </div>
            <div className="tab_col">
              <div className="item title">
                <label>Sciences humaines</label>
              </div>
              <div className="item">
                <input id="Français" type={"checkbox"} />
                <label htmlFor="Français">Français</label>
              </div>
              <div className="item">
                <input id="Histoire-géo" type={"checkbox"} />
                <label htmlFor="Histoire-géo">Histoire-géo</label>
              </div>
              <div className="item">
                <input id="Philosophie" type={"checkbox"} />
                <label htmlFor="Philosophie">Philosophie</label>
              </div>
              <div className="item">
                <input id="SES" type={"checkbox"} />
                <label htmlFor="SES">SES</label>
              </div>
            </div>
            <div className="tab_col">
              <div className="item title">
                <label>Langues</label>
              </div>
              <div className="item">
                <input id="Anglais" type={"checkbox"} />
                <label htmlFor="Anglais">Anglais</label>
              </div>
              <div className="item">
                <input id="Espagnol" type={"checkbox"} />
                <label htmlFor="Espagnol">Espagnol</label>
              </div>
              <div className="item">
                <input id="Expression Orale" type={"checkbox"} />
                <label htmlFor="Expression Orale">Expression Orale</label>
              </div>
              <div className="item">
                <input id="Mandarin" type={"checkbox"} />
                <label htmlFor="Mandarin">Mandarin</label>
              </div>
            </div>
          </div>
        </table>
        <table className="timing">
          <h4 className="table_title">Disponiblités</h4>
          <div className="items_container">
            <div className="tab_col">
              <div className="item empty">
                <label>.</label>
              </div>
              <div className="item">
                <label>Lundi</label>
              </div>
              <div className="item">
                <label>Mardi</label>
              </div>
              <div className="item">
                <label>Mercredi</label>
              </div>
              <div className="item">
                <label>Jeudi</label>
              </div>
              <div className="item">
                <label>Vendredi</label>
              </div>
              <div className="item">
                <label>Samedi</label>
              </div>
              <div className="item">
                <label>Dimanche</label>
              </div>
            </div>
            <div className="tab_col">
              <div className="item">
                <span>Matin 08-12</span>
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
            </div>
            <div className="tab_col">
              <div className="item">
                <span>Matin 08-12</span>
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
            </div>
            <div className="tab_col">
              <div className="item">
                <span>Matin 08-12</span>
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
            </div>
            <div className="tab_col">
              <div className="item">
                <span>Matin 08-12</span>
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
              <div className="item timing">
                <input id="" type={"checkbox"} />
              </div>
            </div>
          </div>
        </table>
        <div className="max">
          <h3>Nombre de cours maximum à pourvoir donner par semaine</h3>
          <input placeholder="1" type={"text"} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProfInfo
