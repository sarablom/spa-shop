export async function fetchDataByUrl(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProducts() {
  const fetchUrl = "/api/products";
  return fetchDataByUrl(fetchUrl);
}

export async function getSingleProduct(id: string) {
  const fetchUrl = `/api/products/${id}`;
  return fetchDataByUrl(fetchUrl);
}

