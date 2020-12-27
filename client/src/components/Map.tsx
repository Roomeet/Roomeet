/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
import {
  GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow,
} from 'react-google-maps';

// @ts-ignore
function Map(cities : any[], setCities : any): any {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [indexCity, setIndexCity] = useState<any>(null);

  const handleClick = (e : any) => {
    setCities((prev : any) => [...prev, { lat: e.latLng.lat(), lng: e.latLng.lng() }]);
  };
  const map = (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 31.771959, lng: 35.217018 }}
      onClick={handleClick}
    >
      {cities?.length && cities.map((city: any, index:Number) => (
        <Marker
          key={city.lat + city.lng}
          position={{
            lat: city.lat,
            lng: city.lng,
          }}
          onClick={() => {
            setIndexCity(index);
            setSelectedCity(city);
          }}
        />
      ))}
      {selectedCity && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedCity.lat),
            lng: parseFloat(selectedCity.lng),
          }}
          onCloseClick={() => {
            setIndexCity(null);
            setSelectedCity(null);
          }}
        >
          <div className="city-action">
            <button onClick={() => {
              setCities((prev :any) => {
                prev.splice(indexCity, 1);
                return prev.slice();
              });
              setSelectedCity(null);
              setIndexCity(null);
            }}
            >
              Remove Marker

            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
  return map;
}
export default Map;

// const WrappedMap: any = withScriptjs(withGoogleMap(Map));

// export default WrappedMap;
