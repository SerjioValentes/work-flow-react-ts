
export interface UserStore {
    email: string;
    password: string;
    accessToken: string | null;
    errors: [] | null;
}
