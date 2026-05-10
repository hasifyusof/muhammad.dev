import React, { useState } from 'react';
import apiClient from '../api/client';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setUser }) => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiClient.post("/api/auth/login", form);
            setUser(res.data);
            navigate('/');
        } catch(err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card auth-form" onSubmit={handleSubmit}>
                 <h2 className="auth-title">Login</h2>
                {error && <p className="auth-error">{error}</p>}
                <input className="input-field" type="email" placeholder="Email" value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})} />
                <input className="input-field" type="password" placeholder="Password" value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})} />
                <button className="submit-button" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
