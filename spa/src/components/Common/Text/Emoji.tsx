import { FC } from 'react';

interface Props {
    symbol: string;
}

export const Emoji: FC<Props> = ({ symbol }) => <span>{symbol}</span>;
