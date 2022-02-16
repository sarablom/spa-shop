export async function signup(
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  zipCode: number,
  city: string,
) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON",
      },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        address,
        zipCode,
        city
      }),
    });

    const data = await response.json();    
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function login(userName: string, password: string) {
  try {
    const response = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON",
      },
      body: JSON.stringify({ userName, password }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
