type Credentials = {
    email: string,
    password: string
}

export async function login(credentials: Credentials): Promise<{ access_token: string }> {
    const res = await fetch("http://localhost:3000/auth/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return await res.json()
}