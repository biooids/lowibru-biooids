import { Select } from "flowbite-react";
import React from "react";
import { GiWorld } from "react-icons/gi";

function CountryComp() {
  return (
    <Select id="region" name="country" icon={GiWorld} required>
      <option>North America</option>
      <option>South America</option>
      <option>Europe</option>
      <option>Asia</option>
      <option>Africa</option>
      <option>Oceania</option>
      <option>Antarctica</option>
      <option>Australia</option>
    </Select>
  );
}

export default CountryComp;
