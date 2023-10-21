import GestionnaireTaches from "./GestionnaireTaches.js";

export default class Routeur {

    constructor() {

        this.routes = {
            "/": GestionnaireTaches.instance.afficherAccueil.bind(GestionnaireTaches.instance),
            "taches/:id": GestionnaireTaches.instance.afficherDetail.bind(GestionnaireTaches.instance),
        };

        this.init();
    }

    init() {

        //écouter au clic de la liste, on change l'url avec # et on appelle gererURL
        document.addEventListener("click", function (evenement) {
            evenement.PreventDefault;
            if (evenement.target.closest('[data-js-action="show"]')) {
                const id = evenement.target.closest("[data-js-task]").dataset.jsTask;
                const href = `#taches/${id}`;

                window.location = href;
                
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
        // on récupère le hash
        let hash = location.hash.slice(1),
            route,
            id;
        if (hash.endsWith("/")) {
            hash = hash.slice(0, -1);
        }
        // on récupère la route et l'id
        const fragments = hash.split("/");
        route = fragments[0];
        id = fragments[1];

        // on appelle la methode de la route
        // si id est défini on appelle la route avec l'id sinon on appelle la route par défaut
        if (id !== undefined) {
            this.routes[`${route}/:id`](id);
        } else if (this.routes[route]) {
            this.routes[route]();
        } else {
            this.routes["/"]();
        }

    }



}