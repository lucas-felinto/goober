import React, { Dispatch, SetStateAction } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GeoLocation } from '~/interfaces/types';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 40.730610,
  lng: -73.935242
};

type MapsType = {
  loadMap?: Dispatch<SetStateAction<boolean>>
  pickupMarker: GeoLocation
  dropoffMarker: GeoLocation
}

const GoogleMapComponent = (props: MapsType) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAzM-6O1EpodVOXMVbyvvV3juBc4aeQN_4"
      libraries={["places"]}
      onLoad={() => { if (props.loadMap) props.loadMap(true) }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.pickupMarker.lat == 0 ? center : props.pickupMarker}
        zoom={10}
      >
        {props.pickupMarker && <Marker position={props.pickupMarker} label="A" />}
        {props.dropoffMarker && <Marker position={props.dropoffMarker} label="B" />}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(GoogleMapComponent);
