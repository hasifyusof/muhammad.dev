import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = ({ setUser }) => {

    const [form, setForm] = useState({
        name:"",
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/register", form);
            setUser(res.data);
            navigate('/');
        } catch(err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card auth-form" onSubmit={handleSubmit}>
                 <h2 className="auth-title">Register</h2>
                {error && <p className="auth-error">{error}</p>}
                <input className="input-field" type="text" placeholder="Name" value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})} />
                <input className="input-field" type="email" placeholder="Email" value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})} />
                <input className="input-field" type="password" placeholder="Password" value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})} />
                <button className="submit-button" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
