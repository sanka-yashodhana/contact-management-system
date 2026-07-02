export interface ContactType {
    _id?: string;
    name?: string;
    email?: string;
    userId?: string | undefined;
    photo?: string;
    phone?: string;
    address?: string;
    tags?: string[];
}