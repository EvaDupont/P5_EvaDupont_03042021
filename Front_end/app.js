/*Requete AJAX  pour se connecter au serveur attendre la réponse du serveur */

getAllTeddies = () => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest(); /*lancement de la requete http*/
    request.onreadystatechange = function () {
      if (
        this.readyState == XMLHttpRequest.DONE && 
        this.status >= 200 &&
        this.status < 400
      )
      {
        resolve(JSON.parse(this.responseText));
        /*analyse une chaine JSON pour la traduire en JS */
      } 
      else {
      } /* vérification de l'état de la requete : selon les codes serveur : 200 tt est ok 400 erreur, sinon c'est qu'il y aun problèmeS*/
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + idOursons); /* lien vers l'API des teddies  = Id des produits*/
    request.send(); /* requete envoyée */
  });
}; 

/**************** PAGE INDEX LISTE DES TEDDIES ********************************/

async function loadTeddies() { /*les données sont récupérées*/
  const teddies = await getAllTeddies(); 
  /* on affecte le résultat de la fonction getAllTeddies à la const teddies. 
  on attend que getAllTeddies soit terminée avt de continuer l'excécution de LoadTeddies (= promise) 
  car on ne sait pas cbien de temps mettra la réponse serveur.*/

  /* Lien avec la page index HTML */

  let listeProduit = document.getElementById("listeProduit"); /* variable pour emmener les éléments de l'API vers l'index.html */
  console.log(teddies)

  /* création des cartes produit dans l'index HTML */

  teddies.forEach((teddy) => { /* creation de variables pour creer la structure sous le fichier html */
    let produitContenant = document.createElement("section");
    let produitIllustration = document.createElement("div");
    let produitElement = document.createElement("div");
    let produitPhoto = document.createElement("img");
    let produitNom = document.createElement("h3");
    let produitDescription = document.createElement("p");
    let produitPrix = document.createElement("p");
    let produitBtn = document.createElement("a");

    /*Ajout des attributs au balise index HTML pour les travailler ac sass */

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
  console.log("Le panier va être initialisé");
  let panierInit = [];
  localStorage.setItem("panier", JSON.stringify(panierInit));
}

/* Ajout de l'article au panier de l'utilisateur 
=> CALLBACK : fonction rappelée a chaque fois que l'utilisateur clique sur le bouton*/

let ajoutPanier = () => {
  let acheter = document.getElementById("ajout_panier");
  acheter.addEventListener("click", async function () {
    const ajout = await getAllTeddies();
    panier.push(ajout);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Le produit a été ajouté au panier");
    alert("Cet article a été ajouté dans votre panier");
  });
};

/************** PAGE PANIER **************/

/*Vérification du panier*/
let checkPanier = () => {
  /*Vérifier qu'il y ait au moins un produit dans le panier*/
  let etatPanier = JSON.parse(localStorage.getItem("panier"));
  /*Si le panier est vide ou null*/
  if  (etatPanier.length < 1 || etatPanier == null) {
    alert("Votre panier est vide");
    return false;
  } else {
    console.log("Le panier n'est pas vide");
    return true;
  }
};

/*création du tableau panier */

let panierCreation = () => {
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
    let recapPanier = document.getElementById("panier-recap");

    /* Placement de la structure dans la page */

    recapPanier.appendChild(recap);
    recap.appendChild(ligneTableau);
    ligneTableau.appendChild(recapPhoto);
    ligneTableau.appendChild(recapNom);
    ligneTableau.appendChild(recapPrixUnitaire);
    ligneTableau.appendChild(recapRemove);

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
      removeArticle.setAttribute("class", "fas fa-times-circle fa-2x circle");

      /* Supprimer un produit du panier => CALLBACK */ 
      
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
    colonneTotal.setAttribute("id", "colonneTotal");
   

    /* Calcul de l'addition total */

    let sommeTotal = 0;
    panier.forEach((panier) => {
      sommeTotal += panier.price / 100;
    });

    /* Affichage du prix total à payer dans l'addition */
    document.getElementById("sommeTotal").textContent = sommeTotal + " €";
  }
};

/* supprimer un produit */

var annulerArticle = (i) => {
  panier.splice(i, 1); /*splice pour supprimer ou ajouter des élements d'une ligne d'un tableau */
  localStorage.clear();
  /* Mise à jour du nouveau panier avec suppression de l'article */
  localStorage.setItem("panier", JSON.stringify(panier));
  /* Mise à jour de la page pour affichage de la suppression au client */
  window.location.reload();
};  

/************************ FORMULAIRE DE COMMANDE *********************/

/* => vérifie les inputs du formulaire */

let checkInput = () => {

  /* Controle des données clients par la regex (ou expression régulière) : permet de vérifier la qualité des informations envoyées. */
  let checkNumber = /[0-9]/;
  let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

  /* message fin de controle */
  let checkMessage = "";

  /* Récupération des inputs */
  let prenom = document.getElementById("firstName").value;
  let nom = document.getElementById("lastName").value;
  let adresse = document.getElementById("address").value;
  let ville = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  
  /* tests des différents input du formulaire */

 /*Test du prénom*/
  if (
    checkNumber.test(prenom) == true ||
    checkSpecialCharacter.test(prenom) == true ||
    prenom == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre prénom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Prénom accepté");
  }

  /* Test du nom*/
  if (
    checkNumber.test(nom) == true ||
    checkSpecialCharacter.test(nom) == true ||
    nom == ""
  ) {
    checkMessage = "Veuillez vérifier les informations concernant votre nom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Nom accepté");
  }

  /*Test de l'adresse*/
  if (checkSpecialCharacter.test(adresse) == true || adresse == "") {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre adresse postale. Les caractères spéciaux ne sont pas autorisés";
  } else {
    console.log(" Adresse postale acceptée");
  }

  /*Test de la ville*/
  if (
    (checkSpecialCharacter.test(ville) == true ||
      checkNumber.test(ville) == true) ||
    ville == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre ville. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Ville acceptée");
  }
  
  /*Test du mail*/
  if (checkMail.test(email) == false) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre email.";
  } else {
    console.log("Adresse mail acceptée");
  }

  /*Si un des champs n'est pas conforme => message d'alert avec la raison*/
  if (checkMessage != "") {
    alert("Attention certaines données ne sont pas conformes :" + "\n" + checkMessage);
  }

  /* Si le formulaire est validé => construction de l'objet contact */
  else {
    contact = {
      lastName: nom,
      firstName: prenom,
      address: adresse,
      city: ville,
      email: email,
    };
    return contact;
  }
};

/*Envoi du formulaire vérifié à l'API */

/* Tableau et objet demandé par l'API pour la commande*/
let contact;
let products = [];
let url = "http://localhost:3000/api/teddies/order";

const envoiFormulaire = (sendForm, url) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        sessionStorage.setItem("order", this.responseText);
        window.location = "./confirmation.html";
        resolve(JSON.parse(this.responseText));
        console.log(sendForm);
      } else {
      }
    };
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(sendForm);
    console.log(sendForm);
  });
};

/*CALLBACK */
let confirmCommande = () => {
  let commander = document.getElementById("form_1");
  commander.addEventListener("submit", (event) => {
    event.preventDefault()

    /*Si le panier n'est pas vide et que le formulaire est valide => Construction du tableau products envoyé à l'API*/
    if (checkPanier() == true && checkInput() != null) {
      console.log("L'envoi peut etre fait");
      panier.forEach((article) => {
        products.push(article._id);
      });
      console.log("Ce tableau sera envoyé à l'API : " + products);

      /*Création de l'objet à envoyer*/
      let commande = {
        contact,
        products,
      };

      let sendForm = JSON.stringify(commande);
      envoiFormulaire(sendForm, url);
      console.log(commande);

      /* Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage */
      contact = {};
      products = [];
      localStorage.clear();
    } else {
      console.log("ERROR");
    }
  });
};

/*Récupération des informations pour affichage sur la page de confirmation*/
let retourOrder = () => {
  if (sessionStorage.getItem("order") != null) {
    let order = JSON.parse(sessionStorage.getItem("order"));
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("orderId").innerHTML = order.orderId;
    console.log(order);
    sessionStorage.removeItem("order");
  }

  /*Redirection vers l'accueil*/
  else {
    alert("Merci pour votre commande. A bientôt");
    window.location = "./index.html";
  }
};

/*Tableau de recap de la commande dans la page de confirmation*/

let confirmRecap = () => {

  /*Création de la structure du tableau récapitulatif*/
  let recapConfirm = document.createElement("table");
  let ligneConfirm = document.createElement("tr");
  let confirmPhoto = document.createElement("th");
  let confirmNom = document.createElement("th");
  let confirmPrixUnitaire = document.createElement("th");
  let ligneConfirmTotal = document.createElement("tr");
  let colonneConfirmTotal = document.createElement("th");
  let confirmPrixPaye = document.createElement("td");

  /*Placement de la structure dans la page*/
  let confirmPanier = document.getElementById("confirmation-recap");
  confirmPanier.appendChild(recapConfirm);
  recapConfirm.appendChild(ligneConfirm);
  ligneConfirm.appendChild(confirmPhoto);
  ligneConfirm.appendChild(confirmNom);
  ligneConfirm.appendChild(confirmPrixUnitaire);

  /*Incrémentation de l'id des lignes pour chaque produit*/
  let i = 0;
  let order = JSON.parse(sessionStorage.getItem("order"));

  order.products.forEach((orderArticle) => {
    /*Création de la ligne*/
    let ligneConfirmArticle = document.createElement("tr");
    let photoConfirmArticle = document.createElement("img");
    let nomConfirmArticle = document.createElement("td");
    let prixUnitConfirmArticle = document.createElement("td");

    /*Attribution des class pour le css*/
    ligneConfirmArticle.setAttribute("id", "article_acheté" + i);
    photoConfirmArticle.setAttribute("class", "photo_article_acheté");
    photoConfirmArticle.setAttribute("src", orderArticle.imageUrl);
    photoConfirmArticle.setAttribute("alt", "Photo de l'article acheté");

    /*Insertion dans le HTML*/
    recapConfirm.appendChild(ligneConfirmArticle);
    ligneConfirmArticle.appendChild(photoConfirmArticle);
    ligneConfirmArticle.appendChild(nomConfirmArticle);
    ligneConfirmArticle.appendChild(prixUnitConfirmArticle);

    /*Contenu des lignes*/

    nomConfirmArticle.textContent = orderArticle.name;
    prixUnitConfirmArticle.textContent = orderArticle.price / 100 + "€";
  });

  /*Dernière ligne du tableau : Total*/
  recapConfirm.appendChild(ligneConfirmTotal);
  ligneConfirmTotal.appendChild(colonneConfirmTotal);
  ligneConfirmTotal.setAttribute("id", "ligneSomme");
  colonneConfirmTotal.textContent = "Total payé";
  ligneConfirmTotal.appendChild(confirmPrixPaye);

  confirmPrixPaye.setAttribute("id", "sommeConfirmTotal");
  confirmPrixPaye.setAttribute("colspan", "4");
  colonneConfirmTotal.setAttribute("id", "colonneConfirmTotal");
  colonneConfirmTotal.setAttribute("colspan", "2");

  /*Calcul de l'addition total*/
  let sommeConfirmTotal = 0;
  order.products.forEach((orderArticle) => {
    sommeConfirmTotal += orderArticle.price / 100;
  });

  /*Affichage du prix total à payer dans l'addition */
  console.log(sommeConfirmTotal);
  document.getElementById("sommeConfirmTotal").textContent =
    sommeConfirmTotal + " €";
};

