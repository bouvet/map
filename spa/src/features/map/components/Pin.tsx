type Props = {
    onClick: any;
    fill: string;
  };
  
  export const Pin: React.FC<Props> = ({ onClick, fill }) => {
    return (
      <button onClick={onClick}>
        <svg
          width='30'
          height='40'
          viewBox='0 0 33 54'
          fill={fill}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M33 16.5C33 25.6127 28 33 16.5 53.5C5 33 0 25.6127 0 16.5C0 7.3873 7.3873 0 16.5 0C25.6127 0 33 7.3873 33 16.5Z'
            fill='#282828'
          />
        </svg>
      </button>
    );
  };
  