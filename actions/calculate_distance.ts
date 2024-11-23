"use server";

import levenshtein from "js-levenshtein";

// Interfaces for data handling
interface Coordinates {
  longitude: number;
  latitude: number;
}

interface Country {
  name: {
    common: string;
    nativeName: { [key: string]: { common: string } };
  };
  capital?: string[];
}

// Function to normalize the country name using REST Countries API
const normalizeCountryName = async (
  country: string
): Promise<{ normalizedName: string; capital: string }> => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Failed to fetch countries data");
    const countries: Country[] = await response.json();

    // Perform a fuzzy search using Levenshtein distance
    const matchedCountry = countries.find((c) => {
      const commonName = c.name.common.toLowerCase();
      const nativeName =
        Object.values(c.name.nativeName || {})[0]?.common?.toLowerCase() || "";
      const input = country.toLowerCase();

      return (
        levenshtein(commonName, input) <= 2 ||
        levenshtein(nativeName, input) <= 2
      );
    });

    if (!matchedCountry) {
      throw new Error(`Pays "${country}" introuvable.`);
    }

    const normalizedName = matchedCountry.name.common;
    const capital = matchedCountry.capital?.[0];
    if (!capital) {
      throw new Error(`Capitale introuvable pour "${normalizedName}".`);
    }

    return { normalizedName, capital };
  } catch (error) {
    console.error("Erreur lors de la normalisation du pays :", error);
    throw new Error("Impossible de normaliser le pays.");
  }
};

// Function to fetch coordinates using OpenRouteService Geocoding API
const getCoordinates = async (location: string): Promise<Coordinates> => {
  const geocodeURL = "https://api.openrouteservice.org/geocode/search";
  const params = new URLSearchParams({
    text: location,
    api_key: process.env.DISTANCE_API_KEY || "",
  });

  try {
    const response = await fetch(`${geocodeURL}?${params}`);
    if (!response.ok) throw new Error("Failed to fetch coordinates");
    const data = await response.json();

    const feature = data.features[0];
    if (!feature) {
      throw new Error(`Coordonnées introuvables pour : ${location}`);
    }

    const [longitude, latitude] = feature.geometry.coordinates;
    return { longitude, latitude };
  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées :", error);
    throw new Error("Impossible de récupérer les coordonnées.");
  }
};

// Function to calculate the distance between two coordinates
const calculate = async (
  coord1: Coordinates,
  coord2: Coordinates
): Promise<number> => {
  const url = "https://api.openrouteservice.org/v2/matrix/driving-car";
  const body = JSON.stringify({
    locations: [
      [coord1.longitude, coord1.latitude],
      [coord2.longitude, coord2.latitude],
    ],
    metrics: ["distance"],
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DISTANCE_API_KEY}`,
      },
      body,
    });

    if (!response.ok) throw new Error("Failed to calculate distance");
    const data = await response.json();

    const distanceMeters = data.distances[0][1];
    const distanceKm = distanceMeters / 1000; // Convert meters to kilometers
    return distanceKm;
  } catch (error) {
    console.error("Erreur lors du calcul de la distance :", error);
    throw new Error("Impossible de calculer la distance.");
  }
};

// Main function to calculate distance between a city and its country's capital
export const calculateDistance = async (userInput: string): Promise<number> => {
  try {
    const [country, city] = userInput.split(",").map((part) => part.trim());

    if (!country || !city) {
      throw new Error(
        "Entrée invalide. Fournissez l'entrée au format 'pays, ville'."
      );
    }

    // Step 1: Normalize the country name and get the capital
    const { normalizedName, capital } = await normalizeCountryName(country);

    // Step 2: Check if the input city is the same as the capital (case-insensitive)
    if (city.toLowerCase() === capital.toLowerCase()) {
      return 0; // Distance is 0 if the city is the same as the capital
    }

    // Step 3: Get coordinates for the user city and the capital
    const [userCityCoords, capitalCoords] = await Promise.all([
      getCoordinates(`${city}, ${normalizedName}`),
      getCoordinates(`${capital}, ${normalizedName}`),
    ]);

    console.log(userCityCoords);

    // Step 4: Calculate distance between the two locations
    const distance = await calculate(userCityCoords, capitalCoords);

    return Number(distance.toFixed(2)) * 0.35;
  } catch (error: any) {
    console.error("Erreur dans le processus global :", error.message);
    throw new Error(error.message || "Erreur inattendue.");
  }
};
