import express from 'express';
import { getUserByUsername, comparePassword, registerUser } from './service/userService.js';
import { generateAccessToken, generateRefreshToken, invalidateToken, refresh, storeRefreshToken, verifyAccessToken } from './middleware/authHandler.js';
import dotenv from 'dotenv';
import getStoredTokens from './service/authService.js';
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    const message = "Api esta em funcionamento";
    res.status(200).send(message);
});
app.get("/storedTokens", verifyAccessToken, (req, res) => {
    try {
        const tokens = getStoredTokens();
        res.status(200).send(tokens);
    }
    catch (err) {
        res.status(500).send("Error on getting stored tokens");
    }
});
app.get('/api', verifyAccessToken, (req, res) => {
    const message = "Eu estou autorizado";
    res.status(200).send(message);
});
app.post('/token', refresh, (req, res) => {
    if (res.locals.authenticated) {
        const response = {
            accesToken: res.locals.accessToken
        };
        res.status(200).send(response);
    }
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    getUserByUsername(username, (results) => {
        if (results.length > 0) {
            const user = results[0];
            comparePassword(password, user.password, (result) => {
                if (result) {
                    const payload = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        auth: user.auth,
                        isAdmin: user.isAdmin,
                        isFresh: true
                    };
                    const accessToken = generateAccessToken(payload);
                    const refreshToken = generateRefreshToken(payload);
                    if (!storeRefreshToken(refreshToken))
                        res.status(500).json({ message: "Error when storing the refresh token" });
                    const response = {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    };
                    res.status(200).json(response);
                }
                else {
                    res.status(401).json({ message: 'Invalid password' });
                }
            });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});
app.post('/register', (req, res) => {
    const { username, password, email, auth, isAdmin } = req.body;
    registerUser(username, password, email, auth, isAdmin, (result) => {
        if (result.affectedRows > 0) {
            res.json({ message: 'Registration successful' });
        }
        else {
            res.status(400).json({ message: 'Registration failed' });
        }
    });
});
app.delete('/logout', invalidateToken);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app.js.map