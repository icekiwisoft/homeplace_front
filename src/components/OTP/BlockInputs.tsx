import { useEffect, useRef, useState } from 'react';
import Input from './Input';

type BlockInputsProps = {
  randomCode: string;
  handleSubmit: (otp: string[]) => void;
};

export default function BlockInputs({
  randomCode,
  handleSubmit,
}: BlockInputsProps) {
  const length = 6; // Nombre de cases
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const updatedOTP = [...OTP];
    updatedOTP[index] = value.slice(-1); // Garde le dernier chiffre entré
    setOTP(updatedOTP);

    // Passage à la case suivante
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Validation si toutes les cases sont remplies
    if (updatedOTP.join('').length === length) {
      setTimeout(() => {
        if (updatedOTP.join('') === randomCode) handleSubmit(updatedOTP);
      }, 500);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    switch (e.key) {
      case 'Backspace':
        if (!OTP[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
        break;
      default:
        break;
    }
  };

  const handleOnClick = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  return (
    <div className='flex justify-around items-center gap-2 mt-5 mb-2'>
      {OTP.map((_, index) => (
        <Input
          key={index}
          id={`otp-${index}`}
          inputRef={input => (inputRefs.current[index] = input!)}
          value={OTP[index]}
          maxLength={1}
          inputClass='w-12 h-12 text-center text-2xl font-extrabold text-orange-500 bg-orange-50 border border-transparent hover:border-orange-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
          onChange={e => handleInputChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onClick={() => handleOnClick(index)}
          hasError={false}
        />
      ))}
    </div>
  );
}
