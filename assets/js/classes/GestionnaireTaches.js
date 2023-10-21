import Tache from "./Tache.js";
import Routeur from "./Routeur.js";
import Formulaire from "./Formulaire.js";
export default class GestionnaireTaches {
    #templateDetail;
    #elementHTML;
    constructor() {
        this.templateTache = document.querySelector("[data-js-task-template]");
        this.liste = document.querySelector("[data-js-tasks]");
        this.tableauTaches = [];
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");
        this.#elementHTML = document.querySelector("[data-js-task-detail]");
        this.init();

    }

    init() {

        //Patron de conception singleton
        if (GestionnaireTaches.instance == null) {
            GestionnaireTaches.instance = this;

        } else {
            throw new Error("Un seul gestionnaire possible");
        }
        this.router = new Routeur();
        new Formulaire();
    }

    /**
     * fonction affichage page d'accueil
     */

    afficherAccueil() {
        this.liste.innerHTML = "";
        this.recupererTacheBDD();
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

            this.tableauTaches = [];
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

            this.liste.innerHTML = "";

            //pour chaque element de tableau des tâches  = new Tache()
            this.tableauTaches.forEach(element => {

                const ajoutTache = new Tache(element.id, element.task, element.description, element.importance, this.liste);
                ajoutTache.injecterHTML();
            });


        } catch (erreur) {
            console.log(erreur);
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

    /**
     * fonction pour afficher les détails d'une tâche par son id
     * @param {*} id 
     */

    afficherDetail(id) {
        console.log(id);
        const currentTask = this.tableauTaches.find(element => element.id == id);
        
        //cloner le content de #templateDetail
        const cloneDetail = this.#templateDetail.content.cloneNode(true);
        const tacheDetails = cloneDetail.querySelector(".detail__info");
        tacheDetails.setAttribute('data-id', id);
        const elsP = tacheDetails.querySelectorAll("p");
        if (!currentTask.description) {
            currentTask.description = "Aucun description disponible";
        }
        //modifier le contenu avec replace all
        elsP.forEach(element => {
            element.textContent = element.textContent.replace("{{TACHE}}", currentTask.task);
            element.textContent = element.textContent.replace("{{DESCRIPTION}}", currentTask.description);
            element.textContent = element.textContent.replace("{{IMPORTANCE}}", currentTask.importance);
        });
        // -- injecter dans la section du detail
        //condition pour supprimer les détails d'une tâche qui a été supprimée de la liste des tâches
        if (this.#elementHTML.hasChildNodes()) {
            this.#elementHTML.innerHTML = "";
            this.#elementHTML.appendChild(tacheDetails);
        } else {

            this.#elementHTML.appendChild(tacheDetails);
        }
    }

}