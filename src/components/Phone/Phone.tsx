import { Button, ChakraProvider, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CountrySelector, usePhoneInput } from 'react-international-phone';
import { PhoneProps } from 'utils/types';

export const Phone: React.FC<PhoneProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const phoneInput = usePhoneInput({
    defaultCountry: 'CM',
    value,
    onChange: data => {
      const phoneNumber = data.phone;

      // Vérification simple sur la longueur du numéro
      if (phoneNumber.length < 9 || phoneNumber.length > 15) {
        setError(
          'Le numéro de téléphone doit contenir entre 9 et 15 chiffres.'
        );
      } else if (/^\d+$/.test(phoneNumber)) {
        // Vérifie que le numéro contient uniquement des chiffres
        setError('Le numéro de téléphone ne doit contenir que des chiffres.');
      } else {
        setError(null); // Pas d'erreur, numéro valide
        onChange(phoneNumber);
      }
    },
  });

  return (
    <ChakraProvider>
      <div className='flex flex-col'>
        <div className='flex items-center'>
          <CountrySelector
            selectedCountry={
              phoneInput.country ? phoneInput.country.iso2 : 'CM'
            }
            onSelect={country => phoneInput.setCountry(country.iso2)}
            renderButtonWrapper={({ children, rootProps }) => (
              <Button {...rootProps} variant='outline' px='4px' mr='8px'>
                {children}
              </Button>
            )}
          />
          <Input
            placeholder='Phone number'
            type='tel'
            color='primary'
            value={phoneInput.phone}
            onChange={phoneInput.handlePhoneValueChange}
            width={200}
            ref={phoneInput.inputRef}
            isInvalid={!!error}
          />
        </div>
        {error && (
          <span className='text-red-500 mt-2 text-[12px] max-w-[75%]'>
            {error}
          </span>
        )}
      </div>
    </ChakraProvider>
  );
};
