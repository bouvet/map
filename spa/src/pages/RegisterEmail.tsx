import { FC, createContext, useContext } from 'react';

interface ContextState {
    name: string;
}

const UserContext = createContext({} as ContextState);

export const RegisterEmail: FC = () => <div />;
