import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import apiClient from "./api/client";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./components/NotFound";

function App() {

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  //request backend
  useEffect(() => {
    const fetchUser = async () => {

      try {
        const res = await apiClient.get("/auth/me", { timeout: 5000 })
        setUser(res.data);
      } catch(err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home user={user} error={error}/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
