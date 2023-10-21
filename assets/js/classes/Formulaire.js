import GestionnaireTaches from "./GestionnaireTaches.js";
import ValidationFormulaire from "./ValidationFormulaire.js";
export default class Formulaire{
    #formulaire;
    
    constructor(){
        this.#formulaire = document.querySelector("[data-js-form]");
        this.init();
    }
    init(){
        this.#formulaire.addEventListener("submit", (evenement) => {
            evenement.preventDefault();

            const tache = {
                task: this.#formulaire.task.value,
                description: this.#formulaire.description.value,
                niveaux: this.#formulaire.importance.value,
            };
            // validation formulaire
            if (!ValidationFormulaire.estVide(tache.task) && ValidationFormulaire.estRadioSelectionne("importance")) {
                this.ajouterTaskBDD(tache);
            } else {
                this.error();
            }

        })
    }
    /**
     * fonction pour ajouter tâche a la base de donnée
     * @param {*} tache 
     */
    async ajouterTaskBDD(tache){

        const config = {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(tache),
        };

        const url = "api/taches/ajouterUn.php";
        
        const reponse = await fetch(url, config);
        const id = await reponse.json();
        
        this.resetFormulaire();
        
        GestionnaireTaches.instance.ajouterTache(tache, id);
    }
    /**
     * fonction pour met à zéro les inputs des formulaire
     */

    resetFormulaire(){

        this.#formulaire.task.value = "";
        this.#formulaire.description.value = "";
        let importance = this.#formulaire.querySelectorAll('[type="radio"]');
        importance.forEach((element) => element.checked = false);
        this.#formulaire.classList.remove("error");

    }
    error(){

        this.#formulaire.classList.add("error");
    }
}