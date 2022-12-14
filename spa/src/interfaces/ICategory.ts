import { IMinifiedUser } from './IMinifiedUser';

export interface ICategory {
    id: string;
    name: string;
    emoji: string;
    created: string;
    updated?: string;
    creator: IMinifiedUser;
    editor?: IMinifiedUser;
}
