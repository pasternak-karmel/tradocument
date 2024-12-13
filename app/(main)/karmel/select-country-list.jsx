"use client";

import { useEffect, useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export function CountrySelector({ onChange, disabled, resetKey }) {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState({
    country: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    setCountryid(0);
    setstateid(0);
    setSelectedAddress({
      country: "",
      state: "",
      city: "",
    });
    onChange("");
  }, [resetKey]);

  const updateAddress = (newData, type) => {
    const updated = { ...selectedAddress, [type]: newData.name || "" };
    setSelectedAddress(updated);

    const fullAddress = [updated.country, updated.city]
      .filter(Boolean)
      .join(", ");
    console.log(fullAddress);

    onChange(fullAddress);
  };
  return (
    <div>
      <h6>Pays</h6>
      <CountrySelect
        disabled={disabled}
        onChange={(e) => {
          setCountryid(e.id);
          updateAddress(e, "country");
        }}
        placeHolder="Selectionnez le pays"
      />

      <h6>Région</h6>
      <StateSelect
        disabled={disabled}
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
        }}
        placeHolder="Selectionnez la région"
      />
      <h6>Ville</h6>
      <CitySelect
        disabled={disabled}
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          updateAddress(e, "city");
        }}
        placeHolder="Selectionnez la ville"
      />
    </div>
  );
}
