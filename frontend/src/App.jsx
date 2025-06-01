import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from '../components/UsersPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users" element={<UsersPage />} />
            </Routes>
        </Router>
    );
}

export default App;