"use client";
import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export function CountrySelector({ onChange }) {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState({
    country: "",
    state: "",
    city: "",
  });

  const updateAddress = (newData, type) => {
    const updated = { ...selectedAddress, [type]: newData.name || "" };
    setSelectedAddress(updated);

    const fullAddress = [updated.country, updated.city]
      .filter(Boolean)
      .join(", ");
    onChange(fullAddress);
  };
  return (
    <div>
      <h6>All Country</h6>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
          updateAddress(e, "country");
        }}
        placeHolder="Select Country"
      />

      <h6>State</h6>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
          // updateAddress(e, "state");
        }}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          updateAddress(e, "city");
        }}
        placeHolder="Select City"
      />
    </div>
  );
}
