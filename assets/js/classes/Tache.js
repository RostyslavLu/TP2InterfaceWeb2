import GestionnaireTaches from "./GestionnaireTaches.js";
export default class Tache{

    #id;
    #tache;
    #description;
    #importance;
    #listeHTML;
    #templateTache;
    #templateDetail;
    #elementHTML;

    constructor(id, tache, description, importance, listeHTML){
        this.#id = id;
        this.#tache = tache;
        this.#description = description;
        this.#importance = importance;
        this.#listeHTML = GestionnaireTaches.instance.liste;

        this.#templateTache = document.querySelector("[data-js-task-template]");
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");
        this.#elementHTML;
        
    }

    

    injecterHTML(){

        //cloner le content de #templateTache
        const clone = this.#templateTache.content.cloneNode(true);

        //modifier le contenu avec replace all
        const tacheContent = clone.querySelector("[data-js-task]");
        const elP = tacheContent.querySelector("p");
        const elTache = elP.querySelector("[data-js-tache-nom]");
        const elImportance = elP.querySelector("[data-js-tache-importance]");
       
        elTache.textContent = elTache.textContent.replaceAll("{{TACHE}}", this.#tache);
        elImportance.textContent = elImportance.textContent.replaceAll("{{IMPORTANCE}}", this.#importance);
        tacheContent.setAttribute('data-js-task', this.#id);
        tacheContent.setAttribute('data-js-importance', this.#importance);

        //injecter dans la liste
        this.#listeHTML.appendChild(clone);
        const btnDetails = this.#listeHTML.querySelector('[data-js-action="show"]');
        const btnSupprimer = this.#listeHTML.querySelector('[data-js-action="delete"]');
        console.log(btnDetails);
        console.log(btnSupprimer);
   
    }

    afficherDetail(){
        //cloner le content de #templateDetail
        const clone = this.#templateDetail.content.cloneNode(true);

        //modifier le contenu avec replace all
        const tacheContent = clone.querySelector("[data-js-task-detail]");
        //const 
        //injecter dans la section du detail
    }
        
    supprimerTache(){
        //supprimer de la base de donnée ave fetch
        //quand c'est supprimé, on supprime #elementHTML remove
    }


}