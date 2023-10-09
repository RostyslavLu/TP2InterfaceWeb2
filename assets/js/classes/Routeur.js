import GestionnaireTaches from "./GestionnaireTaches.js";
export default class Routeur{
    
    #routes;
    
    constructor(){
         this.#routes = {
             "/": GestionnaireTaches.instance.afficherAccueil.bind(GestionnaireTaches.instance),
             //"id": GestionnaireTaches.instance.
         };
    }

    init(){
        //écouter au clic de la liste, on change l'url avec # et on appelle gererURL
        window.addEventListener("popstate", function(){
            this.gererURL();
        }.bind(this));
        //écouter l'événement popstate quan ça se déclence on appelle gererURL
    }

    gererURL(){
        //on récupère le hash
        const hash = location.hash.slice(1) || "/";
        const fragments = hash.split("/");
        const route = fragments[0];

        if (this.#routes[route]) {
            this.#routes[route](fragments[1]);
        } else {
            location.hash = "/";
        }
        //on récupère le id sinon appelle la page d'accueil
        //si id le gestionnaire trouve la bonne tâche dans sa liste et appelle la fonction afficherDetail
    }

}