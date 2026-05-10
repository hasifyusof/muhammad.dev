import express from 'express';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const isSecureCookie = process.env.NODE_ENV === 'production' || (process.env.CLIENT_URL && process.env.CLIENT_URL.startsWith('https'));

const cookieStore = {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: isSecureCookie ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email and password' });
        }

        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        const token = generateToken(newUser.rows[0].id);

        res.cookie('token', token, cookieStore);
        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login an existing user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bycrypt.compare(password, user.rows[0].password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.rows[0].id);

        res.cookie('token', token, cookieStore);

        res.json({
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

//User data
router.get('/me', protect, async (req, res) => {
    res.json(req.user);
});

//Logout user
router.post('/logout', (req, res) => {
    res.clearCookie('token', { ...cookieStore, maxAge: 1 });
    res.status(200).json({ message: 'Logout successful' });
});

export default router;