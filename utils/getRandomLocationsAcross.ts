export const getRandomLocationsAcross = (
  latitude: number,
  longitude: number,
  count = 20,
  radius = 1000
) => {
  const earthRadius = 6371000; // Earth radius in meters
  const locations = [];

  for (let i = 0; i < count; i++) {
    const randomDistance = Math.random() * radius; // Random distance within radius
    const randomAngle = Math.random() * 2 * Math.PI; // Full circle (0 to 360 degrees)

    // Convert distance to latitude/longitude
    const deltaLatitude = (randomDistance / earthRadius) * (180 / Math.PI);
    const deltaLongitude =
      (randomDistance / (earthRadius * Math.cos((latitude * Math.PI) / 180))) *
      (180 / Math.PI);

    // Apply random angle to get coordinates in all directions
    const newLatitude = latitude + deltaLatitude * Math.cos(randomAngle);
    const newLongitude = longitude + deltaLongitude * Math.sin(randomAngle);

    locations.push({
      latitude: Number(newLatitude.toFixed(6)),
      longitude: Number(newLongitude.toFixed(6)),
    });
  }

  return locations;
};
