import Tache from "./Tache.js";
import Routeur from "./Routeur.js";
import Formulaire from "./Formulaire.js";
export default class GestionnaireTaches {
    
    constructor() {
        
        this.liste = document.querySelector("[data-js-tasks]");
        this.init();
        this.router = new Routeur();
        console.log(this.router);
    }

    init() {
        //Patron de conception singleton
        if (GestionnaireTaches.instance == null) {
            GestionnaireTaches.instance = this;
        } else {
            throw new Error("Un seul gestionnaire possible")
        }

        //new Tache (1, "", "", this.liste )
        window.addEventListener("load", this.recupererTacheBDD.bind(this));
        new Formulaire();
    }

    afficherAccueil() {
        this.liste.innerHTML = "";
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



}