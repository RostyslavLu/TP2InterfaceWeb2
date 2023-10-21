import GestionnaireTaches from "./GestionnaireTaches.js";
import Tache from "./Tache.js";

export default class Filtres{
    #listeHTML;
    #btnFiltreAlphabetique;
    #btnFiltreImportance;
    constructor(){
        this.#listeHTML = GestionnaireTaches.instance.liste;

        this.#btnFiltreAlphabetique = document.querySelector('[data-js-sort="tache"]');
        this.#btnFiltreImportance = document.querySelector('[data-js-sort="importance"]');
        this.#init();
    }

    #init(){
        // écouter l'événement click sur le bouton "filtrer par ordre alphabétique"
        this.#btnFiltreAlphabetique.addEventListener("click", this.filtreAlphabetique.bind(this));
        // écouter l'événement click sur le bouton "filtrer par ordre d'importance"
        this.#btnFiltreImportance.addEventListener("click", this.filtreImportance.bind(this));
    }

    /**
     * fonction pour filtrer les tâches par ordre alphabétique
     */

    filtreAlphabetique(){
        //on vide la liste
        this.#listeHTML.innerHTML = "";
        //on trie le tableau par ordre alphabétique
        GestionnaireTaches.instance.tableauTaches.sort((a, b) => {
            return a.task.localeCompare(b.task);
        });
        //on injecte les tâches dans la liste
        GestionnaireTaches.instance.tableauTaches.forEach(element => {
            
            const ajoutTache = new Tache(element.id, element.task, element.description, element.importance, this.liste);
            ajoutTache.injecterHTML();
        });
    }

    /**
     * fonction pour filtrer les tâches par ordre d'importance
     */

    filtreImportance(){
        //on vide la liste
        this.#listeHTML.innerHTML = "";
        //on trie le tableau par ordre d'importance
        GestionnaireTaches.instance.tableauTaches.sort((a, b) => {
            return a.importance - b.importance;
        });
        //on injecte les tâches dans la liste
        GestionnaireTaches.instance.tableauTaches.forEach(element => {
            
            const ajoutTache = new Tache(element.id, element.task, element.description, element.importance, this.liste);
            ajoutTache.injecterHTML();
        });
    }
}