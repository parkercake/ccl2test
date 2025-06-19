import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../src/context/UserContext";
import * as api from "../services/authApi.js";
import '../src/index.css';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async () => {
        try {
            const userData = await api.login(email, password);
            setUser(userData); // sets context
            navigate(`/users/${userData.id}`);
        } catch (error) {
            setLoginResult("Login failed");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form">
                <h2>Login</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="button" onClick={handleLogin} className="auth-btn">
                    Login
                </button>
                {loginResult && <p className="auth-link">{loginResult}</p>}
            </form>
        </div>
    );
}

export default LoginPage;