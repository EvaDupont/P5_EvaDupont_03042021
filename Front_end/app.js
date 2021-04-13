/*Requete AJAX  pour se connecter au serveur attendre la réponse du serveur */

getAllTeddies = () => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest(); /*lancement de la requete http*/
    request.onreadystatechange = function () {
      if (
        this.readyState == XMLHttpRequest.DONE && 
        this.status >= 200 &&
        this.status < 400
      ) {
        resolve(JSON.parse(this.responseText));
        console.log("Connecté");
      } else {
      } /* vérification de l'état de la requete : selon les codes serveur : 200 tt est ok 400 erreur, sinon c'est qu'il y aun problèmeS*/
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + idOursons); /* lien vers l'API des teddies  = Id des produits*/
    request.send(); /* requete envoyée */
  });
};

async function loadTeddies() {
  const teddies = await getAllTeddies(); /* on affecte le résultat de la fonction getAllTeddies à la const teddies. 
  on attend que getAllTeddies soit terminée avt de continuer l'excécution de LoadTeddies (= promise) 
  car on ne sait pas cbien de temps mettra la réponse serveur.*/

  /* Lien avec la page index HTML */

  let listeProduit = document.getElementById("listeProduit"); /* variable pour emmener les éléments de l'API vers l'index.html */

  /* création des cartes produit dans l'index HTML */

  teddies.forEach((teddy) => { /* creation de vériable pour creer la structure sous le fichier html */
    let produitContenant = document.createElement("section");
    let produitIllustration = document.createElement("div");
    let produitElement = document.createElement("div");
    let produitPhoto = document.createElement("img");
    let produitNom = document.createElement("h3");
    let produitDescription = document.createElement("p");
    let produitPrix = document.createElement("p");
    let produitBtn = document.createElement("a");

    /*Ajout des attributs au balise index HTML */
    produitContenant.setAttribute("class", "produit_card");
    produitIllustration.setAttribute("class", "produit_illustration");
    produitPhoto.setAttribute("src", teddy.imageUrl);
    produitPhoto.setAttribute("alt", "Photo de l'ours en peluche");
    produitElement.setAttribute("class", "produit_element");
    produitNom.setAttribute("class", "produit_nom");
    produitDescription.setAttribute("class", "produit_description");
    produitPrix.setAttribute("class", "produit_prix");
    produitBtn.setAttribute("href", "produits.html?id=" + teddy._id); /*lien vers la page produit via l'ID de l'ourson */

    /* Agencement des éléments index HTML */
    listeProduit.appendChild(produitContenant);
    produitContenant.appendChild(produitIllustration);
    produitIllustration.appendChild(produitPhoto);
    produitContenant.appendChild(produitElement);
    produitElement.appendChild(produitNom);
    produitElement.appendChild(produitDescription);
    produitElement.appendChild(produitPrix);
    produitElement.appendChild(produitBtn);

    /* Contenu des balises index HTML */
    produitNom.textContent = teddy.name;
    produitDescription.textContent = teddy.description;
    produitPrix.textContent = "Prix : " + teddy.price / 100 + " €";
    produitBtn.textContent = "Découvrir " + teddy.name;
  });
}

/******************** PAGE PRODUITS ************************************/

let idOursons = "";

async function detailTeddies() {
  idOursons = location.search.substring(4);
  const detailTeddies = await getAllTeddies();

   /* Lien avec la page produit HTML */

 let detailProduit = document.getElementById("detailProduit");

 /* création de la structure produit HTML */

 let detailContenant = document.createElement("section");
 let detailIllustration = document.createElement("div");
 let detailElement = document.createElement("div");
 let detailPhoto = document.createElement("img");
 let detailNom = document.createElement("h3");
 let detailDescription = document.createElement("p");
 let detailInformationPrix = document.createElement("div");
 let detailPrix = document.createElement("p");
 let detailOption = document.getElementById("detailOption");
 //let detailAction = document.getElementById("ajout_panier");

 /*Ajout des attributs au balise produit HTML */
 detailContenant.setAttribute("class", "detail_contenant");
 detailIllustration.setAttribute("class", "detail_illustration");
 detailPhoto.setAttribute("src", detailTeddies.imageUrl);
 detailPhoto.setAttribute("alt", "Photo de " + detailTeddies.name);
 detailElement.setAttribute("class", "detail_element");
 detailNom.setAttribute("class", "detail_nom");
 detailDescription.setAttribute("class", "detail_description");
 //detailInformationPrix.setAttribute("class", "detail_information_prix");
 detailPrix.setAttribute("class", "detail_prix");

 /* Agencement des éléments produit HTML */
 detailProduit.appendChild(detailContenant);
 detailContenant.appendChild(detailIllustration);
 detailIllustration.appendChild(detailPhoto);
 detailContenant.appendChild(detailElement);
 detailElement.appendChild(detailNom);
 detailElement.appendChild(detailDescription);
 detailContenant.appendChild(detailInformationPrix);
 detailInformationPrix.appendChild(detailPrix);
 detailInformationPrix.appendChild(detailOption);
 //detailInformationPrix.appendChild(detailAction);

 /* Contenu des balises produit HTML */
 detailNom.textContent = detailTeddies.name;
 detailDescription.textContent = detailTeddies.description;
 detailPrix.textContent = " Prix unitaire : " + detailTeddies.price / 100 + " €";

 detailTeddies.colors.forEach((teddy) => {
   let choixOption = document.createElement("option");
   document
     .getElementById("choix_option")
     .appendChild(choixOption).innerHTML = teddy;
 });
 
}


/*en JS : document.getElementById("price").innerHTML = "Total : "+prix  pour affaiche rle prix total */