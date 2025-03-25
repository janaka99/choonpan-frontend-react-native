export const findNearestPoint = (currentCoords: any, route: any) => {
  let minDistance = Number.MAX_VALUE;
  let nearestIndex = 0;

  route.forEach((point: any, index: any) => {
    const distance = getDistance(
      currentCoords.latitude,
      currentCoords.longitude,
      point.latitude,
      point.longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
};

// Haversine formula to calculate distance between two coordinates
const getDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
  const toRad = (value: any) => (value * Math.PI) / 180;
  const R = 6371e3; // Earth radius in meters

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
