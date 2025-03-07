export const categorizeOrders = (
  driverLocation: { latitude: number; longitude: number },
  orders: any[]
) => {
  const { latitude, longitude } = driverLocation;

  const quadrants = { front: [], back: [], left: [], right: [] };

  orders.forEach((order) => {
    const { latitude: orderLat, longitude: orderLng } = order;

    if (orderLat > latitude) {
      quadrants.front.push(order);
    } else if (orderLat < latitude) {
      quadrants.back.push(order);
    }
    if (orderLng > longitude) {
      quadrants.right.push(order);
    } else {
      quadrants.left.push(order);
    }
  });

  return quadrants;
};
interface Location {
  latitude: number;
  longitude: number;
}

interface Order extends Location {
  // Add other order properties if needed
}

interface Quadrants {
  front: Order[];
  back: Order[];
  left: Order[];
  right: Order[];
}

export const getBestRoute = (
  quadrants: Quadrants
): { direction: string; orders: Order[] }[] => {
  const sortedRoutes = Object.entries(quadrants).sort(
    (a, b) => b[1].length - a[1].length
  );

  return sortedRoutes.map(([direction, orders]) => ({ direction, orders }));
};

export const getRoute = async (orders: any, driverLocation: any) => {
  try {
    let returnArray: any[] = [];
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].length === 0) {
        continue;
      }
      const waypoints = orders[i].map((order: any) => ({
        location: `${order.latitude},${order.longitude}`,
        stopover: true,
      }));

      const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${
        driverLocation.latitude
      },${driverLocation.longitude}&destination=${
        waypoints[waypoints.length - 1].location
      }&waypoints=${waypoints
        .map((wp: any) => wp.location)
        .join("|")}&key=AIzaSyC1b4-xnb7a8Wfigq8yZGZ8IqkOshrEQ9c`;

      const response = await fetch(directionsUrl);
      const data = await response.json();

      returnArray.push(data);
    }
    console.log(returnArray.length);
    return returnArray;
  } catch (error) {
    console.log(error);
    return null;
  }
};
