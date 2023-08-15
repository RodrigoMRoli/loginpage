declare module 'express-session' {
    interface SessionData {
        userId: number; // Add the properties you want here
    }
}