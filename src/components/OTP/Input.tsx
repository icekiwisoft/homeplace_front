// import { twMerge } from 'tailwind-merge';

export type InputProps = {
  inputClass?: string;
  value?: string;
  id?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  hasError?: boolean;
  maxLength?: number;
  errorMessage?: string;
  type?: string;
  label?: string;
  focus?: boolean;
  onClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

function Input({
  inputClass,
  value = '',
  id,
  inputRef,
  hasError = false,
  errorMessage,
  type = 'text',
  label,
  focus = false,
  onClick,
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
}: InputProps) {
  const labelClassName = `absolute left-3 pointer-events-none transition-all ${
    focus
      ? 'text-[10px] top-1'
      : 'text-sm translate-x-0 -translate-y-1/2 top-1/2'
  } ${hasError ? 'text-red-500' : ''}`;

  const inputClassName = twMerge(
    'w-full rounded-lg border border-gray-300 outline-none text-sm',
    inputClass,
    hasError && 'border-warm-red text-warm-red'
  );

  return (
    <div className='relative bg-slate w-full'>
      {label && (
        <label className={labelClassName} htmlFor={id}>
          {hasError ? errorMessage : label}
        </label>
      )}
      <input
        autoComplete='off'
        type={type}
        id={id}
        ref={inputRef}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        className={inputClassName}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
      />
      {hasError && errorMessage && (
        <p id={`${id}-error`} className='text-[10px] text-red-500 mt-1'>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default Input;
