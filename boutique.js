// Variables pour le panier
let cartItemsPanier = [];
let total = 0;

// Fonction pour ajouter un élément au panier
function addToCartPanier(item) {
  cartItemsPanier.push(item);
  calculateTotal();
  updateCart();
  localStorage.setItem("cartItemsPanier", cartItemsPanier.join(", "));
}

// Fonction pour calculer le total du panier
function calculateTotal() {
  total = 0;
  for (let i = 0; i < cartItemsPanier.length; i++) {
    if (cartItemsPanier[i] === "Chocolat blanc") {
      total += 5.99;
    } else if (cartItemsPanier[i] === "Chocolat au lait") {
      total += 4.99;
    } else if (cartItemsPanier[i] === "Chocolat noir") {
      total += 6.99;
    } else if (cartItemsPanier[i] === "Noix/Noisette") {
      total += 7.99;
    } else if (cartItemsPanier[i] === "Fruit") {
      total += 3.99;
    } else if (cartItemsPanier[i] === "Caramel") {
      total += 4.49;
    } else if (cartItemsPanier[i] === "Liqueur") {
      total += 8.99;
    }
  }
  localStorage.setItem("cartTotal", total.toFixed(2));
}

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = cartItemsPanier.length;

  let cartTotal = document.getElementById("cart-total");
  cartTotal.textContent = total.toFixed(2);
}

// Fonction pour filtrer les éléments par catégorie
function filterItems(category) {
  let items = document.getElementsByClassName("item");
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (category === "all") {
      item.style.display = "flex";
    } else if (item.dataset.category === category) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
}

// Chargement initial du panier
updateCart();

window.addEventListener("DOMContentLoaded", function () {
  const cartTotalElement = document.getElementById("cart-total");

  // Récupérer les éléments du panier depuis le localStorage
  const storedItems = localStorage.getItem("cartItemsPanier");
  if (storedItems) {
    cartItemsPanier = storedItems.split(", ");
  }

  // Récupérer le total depuis le localStorage
  const storedTotal = localStorage.getItem("cartTotal");
  if (storedTotal) {
    total = parseFloat(storedTotal);
    updateCart();
  }
});
