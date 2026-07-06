import {loginService , registerService} from './auth.service.js';



const login = (req, res) => {
  const { userName, password } = req.body;
  // Call the login service with the email and password
  loginService(userName, password)
    .then((result) => {
      // Handle successful login, e.g., send a token or userName data
    
    res.cookie('token', result.refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    

      res.status(200).json({ message: 'Login successful', accessToken: result.token });
    })
    .catch((error) => {
      // Handle login errors, e.g., invalid credentials
      res.status(401).json({ message: 'Login failed', error: error.message });
    });
};

const register = (req, res) => {
  const { name, password } = req.body;
  // Call the register service with the userName details
  registerService(name, password)
    .then((userName) => {
      // Handle successful registration
      res.status(201).json({ message: 'userName registered successfully', userName });
    })
    .catch((error) => {
      // Handle registration errors
      res.status(400).json({ message: 'Registration failed', error: error.message });
    });
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.token;   
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    // Verify the refresh token and generate a new access token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, userName) => {
        if (err) {
          console.error('Refresh token verification failed:', err);
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(userName);
        res.status(200).json({ accessToken: newAccessToken });
    });
};


const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

const me = (req, res) => {
  console.log('Current userName:', req.userName);
    res.status(200).json({ message: 'Current userName details', userName: req.userName });
};

export {login, register, refreshToken, logout, me};