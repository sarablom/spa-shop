export async function signup (
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string
) {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-type": "application/JSON"
            },
            body: JSON.stringify({ userName, password, firstName, lastName, address })
        })

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);      
    }

}