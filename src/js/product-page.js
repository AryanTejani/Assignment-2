import "../style.css"; // Import your main CSS file

const PRODUCTS_KEY = 'e-commerce-products';
const getProducts = () => {
const products = localStorage.getItem(PRODUCTS_KEY);
return products ? JSON.parse(products) : [];
};
const getProductById = (productId) => {
const products = getProducts();
return products.find(p => p.id === productId);
};

document.addEventListener('DOMContentLoaded', () => {
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const productDetailContainer = document.getElementById('product-detail-container');

if (!productId || !productDetailContainer) {
    productDetailContainer.innerHTML = '<p class="text-red-500">Product not found or invalid URL.</p>';
    return;
}

const product = getProductById(productId);

if (!product) {
    productDetailContainer.innerHTML = '<p class="text-red-500">Sorry, we couldn\'t find a product with that ID.</p>';
    return;
}

productDetailContainer.innerHTML = `
    <div class="shadow-lg rounded-lg overflow-hidden">
        <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-auto">
        <div class="grid grid-cols-3 gap-2 mt-2">
            <img src="${product.imageUrl}" alt="${product.name} - Thumbnail 1" class="w-full h-auto cursor-pointer border border-gray-300 hover:border-blue-500">
            <img src="${product.imageUrl}" alt="${product.name} - Thumbnail 2" class="w-full h-auto cursor-pointer border border-gray-300 hover:border-blue-500">
            <img src="${product.imageUrl}" alt="${product.name} - Thumbnail 3" class="w-full h-auto cursor-pointer border border-gray-300 hover:border-blue-500">
        </div>
    </div>
    <div>
        <h1 class="text-3xl font-bold text-gray-900">${product.name}</h1>
        <div class="flex items-center mt-2">
            <span class="text-yellow-500">
                <svg class="w-5 h-5 inline-block fill-current" viewBox="0 0 20 20"><path d="M10 1L12.24 7.76L19 7.76L13.76 11.69L16.07 18.31L10 14.55L3.93 18.31L6.24 11.69L1 7.76L7.76 7.76L10 1Z"/></svg>
                <svg class="w-5 h-5 inline-block fill-current" viewBox="0 0 20 20"><path d="M10 1L12.24 7.76L19 7.76L13.76 11.69L16.07 18.31L10 14.55L3.93 18.31L6.24 11.69L1 7.76L7.76 7.76L10 1Z"/></svg>
                <svg class="w-5 h-5 inline-block fill-current" viewBox="0 0 20 20"><path d="M10 1L12.24 7.76L19 7.76L13.76 11.69L16.07 18.31L10 14.55L3.93 18.31L6.24 11.69L1 7.76L7.76 7.76L10 1Z"/></svg>
                <svg class="w-5 h-5 inline-block fill-current" viewBox="0 0 20 20"><path d="M10 1L12.24 7.76L19 7.76L13.76 11.69L16.07 18.31L10 14.55L3.93 18.31L6.24 11.69L1 7.76L7.76 7.76L10 1Z"/></svg>
                <svg class="w-5 h-5 inline-block fill-current" viewBox="0 0 20 20"><path d="M10 1L12.24 7.76L19 7.76L13.76 11.69L16.07 18.31L10 14.55L3.93 18.31L6.24 11.69L1 7.76L7.76 7.76L10 1Z"/></svg>
            </span>
            <span class="text-gray-600 ml-2">4.5/5</span>
        </div>
        <div class="mt-4 flex items-center">
            <span class="text-2xl font-bold text-gray-900">$${product.price.toFixed(2)}</span>
            <span class="text-gray-500 line-through ml-2">$${(product.price * 1.15).toFixed(2)}</span>
            <span class="bg-red-100 text-red-500 text-sm font-semibold px-2 py-1 rounded-full ml-2">-15%</span>
        </div>
        <p class="text-gray-700 mt-4">${product.description}</p>

        <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Select Colors</h3>
            <div class="flex items-center space-x-3">
                <button class="w-8 h-8 rounded-full bg-[#556B2F] cursor-pointer focus:outline-none border-2 border-[#556B2F]"></button>
                <button class="w-8 h-8 rounded-full bg-[#36454F] cursor-pointer focus:outline-none border-2 border-gray-300"></button>
                <button class="w-8 h-8 rounded-full bg-[#4682B4] cursor-pointer focus:outline-none border-2 border-gray-300"></button>
                <button class="w-8 h-8 rounded-full bg-[#000000] cursor-pointer focus:outline-none border-2 border-gray-300"></button>
            </div>
        </div>

        <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Choose Size</h3>
            <div class="flex items-center space-x-3">
                <button class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm focus:outline-none hover:bg-gray-300">Small</button>
                <button class="px-4 py-2 rounded-full bg-white text-gray-700 text-sm focus:outline-none shadow-md">Medium</button>
                <button class="px-4 py-2 rounded-full bg-black text-white text-sm focus:outline-none">Large</button>
                <button class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm focus:outline-none hover:bg-gray-300">X-Large</button>
            </div>
        </div>

        <div class="mt-8 flex items-center space-x-4">
            <div class="flex items-center border border-gray-300 rounded-md">
                <button class="px-3 py-2 focus:outline-none">-</button>
                <input type="number" value="1" min="1" class="w-16 text-center focus:outline-none">
                <button class="px-3 py-2 focus:outline-none">+</button>
            </div>
            <button class="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 focus:outline-none">Add to Cart</button>
        </div>
    </div>
`;

document.title = product.name + " - Your E-commerce Store";
})