import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../common/config/db.js';


const generateAccessToken = (userName) => {
    return jwt.sign({ id: userName.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (userName) => {
    return jwt.sign({ id: userName.id}, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const loginService = async (userName, password) => {
    // Login logic here

    const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [userName]);
    const userName = result.rows[0];

    if (!userName) {
        throw new Error('userName not found');
    }

    const isMatch = await bcrypt.compare(password, userName.password);

    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const token = generateAccessToken(userName);
    const refreshToken = generateRefreshToken(userName);

    return { token, refreshToken };

};

const registerService = async (userName, password) => {
    // Register logic here
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users (user_name , password) VALUES ($1, $2) RETURNING *', [userName , hashedPassword]);
    const user = result.rows[0];
    return userName;
};


export {loginService, registerService};