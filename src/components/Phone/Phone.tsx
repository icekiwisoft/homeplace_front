import React, { useState, useEffect } from 'react';
import { CountrySelector, usePhoneInput } from 'react-international-phone';
import { parsePhoneNumber } from 'libphonenumber-js';
import { PhoneProps } from 'utils/types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const Phone: React.FC<PhoneProps> = ({ value }) => {
  const phoneInput = usePhoneInput({
    defaultCountry: 'cm',
    value,
  });

  const [formattedPhone, setFormattedPhone] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  // Fonction pour formater le numéro de téléphone
  const formatPhoneNumber = (number: string): string => {
    try {
      const parsedNumber = parsePhoneNumber(number);
      return parsedNumber ? parsedNumber.formatInternational() : number;
    } catch {
      return number;
    }
  };

  // Synchroniser le numéro formaté avec les changements de valeur
  useEffect(() => {
    const formatted = formatPhoneNumber(phoneInput.phone);
    setFormattedPhone(formatted);

    // Vérifier la validité
    try {
      const parsedNumber = parsePhoneNumber(phoneInput.phone);
      setIsValid(parsedNumber?.isValid() || false);
    } catch {
      setIsValid(false);
    }
  }, [phoneInput.phone]);

  return (
    <div className="flex items-center gap-2 mb-5 h-[41px]">
      {/* Sélecteur de pays */}
      <CountrySelector
        className="py-2 h-full px-2 border-b border-gray-800 focus:outline-none focus:border-black cursor-pointer"
        selectedCountry={phoneInput.country?.iso2 || 'cm'}
        onSelect={(country) => phoneInput.setCountry(country.iso2)}
        renderButtonWrapper={({ children, rootProps }) => (
          <button type="button" {...rootProps}>
            {children}
          </button>
        )}
      />
      {/* Champ d'entrée pour le numéro de téléphone */}
      <div className="relative w-full">
        <input
          className={`w-full py-2 border-b ${isValid ? 'border-gray-800' : 'border-red-500'
            } focus:outline-none focus:border-black`}
          placeholder="Phone number"
          type="tel"
          value={formattedPhone}
          onChange={(e) =>
            phoneInput.handlePhoneValueChange(
              e as React.ChangeEvent<HTMLInputElement>
            )
          }
          ref={phoneInput.inputRef}
        />
        {isValid ? (
          <FaCheckCircle className='absolute right-2 top-2 text-xs text-green-500' />
        ) : (
          (
            <FaTimesCircle className='absolute right-2 top-2 text-xs text-red-500' />
          )
        )}
      </div>
    </div>
  );
};

