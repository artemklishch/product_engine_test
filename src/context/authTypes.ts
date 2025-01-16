import { ErrorData } from "./types";

export type UserLocalData = {
    userId: number;
};

export type UserData = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

export type AuthProvider = {
    user: UserData | null;
    signIn: (username: string, password: string) => Promise<UserData | ErrorData>;
    signOut: () => void;
};

