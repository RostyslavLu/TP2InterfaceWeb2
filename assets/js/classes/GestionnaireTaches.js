import Tache from "./Tache.js";
import Routeur from "./Routeur.js";
import Formulaire from "./Formulaire.js";
export default class GestionnaireTaches {

    constructor() {
        this.liste = document.querySelector("[data-js-tasks]");
        this.init();
        this.router = new Routeur();
        this.tableauTaches = [];
    }

    init() {
        //Patron de conception singleton
        if (GestionnaireTaches.instance == null) {
            GestionnaireTaches.instance = this;
        } else {
            throw new Error("Un seul gestionnaire possible")
        }

        window.addEventListener("load", this.recupererTacheBDD.bind(this));
        new Formulaire();
    }

    /**
     * fonction affichage page d'accueil
     */

    afficherAccueil() {
        this.liste.innerHTML = "";
    }

    /**
     * fonction pour recuperer les tâches de la base de donnée
     */

    async recupererTacheBDD() {
        //fetch php
        //inctancié les tâches
        
        try {
            const url = "api/taches/rechercherTout.php";
            const reponse = await fetch(url);
            const listeTache = await reponse.json();
            //on garde une copie de tâches
            if (listeTache.length > 0) {
                listeTache.forEach(element => {

                    const ajout = {
                        id: element.id,
                        task: element.tache,
                        description: element.description,
                        importance: element.importance,
                    }
                    this.tableauTaches.push(ajout);

                });

            }
            //pour chaque element de tableau des tâches  = new Tache()
            this.tableauTaches.forEach(element => {
                const ajoutTache = new Tache(element.id, element.task, element.description, element.importance, this.liste);
                ajoutTache.injecterHTML();
            })

        } catch (erreur) {
            this.afficherAccueil();
        }
    }

    /**
     * fonction pour ajouter tâche dans tableau des tâches
     * @param {*} tache 
     * @param {*} id 
     */

    ajouterTache(tache, id) {

        const ajout = {
            id: id.message,
            task: tache.task,
            description: tache.description,
            importance: tache.importance,
        }

        this.tableauTaches.push(ajout);

        const nouvelleTache = new Tache(id.message, tache.task, tache.description, tache.niveaux, this.liste);
        nouvelleTache.injecterHTML();
    }

}