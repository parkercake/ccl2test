const BASE_URL = "http://localhost:3000";

export const secureFetch = async (path, options = {}) => {
    let res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        credentials: "include", // ✅ send cookies!
        headers: {
            ...(options.headers || {})
        }
    });

    if (res.status === 401) {
        // try to refresh
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include", // ✅ send refresh cookie
            headers: { "Content-Type": "application/json" },
        });

        if (refreshRes.ok) {
            // retry original request
            res = await fetch(`${BASE_URL}${path}`, {
                ...options,
                credentials: "include",
                headers: {
                    ...(options.headers || {})
                }
            });
        } else {
            // unauthorized – clear state
            localStorage.clear();
            window.location.href = "/login";
        }
    }

    return res;
};