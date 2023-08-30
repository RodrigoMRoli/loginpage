import bcrypt from 'bcryptjs';
import connection from '../db.js';
export const getUserByUsername = (username, callback) => {
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err)
            throw err;
        callback(results);
    });
};
export const getUserById = (id, callback) => {
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
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
export const registerUser = (username, password, email, auth, isAdmin, callback) => {
    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = bcrypt.hashSync(password, salt);
    connection.query('INSERT INTO users (username, password, email, auth, isAdmin) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, email, auth, isAdmin], (err, results) => {
        if (err)
            throw err;
        callback(results);
    });
};
//# sourceMappingURL=userService.js.map