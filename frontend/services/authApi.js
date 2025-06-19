// const BASE_URL = " http://localhost:3000";
const BASE_URL = "https://cc241066-10723.node.fhstp.cc/api";

export const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
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
    return fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
    });
};

export const logout = async () => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
};

export const fetchMe = async () => {
    const response = await fetch(`${BASE_URL}/auth/me`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Not authenticated");
    }
    return response.json();
};