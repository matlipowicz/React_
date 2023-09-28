import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const useTogglePassword = () => {
  const [visible, setVisibility] = useState(false);
  const changeInputType = () => {
    setVisibility(!visible);
  };
  const ToggleEye = visible ? (
    <AiOutlineEye
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '30px',
        cursor: 'pointer',
        zIndex: '100',
      }}
      onClick={changeInputType}
    />
  ) : (
    <AiOutlineEyeInvisible
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '30px',
        cursor: 'pointer',
        zIndex: '100',
      }}
      onClick={changeInputType}
    />
  );
  const InputType: 'text' | 'password' = visible ? 'text' : 'password';
  return [InputType, ToggleEye];
};
