"use server";

import axios from "axios";
import levenshtein from "fast-levenshtein";

interface Point {
  departLocation: string; // "Country, City"
}

const axiosInstance = axios.create({
  headers: {
    "x-rapidapi-key": process.env.DISTANCE_API_KEY || "",
    "x-rapidapi-host": "distanceto.p.rapidapi.com",
    "Content-Type": "application/json",
  },
});

// Helper to fetch and find the closest country name
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

// Helper to get the capital of a country
const getCapitalCity = async (countryName: string) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const capital = response.data[0]?.capital?.[0];
    if (!capital) throw new Error("Capital not found");
    return capital;
  } catch (error) {
    console.error("Error fetching capital city", error);
    throw new Error("Failed to fetch capital city");
  }
};

// Helper to validate city within a country
const validateCity = async (countryCode: string, cityName: string) => {
  try {
    const response = await axios.get(`https://api.geonames.org/searchJSON`, {
      params: {
        q: cityName,
        country: countryCode,
        maxRows: 1,
        username: process.env.GEONAMES_USERNAME,
      },
    });

    const city = response.data.geonames[0];
    return city ? city.name : cityName; // Return validated city name
  } catch (error) {
    console.error("City validation failed", error);
    return cityName;
  }
};

// Function to calculate distance
export const calculateDistanceToCapital = async ({
  departLocation,
}: Point) => {
  const [country, city] = departLocation.split(",").map((item) => item.trim());
  let countryCode = "";
  let validCity = city;
  let capitalCity = "";

  try {
    const normalizedCountry = await findClosestCountry(country);
    const countryResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${normalizedCountry}`
    );
    countryCode = countryResponse.data[0]?.cca2 || "";

    if (countryCode) {
      validCity = await validateCity(countryCode, city);
      capitalCity = await getCapitalCity(normalizedCountry);
    }
  } catch (error) {
    console.error("Error fetching country or city", error);
    throw new Error("Invalid country or city");
  }

  if (!countryCode || !capitalCity) {
    throw new Error("Invalid country or capital city");
  }

  const options = {
    method: "POST",
    url: "https://distanceto.p.rapidapi.com/distance/route",
    params: { sea: "true" },
    data: {
      route: [
        {
          country: countryCode,
          name: validCity,
        },
        {
          country: countryCode,
          name: capitalCity,
        },
      ],
    },
  };

  try {
    const response = await axiosInstance.request(options);
    const distanceKm = response.data?.route?.greatCircle;

    if (!distanceKm) {
      throw new Error("Distance calculation failed");
    }

    return distanceKm * 0.25;
  } catch (error) {
    console.error("Error calculating distance", error);
    throw new Error("Failed to calculate distance");
  }
};


//calculateDistance