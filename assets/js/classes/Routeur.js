import GestionnaireTaches from "./GestionnaireTaches.js";

export default class Routeur {

    constructor() {

        this.routes = {
            "/": GestionnaireTaches.instance.afficherAccueil.bind(GestionnaireTaches.instance),
            "taches/id": GestionnaireTaches.instance.afficherDetail.bind(GestionnaireTaches.instance), 
        };

        //const tableau = GestionnaireTaches.instance.tableauTaches;
        //tableau[0].supprimerTache()
        this.init();
    }

    init() {

        //écouter au clic de la liste, on change l'url avec # et on appelle gererURL
        document.addEventListener("click", function (evenement) {
            evenement.PreventDefault;
            if (evenement.target.closest('[data-js-action="show"]')) {
                const id = evenement.target.closest("[data-js-task]").dataset.jsTask;

                let href = `#taches/id`;

                history.pushState({ id: id }, null, href);
                console.log(history.state);
                this.gererURL();
            }
        }.bind(this))

        // événement pour le chargement de hash dans url
        window.addEventListener("hashchange", function () {
            console.log(`The current URL hash is ${location.hash}`);
            this.gererURL();
        }.bind(this));

        //écouter l'événement popstate quand ça se déclenche on appelle gererURL
        window.addEventListener("popstate", this.gererURL.bind(this));

        this.gererURL();
    }

    gererURL() {
        //on récupère le hash

        const hash = location.hash.slice(1) || "/";
        const fragments = hash.split("/");
        let id;

        if (fragments[1] !== "" && fragments[1] !== undefined) {
            // id=?
            id = history.state.id;
          
        }

        //on récupère le id sinon appelle la page d'accueil
        const routeFinale = this.routes[hash] || this.routes["/"];
        
        if (id) {
            routeFinale(id);
            console.log(id);
        } else {
            routeFinale();
        }


        //si id le gestionnaire trouve la bonne tâche dans sa liste et appelle la fonction afficherDetail

    }



}