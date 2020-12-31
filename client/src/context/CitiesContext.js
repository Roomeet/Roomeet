import React, { Component } from 'react';

export const CitiesContext = React.createContext();

class CitiesContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { cities: [] };
  }

  setCities = (e) => {
    this.setState((prev: any) => ({
      ...prev,
      cities: [...prev.cities, { lat: e.latLng.lat(), lng: e.latLng.lng() }],
    }));
  };

  removeCity = (index) => {
    this.setState((prev: any) => {
      prev.cities.splice(index, 1);
      return { ...prev, cities: prev.cities.slice() };
    });
  };

  set = (state) => {
    this.setState(state);
  };

  render() {
    return (
      <CitiesContext.Provider
        value={{
          ...this.state,
          setCities: this.setCities,
          set: this.set,
          removeCity: this.removeCity,
        }}
      >
        {this.props.children}
      </CitiesContext.Provider>
    );
  }
}

export default CitiesContextProvider;
