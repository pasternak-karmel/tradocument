"use server";

import axios from "axios";

// Interfaces for data handling
interface Coordinates {
  longitude: number;
  latitude: number;
}

// Function to fetch coordinates using OpenRouteService Geocoding API
const getCoordinates = async (
  location: string,
  apiKey: string
): Promise<Coordinates> => {
  const geocodeURL = "https://api.openrouteservice.org/geocode/search";

  try {
    const response = await axios.get(geocodeURL, {
      params: {
        text: location,
        api_key: apiKey,
      },
    });

    const feature = response.data.features[0];
    if (!feature) {
      throw new Error(`Coordinates not found for: ${location}`);
    }

    const [longitude, latitude] = feature.geometry.coordinates;
    return { longitude, latitude };
  } catch (error: any) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error("Failed to fetch coordinates");
  }
};

// Function to fetch the capital city using REST Countries API
const getCapitalCity = async (country: string): Promise<string> => {
  const restCountriesURL = `https://restcountries.com/v3.1/name/${country}`;

  try {
    const response = await axios.get(restCountriesURL);
    const countryData = response.data[0];
    const capital = countryData?.capital?.[0];

    if (!capital) {
      throw new Error("Capital not found for the given country");
    }

    return capital;
  } catch (error: any) {
    console.error("Error fetching capital city:", error.message);
    throw new Error("Failed to fetch capital city");
  }
};

// Function to calculate the distance using OpenRouteService Directions API
const calculate = async (
  startCoords: Coordinates,
  endCoords: Coordinates,
  apiKey: string
): Promise<number> => {
  const orsURL = "https://api.openrouteservice.org/v2/directions/driving-car";

  try {
    const response = await axios.post(
      orsURL,
      {
        coordinates: [
          [startCoords.longitude, startCoords.latitude],
          [endCoords.longitude, endCoords.latitude],
        ],
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    const distanceMeters = response.data.routes[0]?.summary?.distance;
    if (!distanceMeters) {
      throw new Error("Distance calculation failed");
    }

    return distanceMeters / 1000; // Convert to kilometers
  } catch (error: any) {
    console.error("Error calculating distance:", error.message);
    throw new Error("Failed to calculate distance");
  }
};

// Main function to integrate all steps
export const calculateDistance = async (
  userInput: string
): Promise<number | null> => {
  const orsApiKey = process.env.DISTANCE_API_KEY;

  if (!orsApiKey) {
    throw new Error("Missing OpenRouteService API key");
  }

  try {
    const [country, city] = userInput.split(",").map((part) => part.trim());

    if (!country || !city) {
      throw new Error("Invalid input. Please provide input as 'country, city'");
    }

    const capitalCity = await getCapitalCity(country);

    // Check if the user city is the same as the capital city (case-insensitive)
    if (city.toLowerCase() === capitalCity.toLowerCase()) {
      return 0; // Distance between the same city is 0
    }

    const userCityCoords = await getCoordinates(
      `${city}, ${country}`,
      orsApiKey
    );
    const capitalCityCoords = await getCoordinates(
      `${capitalCity}, ${country}`,
      orsApiKey
    );

    const distance = await calculate(
      userCityCoords,
      capitalCityCoords,
      orsApiKey
    );
    console.log(
      `Distance between ${city} and ${capitalCity}: ${distance.toFixed(2)} km`
    );

    return distance * 0.35;
  } catch (error: any) {
    console.error("Error:", error.message);
    // ShowError(error.message);
    return null;
  }
};

// calculateDistance

// const [country, city] = departLocation.split(",").map((item) => item.trim());
//   let countryCode = "";
//   let validCity = city;
//   let capitalCity = "";
