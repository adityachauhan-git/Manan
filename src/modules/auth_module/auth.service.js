import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../common/config/db.js';



const generateAccessToken = (userName) => {
    return jwt.sign({ id: userName.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (userName) => {
    return jwt.sign({ id: userName.id}, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const loginService = async (userName, pass) => {
    // Login logic here

    const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [userName]);
    const user = result.rows[0];

    if (!user) {
        throw new Error('user not found');
    }

    const isMatch = await bcrypt.compare(pass, user.pass);

    if (!isMatch) {
        throw new Error('Invalid pass');
    }

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    

    return { token, refreshToken };

};

const registerService = async (userName, pass) => {
    console.log(userName , pass)
    const hashedPassword = await bcrypt.hash(pass, 10);
    const result = await pool.query('INSERT INTO users (user_name , pass) VALUES ($1, $2) RETURNING *', [userName , hashedPassword]);
    const user = result.rows[0];
    console.log(user)
    return userName;
};


export {loginService, registerService};