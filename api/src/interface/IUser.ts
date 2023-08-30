export default interface IUser {
    id: number;
    username: string;
    password: string;
    email: string | null;
    auth: string;
    isAdmin: boolean;
    isFresh: boolean;
    iat: undefined | Date;
    created_at: Date;
}