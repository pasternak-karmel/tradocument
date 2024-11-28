'use client'

import React, { useEffect } from 'react'
import { create } from 'zustand'
import axios from 'axios'

interface Country {
  name: { common: string }
  cca2: string
}

interface City {
  name: string
}

interface CountryState {
  countries: Country[]
  selectedCountry: string
  cities: City[]
  isLoading: boolean
  error: string | null
  fetchCountries: () => Promise<void>
  selectCountry: (countryCode: string) => void
  fetchCities: (countryCode: string) => Promise<void>
}

const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  selectedCountry: '',
  cities: [],
  isLoading: false,
  error: null,
  fetchCountries: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all')
      set({ countries: response.data, isLoading: false })
    } catch (error) {
      set({ error: 'Error fetching countries', isLoading: false })
    }
  },
  selectCountry: (countryCode: string) => set({ selectedCountry: countryCode }),
  fetchCities: async (countryCode: string) => {
    set({ isLoading: true, error: null })
    try {
      // For demonstration purposes, we're using simulated cities
      // In a real application, you would fetch actual city data here
      const simulatedCities: City[] = [
        { name: 'City 1' },
        { name: 'City 2' },
        { name: 'City 3' },
      ]
      set({ cities: simulatedCities, isLoading: false })
    } catch (error) {
      set({ error: 'Error fetching cities', isLoading: false })
    }
  },
}))

export default function CountryCitySelector() {
  const {
    countries,
    selectedCountry,
    cities,
    isLoading,
    error,
    fetchCountries,
    selectCountry,
    fetchCities,
  } = useCountryStore()

  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value
    selectCountry(countryCode)
    if (countryCode) {
      await fetchCities(countryCode)
    }
  }

  return (
    <div className="space-y-4">
      {isLoading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
          Select a country
        </label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          disabled={isLoading}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <div>
          <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select a city
          </label>
          <select
            id="city-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            disabled={isLoading}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

