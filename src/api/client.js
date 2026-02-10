const BASE_URL = "https://orm-backend-gejw.onrender.com";

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/?category=${category}`);
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Logic updated to handle the slug string, keeping the name for compatibility
export const fetchProductById = async (slug) => {
  try {
    // This sends the product name (slug) to the backend
    const response = await fetch(`${BASE_URL}/api/products/${slug}/`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};