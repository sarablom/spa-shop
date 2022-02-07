// import { User } from "../models/User";

export async function fetchDataByUrl(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUsers() {
  const fetchUrl = "/api/users";
  return fetchDataByUrl(fetchUrl);
}

export async function getUserById (id: string) {
    try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        return data;
      } catch(err) {
        console.log(err)
      }
}

// export async function saveProductToUserCart(
// 	productId: string,
// 	token: string,
// 	user: User
// ) {

// 	const res = await fetch(`/api/users/${user.id}`)

// }