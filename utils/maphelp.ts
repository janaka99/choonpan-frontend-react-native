import polyline from "@mapbox/polyline";

export const updateRoutes = async (routes: any[]) => {
  const routesArray = [];
  if (routes.length > 0) {
    for (let i = 0; i < routes.length; i++) {
      // Ensure routes exist
      const decodedPoints = polyline.decode(routes[i].route).map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));

      const routeWithId = {
        id: i,
        route: decodedPoints,
        orderInsights: routes[i].orderInsights,
      };
      routesArray.push(routeWithId);
    }
    return routesArray;
  }
};
