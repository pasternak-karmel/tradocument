"use server";

import axios from "axios";

interface Point {
  departLocation: string;
  arriverLocation: string;
}

export const calculateDistance = async ({
  departLocation,
  arriverLocation,
}: Point) => {
  const [departCountry, departCity] = departLocation
    .split(",")
    .map((item) => item.trim());
  const [arriverCountry, arriverCity] = arriverLocation
    .split(",")
    .map((item) => item.trim());

  let departPrefix = "";
  let arriverPrefix = "";

  try {
    const depart = await axios.get(
      `https://restcountries.com/v3.1/name/${departCountry}`
    );
    departPrefix = depart.data[0].cca2;
  } catch (error) {
    console.error("Departure country not found", error);
  }

  try {
    const arriver = await axios.get(
      `https://restcountries.com/v3.1/name/${arriverCountry}`
    );
    arriverPrefix = arriver.data[0].cca2;
  } catch (error) {
    console.error("Arrival country not found", error);
  }

  const options = {
    method: "POST",
    url: "https://distanceto.p.rapidapi.com/distance/route",
    params: { sea: "true" },
    headers: {
      "x-rapidapi-key": process.env.DISTANCE_API_KEY,
      "x-rapidapi-host": "distanceto.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      route: [
        {
          country: departPrefix, // Use the country prefix
          name: departCity,
        },
        {
          country: arriverPrefix, // Use the country prefix
          name: arriverCity,
        },
      ],
    },
  };

  const response = await axios.request(options);
  const distanceKm = response.data?.route?.sea?.distance;

  return distanceKm * 0.18;
};
