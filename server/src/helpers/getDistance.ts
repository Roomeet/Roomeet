/* eslint-disable no-mixed-operators */
type Coordinates = {
    lat: number,
    lng: number,
};

const getDistance = (p1: Coordinates, p2: Coordinates): number => {
  const R: number = 6378137; // Earth’s mean radius in meter
  const dLat: number = (p2.lat - p1.lat) * Math.PI / 180;
  const dLong = (p2.lng - p1.lng) * Math.PI / 180;
  const a: number = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos((p1.lat) * Math.PI / 180) * Math.cos((p2.lat) * Math.PI / 180)
    * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d: number = R * c;
  return d; // returns the distance in meter
};

export default getDistance;
