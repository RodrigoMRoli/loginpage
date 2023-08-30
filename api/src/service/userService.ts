import bcrypt from 'bcryptjs'
import connection from '../db.js'

export const getUserByUsername = (username: string, callback: Function): void => {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) throw err
    callback(results)
  })
}

export const getUserById = (id: Number, callback: Function): void => {
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err
    callback(results)
  })
}

export const comparePassword = (password: string, hash: string, callback: Function): void => {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) throw err
    callback(result)
  })
}

export const registerUser = (username: string, password: string, email: string, auth: string, isAdmin: string, callback: (result: any) => void): void => {
    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    connection.query('INSERT INTO users (username, password, email, auth, isAdmin) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, email, auth, isAdmin], (err, results) => {
        if (err) throw err;
        callback(results);
    });
};