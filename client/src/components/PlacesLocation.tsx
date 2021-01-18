import React, { Dispatch, SetStateAction, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { TextField } from '@material-ui/core';

type Coordinate = {
  lat: number | null,
  lng: number | null
}

type PlacesLocationProps = {
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    setCoordinates:Dispatch<SetStateAction<Coordinate>>;
};
const searchOptions = {
  input: 'Search',
  componentRestrictions: { country: 'il' },
};

const PlacesLocation: React.FC<PlacesLocationProps> = ({ address, setAddress, setCoordinates }) => {
  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng: {lat: number, lng: number} = await getLatLng(results[0]);
    console.log(results);
    console.log(latLng);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rentLocation"
              label="Where are you looking to live?"
              style={{ marginTop: '15px' }}
              {...getInputProps()}
            />
            <div>
              {loading ? <div>Loading...</div> : null}
              {console.log(suggestions)}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.placeId}>
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
};

// const WrappedMap: any = withScriptjs(withGoogleMap(PlacesLocation));

export default PlacesLocation;
