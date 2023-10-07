import GestionnaireTaches from "./GestionnaireTaches";
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
        //modifier le contenu avec replace all
        //injecter dans la liste
    }

    afficherDetail(){
        //cloner le content de #templateDetail
        //modifier le contenu avec replace all
        //injecter dans la section du detail
    }

    supprimerTache(){
        //supprimer de la base de donnée ave fetch
        //quand c'est supprimé, on supprime #elementHTML remove
    }


}