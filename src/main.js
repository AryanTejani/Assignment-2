import "./style.css"
// --- 1. CORE HELPER FUNCTIONS (The "Model") ---

const PRODUCTS_KEY = 'e-commerce-products';

/**
 * Retrieves all products from localStorage.
 * @returns {Array} An array of product objects.
 */
const getProducts = () => {
    const products = localStorage.getItem(PRODUCTS_KEY);
    return products ? JSON.parse(products) : [];
};

/**
 * Saves an array of products to localStorage.
 * @param {Array} products - The array of products to save.
 */
const saveProducts = (products) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

/**
 * Generates a unique ID for a new product.
 * @returns {string} A unique ID string.
 */
const generateId = () => {
    return `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// --- 2. CRUD & OTHER OPERATIONS ---

/**
 * CREATE: Adds a new product to localStorage.
 * @param {Object} productData - The product data (name, imageUrl, price, description).
 */
const addProduct = (productData) => {
    const products = getProducts();
    const newProduct = {
        id: generateId(),
        ...productData,
    };
    products.push(newProduct);
    saveProducts(products);
    console.log(`Product added with ID: ${newProduct.id}`);
};

/**
 * READ (Single): Retrieves a single product by its ID.
 * Also serves as the "Filter by ID" function.
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {Object|undefined} The product object or undefined if not found.
 */
const getProductById = (productId) => {
    const products = getProducts();
    return products.find(p => p.id === productId);
};

/**
 * UPDATE: Updates an existing product in localStorage.
 * @param {string} productId - The ID of the product to update.
 * @param {Object} updatedData - An object with the fields to update.
 */
const updateProduct = (productId, updatedData) => {
    let products = getProducts();
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex > -1) {
        products[productIndex] = { ...products[productIndex], ...updatedData };
        saveProducts(products);
        console.log(`Product with ID ${productId} updated.`);
    } else {
        console.error(`Product with ID ${productId} not found.`);
    }
};

/**
 * DELETE: Removes a product from localStorage by its ID.
 * @param {string} productId - The ID of the product to delete.
 */
const deleteProduct = (productId) => {
    let products = getProducts();
    const updatedProducts = products.filter(p => p.id !== productId);

    if (products.length !== updatedProducts.length) {
        saveProducts(updatedProducts);
        console.log(`Product with ID ${productId} deleted.`);
    } else {
        console.error(`Product with ID ${productId} not found for deletion.`);
    }
};

/**
 * SEARCH: Finds products whose names include the search keyword (case-insensitive).
 * @param {string} keyword - The search term.
 * @returns {Array} An array of matching product objects.
 */
const searchProductsByName = (keyword) => {
    const products = getProducts();
    if (!keyword) {
        return products; // Return all products if keyword is empty
    }
    const lowercasedKeyword = keyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lowercasedKeyword));
};


// --- 3. PAGE-SPECIFIC LOGIC ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Logic for anmin.html (Product Creation Page) ---
    const productForm = document.getElementById('product-form');
    if (productForm) {
        const adminProductListContainer = document.getElementById('admin-product-list');
        const hiddenProductId = document.getElementById('product-id-hidden');
        const submitBtn = document.getElementById('add-product-btn');

        // FUNCTION TO RENDER THE LIST OF PRODUCTS ON THE ADMIN PAGE
        const renderAdminProductList = () => {
            const products = getProducts();
            adminProductListContainer.innerHTML = ''; // Clear the list

            if (products.length === 0) {
                adminProductListContainer.innerHTML = '<p class="text-gray-500">No products to manage yet.</p>';
                return;
            }

            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'flex justify-between items-center p-2 border-b';
                productItem.innerHTML = `
                    <span class="font-medium">${product.name}</span>
                    <div>
                        <button class="edit-btn text-blue-600 hover:underline mr-4" data-id="${product.id}">Edit</button>
                        <button class="delete-btn text-red-600 hover:underline" data-id="${product.id}">Delete</button>
                    </div>
                `;
                adminProductListContainer.appendChild(productItem);
            });
        };

        // HANDLE CLICKS ON THE EDIT AND DELETE BUTTONS (Event Delegation)
        adminProductListContainer.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;

            // --- DELETE ---
            if (event.target.classList.contains('delete-btn')) {
                if (confirm('Are you sure you want to delete this product?')) {
                    deleteProduct(productId);
                    renderAdminProductList(); // Re-render the list to show the change
                }
            }

            // --- EDIT ---
            if (event.target.classList.contains('edit-btn')) {
                const productToEdit = getProductById(productId);
                if (productToEdit) {
                    // Populate the form with the product's data
                    document.getElementById('product-name').value = productToEdit.name;
                    document.getElementById('product-price').value = productToEdit.price;
                    document.getElementById('product-description').value = productToEdit.description;
                    
                    // Store the ID in the hidden field and change button text
                    hiddenProductId.value = productToEdit.id;
                    submitBtn.textContent = 'Save Changes';
                    
                    // Scroll to the top to see the form
                    window.scrollTo(0, 0);
                }
            }
        });

        // MODIFY THE FORM SUBMIT LOGIC TO HANDLE BOTH ADD AND UPDATE
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const name = document.getElementById('product-name').value;
            const price = parseFloat(document.getElementById('product-price').value);
            const description = document.getElementById('product-description').value;
            const imageFile = document.getElementById('file-upload').files[0];
            const existingId = hiddenProductId.value;

            const productData = { name, price, description };

            if (existingId) {
                // --- UPDATE EXISTING PRODUCT ---
                updateProduct(existingId, productData);
                alert('Product updated successfully!');
            } else {
                // --- ADD NEW PRODUCT ---
                if (!imageFile) {
                    alert('Please select an image for a new product.');
                    return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onload = () => {
                    productData.imageUrl = reader.result;
                    addProduct(productData);
                    alert('Product added successfully!');
                    productForm.reset();
                    renderAdminProductList();
                };
                return; // Prevent resetting form too early
            }
            
            // Reset form after submission
            productForm.reset();
            hiddenProductId.value = '';
            submitBtn.textContent = 'Add New Product';
            renderAdminProductList(); // Re-render the list
        });

        // Initial render of the product list on page load
        renderAdminProductList();
    }

    // --- Logic for index.html (Product Listing Page) ---
    const productListingContainer = document.getElementById('product-listing');
    if (productListingContainer) {
        const renderProducts = (productsToRender) => {
            productListingContainer.innerHTML = ''; // Clear previous content

            if (!productsToRender || productsToRender.length === 0) {
                productListingContainer.innerHTML = '<p class="col-span-full text-center text-gray-500">No products found. Add some from the admin page!</p>';
                return;
            }
            
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden flex flex-col';
                productCard.innerHTML = `
                <a href="src/html/product.html?id=${product.id}">
                    <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-4 flex flex-col flex-grow cursor-pointer">
                        <h3 class="text-xl font-bold text-gray-800">${product.name}</h3>
                        <p class="text-gray-600 mt-2 flex-grow">${product.description}</p>
                        <div class="mt-4 flex justify-between items-center">
                            <span class="text-lg font-bold text-blue-600">$${product.price.toFixed(2)}</span>
                            <button class="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800">Add to Cart</button>
                        </div>
                    </div>
                    </a>
                `;

                // productCard.addEventListener('click', () => {
                //     window.location.href = `./html/product.html?id=${product.id}`;
                // })
                productListingContainer.appendChild(productCard);
            });
        };

        // Initial render of all products
        const allProducts = getProducts();
        renderProducts(allProducts);

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                const searchTerm = event.target.value;
                const filteredProducts = searchProductsByName(searchTerm);
                renderProducts(filteredProducts);
            });
        }
    }
});