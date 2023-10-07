import Tache from "./Tache";

export default class GestionnaireTaches{
    constructor(){
        //Patron de conception singleton
        if (GestionnaireTaches.instance == null) {
            GestionnaireTaches.instance = this;
        } else {
            console.error("Un seul gestionnaire possible");
        }
        this.liste = document.querySelector("[data-js-tasks]");
        //new Tache (1, "", "", this.liste )
    }
    recupererTacheBDD(){
        //fetch php
        //on inctancie les taches
        // pour chaque element de la base de donnée  = new Tache()
        
        ////const dsds = new Tache();
        ////dsds.afficherDetail();
        //on garde une copie de taches
    }

    afficherAccueil(){

    }
}