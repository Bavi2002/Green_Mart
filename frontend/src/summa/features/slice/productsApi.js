// src/api/productApi.js
export const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
};

// src/api/productApi.js
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch product by id:', error);
        return null;
    }
};
