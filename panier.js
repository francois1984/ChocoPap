window.addEventListener('DOMContentLoaded', function() {
    const cartItemsElement = document.getElementById('cart-itemsPanier');
    const cartTotalElement = document.getElementById('cart-total');

    // Récupérer les éléments du panier depuis le localStorage
    const storedItems = localStorage.getItem('cartItemsPanier');
    if (storedItems) {
        cartItemsElement.innerHTML = storedItems;
    }

    // Récupérer le total depuis le localStorage
    const storedTotal = localStorage.getItem('cartTotal');
    if (storedTotal) {
        cartTotalElement.textContent = storedTotal;
    }
});
