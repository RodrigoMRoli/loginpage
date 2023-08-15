export default interface IUser {
    id: number;
    username: string;
    password: string;
    email: string | null;
    created_at: Date;
}