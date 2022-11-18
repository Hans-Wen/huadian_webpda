import { useRef, useState } from 'react';

export const useInputState = () => {
  const inputRef: any = useRef();
  const [value, setValue] = useState('');
  return {
    inputRef,
    value,
    setValue,
  };
};
