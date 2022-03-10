import { Product } from "../models/Product";

export async function fetchDataByUrl(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProducts() {
  try {
    const fetchUrl = "/api/products";
    return fetchDataByUrl(fetchUrl);
  } catch (err) {
    console.log(err);    
  }
}

export async function getSingleProduct(id: string) {
  try {
    const fetchUrl = `/api/products/${id}`;
    return fetchDataByUrl(fetchUrl);
  } catch (err) {
    console.log(err);
  }
}

export async function updateProduct(id: string, product: Product, token: string) {
  try {
    const response =await fetch(`/api/products/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
  
    const productData = await response.json();
    console.log(productData);
    
    return productData;
  } catch (err) {
    console.log(err);
  }

}

export async function deleteProduct(token: string, id: string) {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}