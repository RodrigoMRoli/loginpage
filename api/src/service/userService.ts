import bcrypt from 'bcryptjs'
import connection from '../db.js'

export const getUserByUsername = (username: string, callback: Function): void => {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
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

export const registerUser = (username: string, password: string, email: string, callback: (result: any) => void): void => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], (err, results) => {
        if (err) throw err;
        callback(results);
    });
};