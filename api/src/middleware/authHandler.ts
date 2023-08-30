import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import jwt, { JwtPayload } from "jsonwebtoken"
import IUser from '../interface/IUser'

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string

function generateAccessToken(payload: IUser) {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: '15s' })
}

function generateRefreshToken(payload: IUser) {
    return jwt.sign(payload, refreshTokenSecret)
}

function storeRefreshToken(token: string) {
    try {
        let tokens: Array<string> = []
        if (fs.existsSync("refreshTokens.json")) {
            tokens = JSON.parse(fs.readFileSync("refreshTokens.json").toString())
        }
        tokens = [...tokens, token ]
        fs.writeFileSync("refreshTokens.json", JSON.stringify(tokens, null, 4))
        return true
    } catch(error) {
        console.log("Error storing token")
        return false
    }
}

function invalidateToken(req: Request, res: Response): void {
    const authorization = req.headers.authorization as string
    if (typeof authorization === 'undefined') {
        res.status(403).json({ message: "You must send Authorization header" })
    } else {
        const refreshToken = authorization.split(" ")[1]
        try {
            if (fs.existsSync("refreshTokens.json")) {
                const tokens = JSON.parse(fs.readFileSync("refreshTokens.json").toString()) ?? [] as Array<string>
                if (!tokens.includes(refreshToken)) {
                    res.status(401).json({ message: "Refresh Token Not Found" })
                } else {
                    const newTokens = tokens.filter((token: string) => token !== refreshToken)
                    fs.writeFileSync("refreshTokens.json", JSON.stringify(newTokens, null, 4))
                    res.status(200).json({ message: "Logged out successfully" })
                }
            } else {
                fs.writeFileSync("refreshTokens.json", JSON.stringify([]))
                res.status(401).json({ message: "Refresh Token Not Found" })
            }
        } catch (error) {
            res.status(500).json({ message: "Error when accessing the tokens database" })
        }
    }
}

const isTokenValid = (token: string, secret: string) => {
    try {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) throw new Error(JSON.stringify(err))
        })
        return true;
    } catch (err: any) {
        console.log('Token is not valid:', err.message);
        return false;
    }
}

function verifyAccessToken(req: Request, res: Response, next: NextFunction): void {

    try {
        if (typeof req.headers.authorization === 'undefined') throw new Error("You must send Authorization header")
        const token = req.headers.authorization.split(" ")[1] as string
        if (isTokenValid(token, accessTokenSecret)) {
            next()
        } else {
            throw new Error ("Token invalid")
        }
    } catch (err: any) {
        res.status(403).send('Please log in')
    }
}

function refresh(req: Request, res: Response, next: NextFunction): void {
    
    try {
        if (typeof req.headers.authorization === 'undefined') throw new Error("You must send Authorization header")
        const authToken = req.headers.authorization.split(" ")[1] as string
        if (isTokenValid(authToken, refreshTokenSecret)) {
        const tokens = JSON.parse(fs.readFileSync("refreshTokens.json").toString()) as Array<string>
        if (!tokens.some((token) => token === authToken)) throw new Error ("Invalid token")
        const payload = jwt.verify(authToken, refreshTokenSecret) as IUser
        payload.isFresh = false
        delete payload.iat
        res.locals.authenticated = true
        res.locals.accessToken = generateAccessToken(payload)
        next()
        } else {
            throw new Error ("Invalid token")
        }
    } catch (err: any) {
        console.log(err.message)
        res.status(403).send("Invalid token")
    }
}

export {
    verifyAccessToken,
    generateAccessToken,
    generateRefreshToken,
    storeRefreshToken,
    invalidateToken,
    refresh
}