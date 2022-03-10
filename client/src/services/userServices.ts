export async function getUser(token: string) {
    try {
        const response = await fetch("/api/users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })

        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Couldn't get user ", err);
    }
}