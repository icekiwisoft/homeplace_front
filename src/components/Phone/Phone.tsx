import { Button, ChakraProvider, Input } from "@chakra-ui/react";
import React from "react";

import { CountrySelector, usePhoneInput } from "react-international-phone";
import { PhoneProps } from "utils/types";


export const Phone: React.FC<PhoneProps> = ({
    value,
    onChange
  }) => {
    const phoneInput = usePhoneInput({
      defaultCountry: "CM",
      value,
      onChange: (data) => {
        onChange(data.phone);
      }
    });
  
    return (
      <ChakraProvider>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CountrySelector
            selectedCountry={phoneInput.country ? phoneInput.country.iso2 : "CM"}
            onSelect={(country) => phoneInput.setCountry(country.iso2)}
            renderButtonWrapper={({ children, rootProps }) => (
              <Button {...rootProps} variant="outline" px="4px" mr="8px">
                {children}
              </Button>
            )}
          />
          <Input
            placeholder="Phone number"
            type="tel"
            color="primary"
            value={phoneInput.phone}
            onChange={phoneInput.handlePhoneValueChange}
            width={200}
            ref={phoneInput.inputRef}
          />
        </div>
      </ChakraProvider>
    );
  };
  