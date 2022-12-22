import { IMinifiedUser } from './IMinifiedUser';

export interface IRole {
    id: string;
    name: string;
    created: string;
    updated?: string;
    creator?: IMinifiedUser;
    editor?: IMinifiedUser;
}
