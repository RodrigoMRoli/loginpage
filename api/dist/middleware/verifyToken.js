import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();
const secret = process.env.TOKEN_SECRET;
export default function verifyToken(req, res, next) {
    try {
        if (typeof req.headers.authorization === 'undefined')
            throw new Error("You must send Authorization header");
        const token = req.headers.authorization.split(" ")[1];
        if (isSessionValid(token, secret)) {
            const message = "Hello! Your token is valid.";
            console.log(message);
            next();
        }
        else {
            res.status(403).send('Please log in');
        }
    }
    catch (err) {
        console.log('Token is not valid: ', err.message);
    }
}
const isSessionValid = (token, secret) => {
    try {
        jwt.verify(token, secret, function (err, decoded) {
            if (err)
                throw new Error(JSON.stringify(err));
        });
        return true;
    }
    catch (err) {
        console.log('Token is not valid:', err.message);
        return false;
    }
};
//# sourceMappingURL=verifyToken.js.map