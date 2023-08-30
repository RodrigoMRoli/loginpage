import 'dotenv';
import jwt from 'jsonwebtoken';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
function generateAccessToken(payload) {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: '30s' });
}
function generateRefreshToken(payload) {
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: "10m" });
}
export { generateAccessToken, generateRefreshToken };
//# sourceMappingURL=authHandler.js.map