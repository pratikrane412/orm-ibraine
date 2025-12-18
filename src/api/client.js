const BASE_URL = "http://127.0.0.1:8000"; // Django URL

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/?category=${category}`);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};