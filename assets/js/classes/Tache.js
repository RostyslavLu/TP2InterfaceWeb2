import GestionnaireTaches from "./GestionnaireTaches.js";
export default class Tache {

    #id;
    #tache;
    #description;
    #importance;
    #listeHTML;
    #templateTache;
    #templateDetail;
    #elementHTML;

    constructor(id, tache, description, importance, listeHTML) {
        this.#id = id;
        this.#tache = tache;
        this.#description = description;
        this.#importance = importance;
        this.#listeHTML = GestionnaireTaches.instance.liste;

        this.#templateTache = document.querySelector("[data-js-task-template]");
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");
        this.#elementHTML = document.querySelector("[data-js-task-detail]");

    }



    injecterHTML() {

        //cloner le content de #templateTache
        const clone = this.#templateTache.content.cloneNode(true);
        
        //modifier le contenu avec replace all
        const tacheContent = clone.querySelector("[data-js-task]");
        
        const elP = tacheContent.querySelector("p");
        const elTache = elP.querySelector("[data-js-tache-nom]");
        const elImportance = elP.querySelector("[data-js-tache-importance]");
        //
        elTache.textContent = elTache.textContent.replaceAll("{{TACHE}}", this.#tache);
        elImportance.textContent = elImportance.textContent.replaceAll("{{IMPORTANCE}}", this.#importance);
        //
        tacheContent.setAttribute('data-js-task', this.#id);
        tacheContent.setAttribute('data-js-importance', this.#importance);
        
        //injecter dans la liste

        this.#listeHTML.appendChild(clone);
        
        const btnDetails = tacheContent.querySelector('[data-js-action="show"]');
        const btnSupprimer = tacheContent.querySelector('[data-js-action="delete"]');
        
        
        btnDetails.addEventListener("click", this.afficherDetail.bind(this));
        btnSupprimer.addEventListener("click", this.supprimerTache.bind(this));
    }

    afficherDetail() {
        //cloner le content de #templateDetail
        
        const cloneDetail = this.#templateDetail.content.cloneNode(true);
        const tacheDetails = cloneDetail.querySelector(".detail__info");
        tacheDetails.setAttribute('data-id', this.#id);
        const elsP = tacheDetails.querySelectorAll("p");
        if (!this.#description) {
            this.#description = "Aucun description disponible";
        }
        
        elsP.forEach(element => { 
            element.textContent = element.textContent.replace("{{TACHE}}", this.#tache);
            element.textContent = element.textContent.replace("{{DESCRIPTION}}", this.#description);
            element.textContent = element.textContent.replace("{{IMPORTANCE}}", this.#importance);
        });


        //modifier le contenu avec replace all
        
        if (this.#elementHTML.hasChildNodes()) {
            //console.log("oui");
            this.#elementHTML.innerHTML = "";
            this.#elementHTML.appendChild(tacheDetails);
        } else {
            //console.log("non");
            this.#elementHTML.appendChild(tacheDetails);
        }
        //injecter dans la section du detail
    }

    async supprimerTache(id){
        //console.log(this.#listeHTML.dataset.jsTask = this.#id);
        const corps = {
            id: this.#id,
        }
        const config = {
            method:"post",
            headers:{
                "Content-type": "application/json",
            },
            body: JSON.stringify(corps),
        }
        
        try {
            const url = "api/taches/supprimerUn.php";
            const reponse = await fetch(url, config);
            const effacer = await reponse.json();
            

        } catch (erreur) {
           console.log(erreur);
        }

    }
}