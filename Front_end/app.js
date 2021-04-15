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
        resolve(JSON.parse(this.responseText)); /*analyse une chaine JSON pour la traduire en JS */
      } else {
      } /* vérification de l'état de la requete : selon les codes serveur : 200 tt est ok 400 erreur, sinon c'est qu'il y aun problèmeS*/
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + idOursons); /* lien vers l'API des teddies  = Id des produits*/
    request.send(); /* requete envoyée */
  });
}; (console.log(getAllTeddies))


/**************** PAGE INDEX LISTE DES TEDDIES ********************************/

async function loadTeddies() {
  const teddies = await getAllTeddies(); 
  /* on affecte le résultat de la fonction getAllTeddies à la const teddies. 
  on attend que getAllTeddies soit terminée avt de continuer l'excécution de LoadTeddies (= promise) 
  car on ne sait pas cbien de temps mettra la réponse serveur.*/

  /* Lien avec la page index HTML */

  let listeProduit = document.getElementById("listeProduit"); /* variable pour emmener les éléments de l'API vers l'index.html */
  console.log(loadTeddies)

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
  let detailAction = document.getElementById("ajout_panier");

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
  detailInformationPrix.appendChild(detailAction);

  /* Contenu des balises produit HTML */

  detailNom.textContent = detailTeddies.name;
  detailDescription.textContent = detailTeddies.description;
  detailPrix.textContent = " Prix : " + detailTeddies.price / 100 + " €";

  detailTeddies.colors.forEach((teddy) => {
    let choixOption = document.createElement("option");
    document
      .getElementById("choix_option")
      .appendChild(choixOption).innerHTML = teddy;
  });
 
}

/******** Panier de l'acheteur ***********/

let panier = JSON.parse(localStorage.getItem("panier"));

/* Vérification et initialisation du panier */

if (localStorage.getItem("panier")) {
  console.log(panier);
} else {
  console.log("Le panier va être initalisé");
  let panierInit = [];
  localStorage.setItem("panier", JSON.stringify(panierInit));
}

/* Ajout de l'article au panier de l'utilisateur */

ajoutPanier = () => {
  let acheter = document.getElementById("ajout_panier");
  acheter.addEventListener("click", async function () {
    const ajout = await getAllTeddies();
    panier.push(ajout);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Le produit a été ajouté au panier");
    alert("Cet article a été ajouté dans votre panier");
    location.reload();
  });
};

/************** PAGE PANIER **************/

panierCreation = () => {
  if (panier.length > 0) {
    document.getElementById("panierVide").remove();

    /* Création de la structure du tableau récapitulatif*/

    let recap = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let recapPhoto = document.createElement("th");
    let recapNom = document.createElement("th");
    let recapPrixUnitaire = document.createElement("th");
    let recapRemove = document.createElement("th");
    let ligneTotal = document.createElement("tr");
    let colonneTotal = document.createElement("th");
    let recapPrixPaye = document.createElement("td");

    /* Placement de la structure dans la page */

    let recapPanier = document.getElementById("panier-recap");
    recapPanier.appendChild(recap);
    recap.appendChild(ligneTableau);
    ligneTableau.appendChild(recapPhoto);
    ligneTableau.appendChild(recapNom);
    ligneTableau.appendChild(recapPrixUnitaire);
    ligneTableau.appendChild(recapRemove);

    /* contenu des entetes */

    recapPhoto.textContent = "Article";
    recapNom.textContent = "Nom";
    recapPrixUnitaire.textContent = "Prix";
    recapRemove.textContent = "Supprimer";

  
    /* Boucle FOR pour affichage des articles dans le panier*/ 
     
    for (let i = 0; i<panier.length; i++) {
    
      /* Création des lignes du tableau */ 

      let ligneArticle = document.createElement("tr");
      let photoArticle = document.createElement("img");
      let nomArticle = document.createElement("td");
      let prixUnitArticle = document.createElement("td");
      let supprimerArticle = document.createElement("td");
      let removeArticle = document.createElement("i");

      /* Attribution des class ou Id */

      ligneArticle.setAttribute("id", "article" + [i]);
      photoArticle.setAttribute("class", "photo_article");
      photoArticle.setAttribute("src", panier[i].imageUrl);
      photoArticle.setAttribute("alt", "Photo de l'article commandé");
      removeArticle.setAttribute("id", "remove" + [i]);
      removeArticle.setAttribute("class", "fas fa-times-circle fa-3x circle");
      removeArticle.setAttribute("title", "Supprimer");

      console.log(i);

      /* Supprimer un produit du panier */ 
      
      removeArticle.addEventListener("click", (event) => {this.annulerArticle(i);})

      /* Agencement de la structure HTML */

      recap.appendChild(ligneArticle);
      ligneArticle.appendChild(photoArticle);
      ligneArticle.appendChild(nomArticle);
      ligneArticle.appendChild(prixUnitArticle);
      ligneArticle.appendChild(supprimerArticle);
      supprimerArticle.appendChild(removeArticle);

      /* Contenu de chaque ligne */

      nomArticle.textContent = panier[i].name;
      prixUnitArticle.textContent = panier[i].price / 100 + " €";
      console.log(panier[i].name);
      
    };


    /* Dernière ligne du tableau : Total */

    recap.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneTotal);
    ligneTotal.setAttribute("id", "ligneSomme");
    colonneTotal.textContent = "Montant total de votre panier";
    ligneTotal.appendChild(recapPrixPaye);

    recapPrixPaye.setAttribute("id", "sommeTotal");
    recapPrixPaye.setAttribute("colspan", "4");
    colonneTotal.setAttribute("id", "colonneTotal");
    colonneTotal.setAttribute("colspan", "2");

    /* Calcul de l'addition total */

    let sommeTotal = 0;
    panier.forEach((panier) => {
      sommeTotal += panier.price / 100;
    });

    /* Affichage du prix total à payer dans l'addition */
    console.log(sommeTotal);
    document.getElementById("sommeTotal").textContent = sommeTotal + " €";
  }
};

/* supprimer un produit */

annulerArticle = (i) => {
  panier.splice(i, 1);
  localStorage.clear();
  /* Mise à jour du nouveau panier avec suppression de l'article */
  localStorage.setItem("panier", JSON.stringify(panier));
  /* Mise à jour de la page pour affichage de la suppression au client */
  window.location.reload();
};  



