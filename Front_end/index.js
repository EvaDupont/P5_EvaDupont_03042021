/* function pour lier l'Api au site web  --- await ne fonctionne que dans les fonctions asynchrones -> async */

(async function() { 
    const produits = await getProduits()
    for(produit of produits) {
      afficherProduit(produit)
    }
})()

function getProduits() {
    return fetch("http://localhost:3000/api/teddies")
        .then(function(httpBodyResponse) {
          return httpBodyResponse.json()
        })
        .then(function(produits) {
          return produits
        })
        .catch(function(error) {
            alert(error)
        })
}


document.getElementById("name").innerHTML = produit.name;
document.getElementsByClassName("price").innerHTML = "Prix : " + prix[0];






/*function afficherProduits(produit) {
  
  const templateElt = document.getElementById("containerArticle")
  const cloneELt = document.importNode(templateElt.contentEditable, true)

  cloneELt.getElementById("imageUrl").textContent = product.img 
  cloneELt.getElementById("name").textContent = product.name 
  cloneELt.getElementById("price").textContent = product.price

  document.getElementById("main").appendChild(cloneElt)

}*/














/*en JS : document.getElementById("price").innerHTML = "Total : "+prix  pour affaiche rle prix total */