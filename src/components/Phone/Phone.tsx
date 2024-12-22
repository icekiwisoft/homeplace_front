import React from 'react';
import { CountrySelector, usePhoneInput } from 'react-international-phone';
import { PhoneProps } from 'utils/types';

export const Phone: React.FC<PhoneProps> = ({ value }) => {
  const phoneInput = usePhoneInput({
    defaultCountry: 'cm',
    value,
    onChange(phone) {
      
    },
  });

  // // Gérer le changement de numéro
  // const handlePhoneChange = (phone: string) => {
  //   phoneInput.handlePhoneValueChange(phone);
  //   if (onChange) onchange(phone);
  // };

  return (
    <div className="flex items-center gap-2 mb-5 h-[41px]">
      {/* Sélecteur de pays */}
      <CountrySelector
        className="py-2 h-full px-2 border-b border-gray-800 focus:outline-none focus:border-black cursor-pointer"
        selectedCountry={phoneInput.country?.iso2 || 'cm'}
        onSelect={(country) => phoneInput.setCountry(country.iso2)}
        renderButtonWrapper={({ children, rootProps }) => (
          <button
            type='button'
            {...rootProps}
          >
            {children}
          </button>
        )}
      />
      {/* Champ d'entrée pour le numéro de téléphone */}
      <input
        className="w-full py-2 border-b border-gray-800 focus:outline-none focus:border-black"
        placeholder="Phone number"
        type="tel"
        value={phoneInput.phone}
        // onChange={(e) => handlePhoneChange(e.target.value)}
        ref={phoneInput.inputRef}
      />
    </div>
  );
};
