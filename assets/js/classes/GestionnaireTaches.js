import Tache from "./Tache.js";
//import Routeur from "./Routeur";
export default class GestionnaireTaches {
    constructor() {
        //Patron de conception singleton
        if (GestionnaireTaches.instance == null) {
            GestionnaireTaches.instance = this;
        } else {
            console.error("Un seul gestionnaire possible");
        }
        this.liste = document.querySelector("[data-js-tasks]");

        //new Tache (1, "", "", this.liste )
        window.addEventListener("load", this.recupererTacheBDD.bind(this));
        
    }
    init() {
        
    }

    async recupererTacheBDD() {
        //fetch php
        //inctancié les tâches
        //pour chaque element de la base de donnée  = new Tache()
        try {
            const url = "api/taches/rechercherTout.php";
            const reponse = await fetch(url);
            const listeTache = await reponse.json();
            
            if (listeTache.length > 0) {
                listeTache.forEach(element => {

                    const ajoutTache = new Tache(element.id, element.tache, element.description, element.importance, this.liste);
                    ajoutTache.injecterHTML();
                });
                
            }
            ////const dsds = new Tache();
            ////dsds.afficherDetail();
            //on garde une copie de taches
        } catch (erreur) {
            this.afficherAccueil();
        }
    }

    afficherAccueil() {
        console.log("accueil");
    }

}