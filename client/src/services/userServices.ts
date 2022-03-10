export async function getUser(token: string) {
    try {
        const response = await fetch("/api/users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })

        const data = await response.json();

        if(data.success) {
            return data;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
}