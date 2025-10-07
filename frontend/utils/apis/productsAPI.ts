import { fetchWithAuth } from './fetchWithAuth';

export async function getAllProducts() {
  try {
    const response = await fetchWithAuth(`/product/allProducts`,
      { method: 'GET' }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchProductById(product_id: string) {
  try {
    const response = await fetchWithAuth(`/product/getProduct/${product_id}`,
      { method: 'GET' });
    console.log("Fetched product by id ", response.data[0])
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
}
