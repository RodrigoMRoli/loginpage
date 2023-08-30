import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connection from './db.js';
export const getUserByUsername = (username, callback) => {
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err)
            throw err;
        callback(results);
    });
};
export const comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, result) => {
        if (err)
            throw err;
        callback(result);
    });
};
export const registerUser = (username, password, email, callback) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], (err, results) => {
        if (err)
            throw err;
        callback(results);
    });
};
export const isSessionValid = (token, secret) => {
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
//# sourceMappingURL=userService.js.map