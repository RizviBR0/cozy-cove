"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface UserLocation {
  countryCode: string;
  countryName: string;
  isLoading: boolean;
  error: string | null;
}

// Mapping of country codes to names
const COUNTRY_NAMES: Record<string, string> = {
  GLOBAL: "Global",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  IT: "Italy",
  NL: "Netherlands",
  BE: "Belgium",
  AT: "Austria",
  CH: "Switzerland",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  PL: "Poland",
  PT: "Portugal",
  IE: "Ireland",
  JP: "Japan",
  KR: "South Korea",
  CN: "China",
  HK: "Hong Kong",
  SG: "Singapore",
  MY: "Malaysia",
  TH: "Thailand",
  PH: "Philippines",
  ID: "Indonesia",
  VN: "Vietnam",
  IN: "India",
  BD: "Bangladesh",
  PK: "Pakistan",
  AE: "UAE",
  SA: "Saudi Arabia",
  EG: "Egypt",
  ZA: "South Africa",
  NG: "Nigeria",
  BR: "Brazil",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  RU: "Russia",
  UA: "Ukraine",
  TR: "Turkey",
  IL: "Israel",
  NZ: "New Zealand",
};

// Countries we support for shipping display - generated from COUNTRY_NAMES
export const SUPPORTED_COUNTRIES = [
  { code: "GLOBAL", name: "Global" },
  { code: "AE", name: "UAE" },
  { code: "AR", name: "Argentina" },
  { code: "AT", name: "Austria" },
  { code: "AU", name: "Australia" },
  { code: "BD", name: "Bangladesh" },
  { code: "BE", name: "Belgium" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  { code: "CH", name: "Switzerland" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "EG", name: "Egypt" },
  { code: "ES", name: "Spain" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "HK", name: "Hong Kong" },
  { code: "ID", name: "Indonesia" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IN", name: "India" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "MX", name: "Mexico" },
  { code: "MY", name: "Malaysia" },
  { code: "NG", name: "Nigeria" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "NZ", name: "New Zealand" },
  { code: "PH", name: "Philippines" },
  { code: "PK", name: "Pakistan" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RU", name: "Russia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SE", name: "Sweden" },
  { code: "SG", name: "Singapore" },
  { code: "TH", name: "Thailand" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "US", name: "United States" },
  { code: "VN", name: "Vietnam" },
  { code: "ZA", name: "South Africa" },
];

interface LocationContextValue extends UserLocation {
  setCountry: (code: string) => void;
  getCountryName: (code: string) => string;
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<UserLocation>({
    countryCode: "GLOBAL",
    countryName: "Global",
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Try to get stored location first
    const stored = localStorage.getItem("userCountry");
    if (stored) {
      const countryName = COUNTRY_NAMES[stored] || stored;
      setLocation({
        countryCode: stored,
        countryName,
        isLoading: false,
        error: null,
      });
      return;
    }

    // Fetch location from IP
    async function fetchLocation() {
      try {
        // Using ip-api.com (free, no API key needed, returns country code)
        const response = await fetch(
          "http://ip-api.com/json/?fields=countryCode,country"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location");
        }

        const data = await response.json();

        if (data.countryCode) {
          const countryCode = data.countryCode;
          const countryName =
            COUNTRY_NAMES[countryCode] || data.country || countryCode;

          // Check if it's a supported country, otherwise use GLOBAL
          const isSupported = SUPPORTED_COUNTRIES.some(
            (c) => c.code === countryCode
          );

          const finalCode = isSupported ? countryCode : "GLOBAL";
          const finalName = isSupported ? countryName : "Global";

          localStorage.setItem("userCountry", finalCode);

          setLocation({
            countryCode: finalCode,
            countryName: finalName,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error("No country data");
        }
      } catch (error) {
        console.error("Location detection failed:", error);
        setLocation({
          countryCode: "GLOBAL",
          countryName: "Global",
          isLoading: false,
          error: "Location detection failed",
        });
      }
    }

    fetchLocation();
  }, []);

  const setCountry = (code: string) => {
    const countryName = COUNTRY_NAMES[code] || code;
    localStorage.setItem("userCountry", code);
    setLocation({
      countryCode: code,
      countryName,
      isLoading: false,
      error: null,
    });
  };

  const getCountryName = (code: string) => {
    return COUNTRY_NAMES[code] || code;
  };

  return (
    <LocationContext.Provider
      value={{ ...location, setCountry, getCountryName }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
