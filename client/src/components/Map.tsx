/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { CitiesContext } from '../context/CitiesContext';

// @ts-ignore
function Map(): any {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [indexCity, setIndexCity] = useState<any>(null);
  const citiesContext = React.useContext(CitiesContext);

  const handleClick = (e: any) => {
    citiesContext.setCities(e);
  };
  const map = (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 31.771959, lng: 35.217018 }}
      onClick={handleClick}
    >
      {citiesContext.cities?.length
        && citiesContext.cities.map((city: any, index: Number) => (
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
            <button
              onClick={() => {
                citiesContext.removeCity(indexCity);
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
const WrappedMap: any = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
