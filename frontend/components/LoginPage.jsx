import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as api from "../services/apiService.js";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userData = await api.login(email, password);
            console.log('Logged in user:', userData);

            // Optional: You can also store user info in local state, context, or localStorage here

            // Navigate to /users
            navigate('/users');
        } catch (error) {
            setLoginResult("Login failed");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            {loginResult && <p>{loginResult}</p>}
        </div>
    );
}

export default LoginPage;
