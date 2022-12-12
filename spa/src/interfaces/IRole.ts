export interface IRole {
    id: string;
    name: string;
    created: string;
    updated: string;
    creator?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
    editor?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}
