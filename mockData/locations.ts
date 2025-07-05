export const LOCATIONS = [
  "Mall Road",
  "Airport", 
  "Railway Station",
  "City Center",
  "University",
  "Hospital",
  "Bus Stand",
  "Market Square",
  "Tech Park",
  "Lake View",
  "Stadium",
  "Old City"
] as const;

export type Location = typeof LOCATIONS[number];