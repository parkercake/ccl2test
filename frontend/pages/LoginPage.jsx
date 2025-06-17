// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as api from "../services/authApi.js";
import { useUser } from "../src/context/UserContext";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async () => {
        try {
            const userData = await api.login(email, password);
            setUser(userData);
            navigate('/users');
        } catch (error) {
            setLoginResult("Login failed");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            {loginResult && <p>{loginResult}</p>}
        </div>
    );
}

export default LoginPage;
