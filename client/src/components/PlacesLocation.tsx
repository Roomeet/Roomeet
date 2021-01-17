import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {
  withScriptjs,
  withGoogleMap,
} from 'react-google-maps';

function PlacesLocation() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng: any = await getLatLng(results[0]);
    console.log(results);
    console.log(latLng);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Type Location' })} />

            <div>
              {loading ? <div>Loading...</div> : null}
              {console.log(suggestions)}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

// const WrappedMap: any = withScriptjs(withGoogleMap(PlacesLocation));

export default PlacesLocation;
