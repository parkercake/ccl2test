export const login = async (email, password) => {
    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();

    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
};

export const refresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return fetch("http://localhost:3000/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
    });
};

export const logout = async () => {
    return fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include"
    });
};
