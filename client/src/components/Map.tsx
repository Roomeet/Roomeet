/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow,
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

function Map(): any {
  const [cities, setCities] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  async function getAndSet(url: string, setter: Function) {
    const { data } = await axios.get(url);
    setter(data);
    console.log(data);

    return data;
  }

  useEffect(() => {
    getAndSet('/api/v1/users/cities', setCities);
  }, []);
  console.log(cities && cities.length);

  const map = cities ? (
    <GoogleMap defaultZoom={3} defaultCenter={{ lat: 31.771959, lng: 35.217018 }}>
      <MarkerClusterer averageCenter enableRetinaIcons gridSize={70}>
        {cities.map((city: any) => (
          <>
            <Marker
              key={city.id}
              position={{
                lat: parseFloat(city.lat),
                lng: parseFloat(city.lng),
              }}
              onClick={() => {
                setSelectedCity(city);
              }}
            />
          </>
        ))}
      </MarkerClusterer>
      {selectedCity && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedCity.lat),
            lng: parseFloat(selectedCity.lng),
          }}
          onCloseClick={() => setSelectedCity(null)}
        >
          <div className="city-description">
            <h2>{selectedCity.name}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <h1>Loading..</h1>
  );
  return map;
}

const WrappedMap: any = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
