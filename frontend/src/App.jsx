import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from '../components/UsersPage';
import LoginPage from '../components/LoginPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users" element={<UsersPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;