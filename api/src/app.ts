import express from 'express'
import jwt from 'jsonwebtoken'
import { getUserByUsername, comparePassword, registerUser } from './service/userService.js'
import IUser from './interface/IUser.js'
import dotenv from 'dotenv'
import verifyToken from './middleware/verifyToken.js'

// env variables
dotenv.config();
const port = process.env.PORT
const secret = process.env.TOKEN_SECRET as string

const app = express()
app.use(express.json())

// auth requests
app.use('/api', verifyToken)

app.get('/api', (req, res) => {
    const message = "Eu estou autorizado"
    res.status(200).send(message)
})

app.post('/login', (req, res) => {
    const { username, password, expiration } = req.body

    getUserByUsername(username, (results: IUser[]) => {
        if (results.length > 0) {
            const user = results[0]
            comparePassword(password, user.password, (result: IUser) => {
                if (result) {
                    const payload = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        auth: "default",
                        isAdmin: true,
                    }
                    const token = jwt.sign(payload, secret, { expiresIn: expiration + 'm' })
                    res.status(200).json({ token: token })
                } else {
                    res.status(401).json({ message: 'Invalid password' })
                }
            })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    })
})

app.post('/register', (req, res) => {
    const { username, password, email } = req.body
  
    registerUser(username, password, email, (result) => {
        if (result.affectedRows > 0) {
            res.json({ message: 'Registration successful' })
        } else {
            res.status(400).json({ message: 'Registration failed' })
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

