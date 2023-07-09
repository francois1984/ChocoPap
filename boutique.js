// Boutique.js

// Fonction pour ajouter un produit au panier
function addToCart(productName) {
  // Récupérer le panier depuis le stockage local
  let cart = localStorage.getItem("cart");

  // Vérifier si le panier est vide
  if (!cart) {
    // Si le panier est vide, créer un tableau vide pour stocker les produits
    cart = [];
  } else {
    // Si le panier n'est pas vide, convertir le JSON en tableau
    cart = JSON.parse(cart);
  }

  // Ajouter le produit au panier sous forme d'objet contenant le nom et le prix
  const product = {
    name: productName,
    price: getProductPrice(productName),
  };

  // Ajouter le nom du produit au panier
  cart.push(productName);

  // Enregistrer le panier dans le stockage local
  localStorage.setItem("cart", JSON.stringify(cart));

  // Afficher un message de confirmation
  //   alert("Le produit a été ajouté au panier.");

  // Mettre à jour la bulle du panier
  updateCartCount();
}

    

// Fonction pour filtrer les produits par catégorie
function filterItems(category) {
  // Récupérer tous les produits
  const items = document.getElementsByClassName("item");

  // Parcourir tous les produits et les afficher ou les masquer en fonction de la catégorie sélectionnée
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (category === "all" || item.getAttribute("data-category") === category) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
}


// Fonction pour récupérer le prix d'un produit par son nom
function getProductPrice(productName) {
  const items = document.getElementsByClassName("item");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.textContent === productName) {
      return parseFloat(item.getAttribute("data-price"));
    }
  }

  return 0;
}

// Panier.js

// Fonction pour afficher le contenu du panier
function displayCart() {
  // Récupérer le panier depuis le stockage local
  let cart = localStorage.getItem("cart");

  // Vérifier si le panier est vide
  if (!cart) {
    // Si le panier est vide, afficher un message indiquant qu'il est vide
    document.getElementById("cart-items").innerHTML =
      "<p>Le panier est vide.</p>";
    document.getElementById("cart-total").textContent = "Total: 0.00€";
  } else {
    // Si le panier n'est pas vide, convertir le JSON en tableau
    cart = JSON.parse(cart);

    // Afficher les produits du panier
    const cartItemsElement = document.getElementById("cart-items");
    cartItemsElement.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
      const productName = cart[i];
      const listItem = document.createElement("li");

      // Créer une div pour contenir l'image et le nom du produit
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");

      // Créer une balise img pour afficher l'image du produit
      const image = document.createElement("img");
      image.src = getProductImage(productName);
      image.alt = productName;
      productDiv.appendChild(image);

      // Créer un span pour afficher le nom du produit
      const nameSpan = document.createElement("span");
      nameSpan.textContent = productName;
      productDiv.appendChild(nameSpan);

      // Ajouter la div du produit à l'élément de liste
      listItem.appendChild(productDiv);

      // Créer un bouton de suppression pour chaque élément du panier
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function () {
        confirmRemoveCartItem(productName);
      });

      // Ajouter le bouton de suppression à l'élément de liste
      listItem.appendChild(deleteButton);

      // Ajouter l'élément de liste au panier
      cartItemsElement.appendChild(listItem);
    }

    // Calculer le total du panier
    const cartTotalElement = document.getElementById("cart-total");
    const total = calculateTotal(cart);
    cartTotalElement.textContent = "Total: " + total.toFixed(2) + "€";
  }
}

// Fonction pour calculer le total du panier
function calculateTotal(cart) {
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const productName = cart[i];
    const item = getItemByName(productName);

    if (item) {
      const price = parseFloat(item.getAttribute("data-price"));
      total += price;
    }
  }

  return total;
}


// Fonction pour récupérer un produit par son nom
function getItemByName(productName) {
  const items = document.getElementsByClassName("item");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.textContent === productName) {
      return item;
    }
  }

  return null;
}

// Fonction pour confirmer la suppression d'un produit du panier
function confirmRemoveCartItem(productName) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce produit du panier ?")) {
    removeCartItem(productName);
  }
}

// Fonction pour supprimer un produit du panier
function removeCartItem(productName) {
  // Récupérer le panier depuis le stockage local
  let cart = localStorage.getItem("cart");

  // Vérifier si le panier n'est pas vide
  if (cart) {
    // Convertir le JSON en tableau
    cart = JSON.parse(cart);

    // Rechercher l'indice du produit dans le panier
    const index = cart.indexOf(productName);

    // Vérifier si le produit a été trouvé dans le panier
    if (index !== -1) {
      // Supprimer le produit du panier
      cart.splice(index, 1);

      // Enregistrer le panier mis à jour dans le stockage local
      localStorage.setItem("cart", JSON.stringify(cart));

      // Mettre à jour la bulle du panier
      updateCartCount();

      // Réafficher le contenu du panier
      displayCart();

      // Afficher un message de confirmation
      alert("Le produit a été supprimé du panier.");
    }
  }
}

// Fonction pour supprimer tous les produits du panier avec confirmation
function removeAllCartItems() {
  if (confirm("Êtes-vous sûr de vouloir supprimer tous les produits du panier ?")) {
    localStorage.removeItem("cart");
    displayCart();
    alert("Tous les produits ont été supprimés du panier.");
  }
}

// Fonction pour récupérer l'image du produit par son nom
function getProductImage(productName) {
  switch (productName) {
    case "Chocolat blanc":
      return "./images/produit1.jpg";
    case "Chocolat au lait":
      return "./images/produit2.jpg";
    case "Chocolat noir":
      return "./images/produit3.jpg";
    case "Noix/Noisette":
      return "./images/produit4.jpg";
    case "Fruit":
      return "./images/produit5.jpg";
    case "Caramel":
      return "./images/produit6.jpg";
    case "Liqueur":
      return "./images/produit7.jpg";
    default:
      return "";
  }
}

// Appeler la fonction d'affichage du panier au chargement de la page
displayCart();





// Fonction pour mettre à jour la bulle du panier avec le nombre de produits
function updateCartCount() {
  // Récupérer le panier depuis le stockage local
  let cart = localStorage.getItem("cart");

  // Vérifier si le panier est vide
  if (!cart) {
    // Si le panier est vide, cacher la bulle
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.style.display = "none";
  } else {
    // Si le panier n'est pas vide, convertir le JSON en tableau
    cart = JSON.parse(cart);

    // Mettre à jour le nombre de produits dans la bulle du panier
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cart.length;
    cartCountElement.style.display = "inline-block";
  }
}

// Appeler la fonction pour mettre à jour la bulle du panier au chargement de la page
updateCartCount();
