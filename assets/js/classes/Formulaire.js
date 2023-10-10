import GestionnaireTaches from "./GestionnaireTaches.js";
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
            this.ajouterTaskBDD(tache);

        })
    }
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
        const message = await reponse.json();

        this.resetFormulaire();

        GestionnaireTaches.instance.recupererTacheBDD();
    }
    resetFormulaire(){
        this.#formulaire.task.value = "";
        this.#formulaire.description.value = "";
        let importance = this.#formulaire.querySelectorAll('[type="radio"]');
        importance.forEach((element) => element.checked = false);
    }
}