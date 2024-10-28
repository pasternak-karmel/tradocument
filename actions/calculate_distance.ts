"use server";

import axios from "axios";
import levenshtein from "fast-levenshtein";

interface Point {
  departLocation: string;
  arriverLocation: string;
}

const axiosInstance = axios.create({
  headers: {
    "x-rapidapi-key": process.env.DISTANCE_API_KEY || "",
    "x-rapidapi-host": "distanceto.p.rapidapi.com",
    "Content-Type": "application/json",
  },
});

// Helper to fetch and find closest country
const findClosestCountry = async (countryName: string) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    const countries = response.data;

    let closestMatch = countryName;
    let minDistance = Infinity;

    countries.forEach((country: any) => {
      const name = country.name.common;
      const distance = levenshtein.get(
        name.toLowerCase(),
        countryName.toLowerCase()
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestMatch = name;
      }
    });

    return closestMatch;
  } catch (error) {
    console.error("Error fetching countries", error);
    return countryName;
  }
};

// Helper to validate region within a country
const validateRegion = async (countryCode: string, regionName: string) => {
  try {
    const response = await axios.get(`https://api.geonames.org/searchJSON`, {
      params: {
        q: regionName,
        country: countryCode,
        maxRows: 1,
        username: process.env.GEONAMES_USERNAME,
      },
    });

    const region = response.data.geonames[0];
    return region ? region.name : regionName; // Return validated region name
  } catch (error) {
    console.error("Region validation failed", error);
    return regionName;
  }
};

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
  let validDepartCity = departCity;
  let validArriverCity = arriverCity;

  try {
    const normalizedDepartCountry = await findClosestCountry(departCountry);
    const departResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${normalizedDepartCountry}`
    );
    departPrefix = departResponse.data[0]?.cca2 || "";

    if (departPrefix) {
      validDepartCity = await validateRegion(departPrefix, departCity);
    }
  } catch (error) {
    console.error("Departure country or city not found or invalid", error);
  }

  try {
    const normalizedArriverCountry = await findClosestCountry(arriverCountry);
    const arriverResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${normalizedArriverCountry}`
    );
    arriverPrefix = arriverResponse.data[0]?.cca2 || "";

    if (arriverPrefix) {
      validArriverCity = await validateRegion(arriverPrefix, arriverCity);
    }
  } catch (error) {
    console.error("Arrival country or city not found or invalid", error);
  }

  if (!departPrefix || !arriverPrefix) {
    throw new Error("Invalid departure or arrival country");
  }

  const options = {
    method: "POST",
    url: "https://distanceto.p.rapidapi.com/distance/route",
    params: { sea: "true" },
    data: {
      route: [
        {
          country: departPrefix,
          name: validDepartCity,
        },
        {
          country: arriverPrefix,
          name: validArriverCity,
        },
      ],
    },
  };

  try {
    const response = await axiosInstance.request(options);
    const distanceKm = response.data?.route?.sea?.distance;

    if (!distanceKm) {
      throw new Error("Distance calculation failed");
    }

    return distanceKm * 0.25;
  } catch (error) {
    console.error("Error calculating distance", error);
    throw new Error("Failed to calculate distance");
  }
};
