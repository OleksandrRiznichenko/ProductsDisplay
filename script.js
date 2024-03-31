const productContainer = document.getElementById('product-container');

async function fetchProducts() {
    try {
        showSpinner();
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        hideSpinner();
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        hideSpinner();
        showError('Failed to fetch products. Please try again later.');
    }
}

function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${product.image || 'https://placehold.co/600x400'}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.shortDescription}</p>
        <p>Price: $${product.price}</p>
        <button class="like-btn" data-product-id="${product.id}">Like</button>
    `;
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', handleLikeProduct);
    return card;
}

function handleLikeProduct(event) {
    const productId = event.target.dataset.productId;
    const likedProducts = getLikedProducts();
    if (!likedProducts.includes(productId)) {
        likedProducts.push(productId);
        saveLikedProducts(likedProducts);
    }
}

function getLikedProducts() {
    const likedProductsJson = localStorage.getItem('likedProducts');
    return likedProductsJson ? JSON.parse(likedProductsJson) : [];
}

function saveLikedProducts(likedProducts) {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}

function showSpinner() {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.textContent = 'Loading...';
    productContainer.appendChild(spinner);
}

function hideSpinner() {
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }
}

function showError(message) {
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    productContainer.appendChild(errorElement);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
