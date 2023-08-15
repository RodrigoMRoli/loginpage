import dotenv from 'dotenv'
import jwt, { JwtPayload } from "jsonwebtoken"

dotenv.config()
const secret = process.env.TOKEN_SECRET as string

export default function verifyToken(req: any, res: any, next: any): void {
    try {
        if (typeof req.headers.authorization === 'undefined') throw new Error("You must send Authorization header")
        const token = req.headers.authorization.split(" ")[1] as string
        if (isSessionValid(token, secret)) {
            // const decoded = jwt.verify(token, secret) as JwtPayload // show the decoded jwt
            const message = "Hello! Your token is valid."
            console.log(message)
            next()
        } else {
            res.status(403).send('Please log in')
        }
    } catch (err: any) {
        console.log('Token is not valid: ', err.message)
    }
}

const isSessionValid = (token: string, secret: string) => {
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